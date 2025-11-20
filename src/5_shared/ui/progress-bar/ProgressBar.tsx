import React from 'react';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import { Text } from '../typography';

export interface ProgressBarProps {
  value: number;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'danger';
  showValue?: boolean;
  showPercentage?: boolean;
  label?: string;
  className?: string;
  animated?: boolean;
  striped?: boolean;
  indeterminate?: boolean;
}

const sizeStyles = {
  xs: 'h-1',
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

const variantStyles = {
  default: 'bg-[var(--color-primary)]',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
};

export function ProgressBar({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showValue = false,
  showPercentage = false,
  label,
  className,
  animated = false,
  striped = false,
  indeterminate = false,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const displayValue = Math.round(percentage);

  return (
    <div className={cn('w-full', className)}>
      {/* Label and Value */}
      {(label || showValue || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <Text size="small" color="secondary" weight="medium">
              {label}
            </Text>
          )}
          {(showValue || showPercentage) && (
            <Text size="small" color="tertiary">
              {showPercentage ? `${displayValue}%` : `${value}/${max}`}
            </Text>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div
        className={cn(
          'w-full bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden',
          sizeStyles[size]
        )}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-out',
            variantStyles[variant],
            animated && 'transition-all duration-500',
            striped && 'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:20px_20px]',
            striped && animated && 'animate-pulse',
            indeterminate && 'animate-pulse'
          )}
          style={{
            width: indeterminate ? '100%' : `${percentage}%`,
            opacity: indeterminate ? 0.6 : 1,
          }}
        />
      </div>
    </div>
  );
};

// Video Progress Bar (specialized for video players)
export interface VideoProgressBarProps {
  currentTime: number;
  duration: number;
  buffered?: number;
  seekTime?: number;
  onSeek?: (time: number) => void;
  onSeekStart?: () => void;
  onSeekEnd?: () => void;
  className?: string;
  showThumbnail?: boolean;
  thumbnailSrc?: string;
}

export function VideoProgressBar({
  currentTime,
  duration,
  buffered = 0,
  seekTime,
  onSeek,
  onSeekStart,
  onSeekEnd,
  className,
  showThumbnail = false,
  thumbnailSrc,
}: VideoProgressBarProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [hoverTime, setHoverTime] = React.useState<number | null>(null);
  const progressRef = React.useRef<HTMLDivElement>(null);

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  const bufferedPercentage = duration ? (buffered / duration) * 100 : 0;
  const seekPercentage = seekTime && duration ? (seekTime / duration) * 100 : null;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!progressRef.current || !duration) return;

    const rect = progressRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const time = (percentage / 100) * duration;
    
    setHoverTime(time);

    if (isDragging) {
      onSeek?.(time);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!progressRef.current || !duration) return;

    setIsDragging(true);
    onSeekStart?.();

    const rect = progressRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const time = (percentage / 100) * duration;
    
    onSeek?.(time);
  };

  const handleMouseLeave = () => {
    setHoverTime(null);
  };

  React.useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        onSeekEnd?.();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && progressRef.current && duration) {
        const rect = progressRef.current.getBoundingClientRect();
        const percentage = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const time = (percentage / 100) * duration;
        onSeek?.(time);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, duration, onSeek, onSeekEnd]);

  return (
    <div className={cn('relative group', className)}>
      {/* Thumbnail Preview */}
      {showThumbnail && hoverTime !== null && thumbnailSrc && (
        <div
          className="absolute bottom-full mb-2 transform -translate-x-1/2 bg-black rounded-lg p-2 z-10"
          style={{
            left: `${((hoverTime / duration) * 100)}%`,
          }}
        >
          <div className="relative w-32 h-18 rounded overflow-hidden">
            <Image
              src={thumbnailSrc}
              alt="Video thumbnail"
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
          <Text size="tiny" className="text-white text-center mt-1">
            {formatTime(hoverTime)}
          </Text>
        </div>
      )}

      {/* Time tooltip */}
      {hoverTime !== null && !showThumbnail && (
        <div
          className="absolute bottom-full mb-1 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs z-10"
          style={{
            left: `${((hoverTime / duration) * 100)}%`,
          }}
        >
          {formatTime(hoverTime)}
        </div>
      )}

      {/* Progress Bar Container */}
      <div
        ref={progressRef}
        className="relative h-1 bg-white/30 rounded-full cursor-pointer group-hover:h-2 transition-all duration-150"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
      >
        {/* Buffered Progress */}
        <div
          className="absolute left-0 top-0 h-full bg-white/40 rounded-full"
          style={{ width: `${bufferedPercentage}%` }}
        />

        {/* Played Progress */}
        <div
          className="absolute left-0 top-0 h-full bg-white rounded-full"
          style={{ width: `${progressPercentage}%` }}
        />

        {/* Seek Preview */}
        {seekPercentage !== null && (
          <div
            className="absolute left-0 top-0 h-full bg-white/60 rounded-full"
            style={{ width: `${seekPercentage}%` }}
          />
        )}

        {/* Progress Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          style={{ left: `${progressPercentage}%`, transform: 'translateX(-50%) translateY(-50%)' }}
        />
      </div>
    </div>
  );
};