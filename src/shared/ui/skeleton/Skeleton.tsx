import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
}: SkeletonProps) {
  const baseClasses = cn(
    'bg-[var(--color-bg-tertiary)]',
    animation === 'pulse' && 'animate-pulse',
    animation === 'wave' && 'animate-pulse',
    variant === 'text' && 'h-4 rounded',
    variant === 'rectangular' && 'rounded-md',
    variant === 'circular' && 'rounded-full',
    className
  );

  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;

  return <div className={baseClasses} style={style} />;
};

// Specialized skeleton components for video streaming sites
export interface VideoCardSkeletonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  aspectRatio?: '16:9' | '4:3' | '1:1';
  showChannel?: boolean;
}

export function VideoCardSkeleton({
  className,
  size = 'md',
  aspectRatio = '16:9',
  showChannel = true,
}: VideoCardSkeletonProps) {
  const sizeStyles = {
    sm: { container: 'w-full max-w-xs', padding: 'p-3' },
    md: { container: 'w-full max-w-sm', padding: 'p-4' },
    lg: { container: 'w-full max-w-md', padding: 'p-4' },
  };

  const aspectRatioStyles = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
  };

  const sizeConfig = sizeStyles[size];

  return (
    <div className={cn('bg-[var(--color-bg-secondary)] rounded-lg overflow-hidden', sizeConfig.container, className)}>
      {/* Thumbnail */}
      <Skeleton className={cn('w-full', aspectRatioStyles[aspectRatio])} />
      
      {/* Content */}
      <div className={cn(sizeConfig.padding)}>
        <div className="flex gap-3">
          {/* Channel Avatar */}
          {showChannel && (
            <div className="flex-shrink-0 mt-1">
              <Skeleton variant="circular" width={32} height={32} />
            </div>
          )}

          {/* Video Info */}
          <div className="flex-1 space-y-2">
            {/* Title */}
            <div className="space-y-1">
              <Skeleton variant="text" className="w-full" />
              <Skeleton variant="text" className="w-3/4" />
            </div>

            {/* Channel Name */}
            {showChannel && <Skeleton variant="text" className="w-1/2 h-3" />}

            {/* Metadata */}
            <Skeleton variant="text" className="w-1/3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export interface VideoGridSkeletonProps {
  count?: number;
  cols?: number;
  colsSmall?: number;
  colsMedium?: number;
  colsLarge?: number;
  colsXLarge?: number;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  cardSize?: 'sm' | 'md' | 'lg';
  aspectRatio?: '16:9' | '4:3' | '1:1';
  showChannel?: boolean;
}

export function VideoGridSkeleton({
  count = 12,
  cols = 1,
  colsSmall = 2,
  colsMedium = 3,
  colsLarge = 4,
  colsXLarge = 5,
  gap = 'lg',
  className,
  cardSize = 'md',
  aspectRatio = '16:9',
  showChannel = true,
}: VideoGridSkeletonProps) {
  const gapStyles = {
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };

  const gridColsStyles: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };

  return (
    <div
      className={cn(
        'grid',
        gridColsStyles[cols],
        colsSmall && `sm:grid-cols-${colsSmall}`,
        colsMedium && `md:grid-cols-${colsMedium}`,
        colsLarge && `lg:grid-cols-${colsLarge}`,
        colsXLarge && `xl:grid-cols-${colsXLarge}`,
        gapStyles[gap],
        className
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <VideoCardSkeleton
          key={index}
          size={cardSize}
          aspectRatio={aspectRatio}
          showChannel={showChannel}
        />
      ))}
    </div>
  );
};

export interface CategorySectionSkeletonProps {
  className?: string;
  showHeader?: boolean;
  cardCount?: number;
  cardSize?: 'sm' | 'md' | 'lg';
  layout?: 'grid' | 'carousel';
}

export function CategorySectionSkeleton({
  className,
  showHeader = true,
  cardCount = 8,
  cardSize = 'md',
  layout = 'grid',
}: CategorySectionSkeletonProps) {
  return (
    <section className={cn('space-y-6', className)}>
      {/* Header */}
      {showHeader && (
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton variant="text" width={200} height={28} />
            <Skeleton variant="text" width={300} height={16} />
          </div>
          <Skeleton variant="text" width={80} height={20} />
        </div>
      )}

      {/* Content */}
      {layout === 'carousel' ? (
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: Math.min(cardCount, 5) }).map((_, index) => (
            <div key={index} className="flex-none w-80">
              <VideoCardSkeleton size={cardSize} />
            </div>
          ))}
        </div>
      ) : (
        <VideoGridSkeleton
          count={cardCount}
          cardSize={cardSize}
          cols={1}
          colsSmall={2}
          colsMedium={3}
          colsLarge={4}
        />
      )}
    </section>
  );
};

export interface VideoPlayerSkeletonProps {
  className?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  showControls?: boolean;
}

export function VideoPlayerSkeleton({
  className,
  aspectRatio = '16:9',
  showControls = true,
}: VideoPlayerSkeletonProps) {
  const aspectRatioStyles = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
  };

  return (
    <div className={cn('relative bg-black rounded-lg overflow-hidden', aspectRatioStyles[aspectRatio], className)}>
      <Skeleton className="w-full h-full" />
      
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Skeleton variant="circular" width={64} height={64} />
      </div>

      {/* Controls */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          {/* Progress bar */}
          <Skeleton variant="rectangular" className="w-full h-1 mb-3" />

          {/* Control buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="circular" width={32} height={32} />
              <Skeleton variant="text" width={80} height={16} />
            </div>
            <Skeleton variant="circular" width={32} height={32} />
          </div>
        </div>
      )}
    </div>
  );
};