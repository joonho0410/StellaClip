import React from 'react';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import { Text } from '../typography';

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
  showStatus?: boolean;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
}

const sizeStyles = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-20 h-20 text-2xl',
};

const statusStyles = {
  online: 'bg-green-500',
  offline: 'bg-gray-500',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
};

const statusSizes = {
  xs: 'w-2 h-2',
  sm: 'w-2.5 h-2.5',
  md: 'w-3 h-3',
  lg: 'w-3.5 h-3.5',
  xl: 'w-4 h-4',
  '2xl': 'w-5 h-5',
};

export function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  shape = 'circle',
  status,
  showStatus = false,
  className,
  onClick,
  loading = false,
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Generate initials from fallback text
  const getInitials = (text: string) => {
    return text
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const displayFallback = fallback || alt || '?';
  const initials = getInitials(displayFallback);

  const baseClasses = cn(
    'relative inline-flex items-center justify-center font-medium text-[var(--color-text-primary)] bg-[var(--color-bg-tertiary)] border border-[var(--color-border-secondary)] overflow-hidden transition-all duration-200',
    sizeStyles[size],
    shape === 'circle' ? 'rounded-full' : 'rounded-lg',
    onClick && 'cursor-pointer hover:opacity-80 hover:scale-105',
    loading && 'animate-pulse',
    className
  );

  const shouldShowImage = src && !imageError && !loading;
  const shouldShowSkeleton = loading || (src && imageLoading && !imageError);

  return (
    <div className={baseClasses} onClick={onClick}>
      {/* Loading/Skeleton State */}
      {shouldShowSkeleton && (
        <div className="w-full h-full bg-[var(--color-bg-quaternary)] animate-pulse" />
      )}

      {/* Image */}
      {shouldShowImage && (
        <Image
          src={src!}
          alt={alt || 'Avatar'}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 80px, 64px"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      )}

      {/* Fallback Initials */}
      {!shouldShowImage && !shouldShowSkeleton && (
        <Text
          size={size === 'xs' ? 'tiny' : size === 'sm' ? 'mini' : 'small'}
          weight="medium"
          color="secondary"
          className="select-none"
        >
          {initials}
        </Text>
      )}

      {/* Status Indicator */}
      {showStatus && status && (
        <div
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-[var(--color-bg-primary)]',
            statusStyles[status],
            statusSizes[size]
          )}
          title={status.charAt(0).toUpperCase() + status.slice(1)}
        />
      )}
    </div>
  );
};

// Avatar Group Component
export interface AvatarGroupProps {
  avatars: (AvatarProps & { id: string })[];
  max?: number;
  size?: AvatarProps['size'];
  shape?: AvatarProps['shape'];
  className?: string;
  spacing?: 'tight' | 'normal' | 'loose';
}

const spacingStyles = {
  tight: '-space-x-1',
  normal: '-space-x-2',
  loose: '-space-x-3',
};

export function AvatarGroup({
  avatars,
  max = 5,
  size = 'md',
  shape = 'circle',
  className,
  spacing = 'normal',
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = Math.max(0, avatars.length - max);

  return (
    <div className={cn('flex items-center', spacingStyles[spacing], className)}>
      {visibleAvatars.map((avatar) => (
        <Avatar
          key={avatar.id}
          {...avatar}
          size={size}
          shape={shape}
          className="ring-2 ring-[var(--color-bg-primary)]"
        />
      ))}
      
      {remainingCount > 0 && (
        <Avatar
          fallback={`+${remainingCount}`}
          size={size}
          shape={shape}
          className="ring-2 ring-[var(--color-bg-primary)] bg-[var(--color-bg-quaternary)] text-[var(--color-text-tertiary)]"
        />
      )}
    </div>
  );
};