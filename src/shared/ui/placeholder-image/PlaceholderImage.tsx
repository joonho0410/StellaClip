import React from 'react';
import { cn } from '@/shared/lib/utils';

interface PlaceholderImageProps {
  type: 'video' | 'avatar';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const VideoPlaceholder = ({ className, size = 'md' }: { className?: string; size?: string }) => {
  const sizeClasses = {
    sm: 'w-8 h-6',
    md: 'w-12 h-8', 
    lg: 'w-16 h-12'
  };

  return (
    <div className={cn(
      'flex items-center justify-center bg-[var(--color-bg-tertiary)] rounded-lg',
      sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.md,
      className
    )}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-1/2 h-1/2 text-[var(--color-text-quaternary)]"
      >
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    </div>
  );
};

const AvatarPlaceholder = ({ className, size = 'md' }: { className?: string; size?: string }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={cn(
      'flex items-center justify-center bg-[var(--color-bg-tertiary)] rounded-full',
      sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.md,
      className
    )}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-1/2 h-1/2 text-[var(--color-text-quaternary)]"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </div>
  );
};

export function PlaceholderImage({ type, className, size = 'md' }: PlaceholderImageProps) {
  if (type === 'video') {
    return <VideoPlaceholder className={className} size={size} />;
  }
  
  if (type === 'avatar') {
    return <AvatarPlaceholder className={className} size={size} />;
  }

  return null;
}

// Individual exports for direct use
export { VideoPlaceholder, AvatarPlaceholder };