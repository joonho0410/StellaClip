import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/5_shared/lib/utils';
import { formatViewCount, formatUploadTime } from '@/5_shared/lib/video-utils';
import { Text } from '@/5_shared/ui/typography';
import { Badge } from '@/5_shared/ui/badge';
import {
  VideoPlaceholder,
  AvatarPlaceholder,
} from '@/5_shared/ui/placeholder-image';
import type { VideoItem } from '@/4_entities/video/types';

export interface VideoCardProps {
  // Core video data (VideoItem)
  video: VideoItem;

  // Display options
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showChannel?: boolean;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  priority?: boolean;
}

const sizeStyles = {
  sm: {
    container: 'w-full max-w-xs',
    thumbnail: 'h-40',
    spacing: 'p-3',
  },
  md: {
    container: 'w-full max-w-sm',
    thumbnail: 'h-48',
    spacing: 'p-4',
  },
  lg: {
    container: 'w-full max-w-md',
    thumbnail: 'h-56',
    spacing: 'p-4',
  },
};

const aspectRatioStyles = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
};

export function VideoCard({
  // Core video data
  video,

  // Display options
  onClick,
  className,
  size = 'md',
  showChannel = true,
  aspectRatio = '16:9',
  priority = false,
}: VideoCardProps) {
  const sizeConfig = sizeStyles[size];
  const [thumbnailError, setThumbnailError] = useState(false);

  // Helper functions to format display values
  const displayChannelName = video.channelTitle;
  const displayViews = formatViewCount(video.viewCount);
  const displayUploadTime = formatUploadTime(video.publishedAt);

  const handleThumbnailError = () => {
    setThumbnailError(true);
  };

  return (
    <div
      className={cn(
        'bg-[var(--color-bg-secondary)] rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:bg-[var(--color-bg-tertiary)] hover:scale-[1.02] group',
        sizeConfig.container,
        className
      )}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div
        className={cn(
          'relative overflow-hidden',
          aspectRatioStyles[aspectRatio]
        )}
      >
        {thumbnailError || !video.thumbnail ? (
          <div className="w-full h-full flex items-center justify-center bg-[var(--color-bg-tertiary)]">
            <VideoPlaceholder size="lg" />
          </div>
        ) : (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            onError={handleThumbnailError}
          />
        )}

        {/* Overlay badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 flex gap-1">
          {video.duration && (
            <div className="bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
              {video.duration}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className={cn(sizeConfig.spacing)}>
        <div className="flex gap-3">
          {/* Channel Avatar */}
          {showChannel && (
            <div className="flex-shrink-0 mt-1">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <AvatarPlaceholder size="md" />
              </div>
            </div>
          )}

          {/* Video Info */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <Text
              className="font-medium line-clamp-2 group-hover:text-[var(--color-text-primary)] transition-colors"
              color="primary"
            >
              {video.title}
            </Text>

            {/* Channel Name */}
            {showChannel && displayChannelName && (
              <Text
                size="small"
                color="secondary"
                className="mt-1 hover:text-[var(--color-text-primary)] transition-colors"
              >
                {displayChannelName}
              </Text>
            )}

            {/* Metadata */}
            <div className="flex items-center gap-1 mt-1">
              {displayViews && (
                <>
                  <Text size="small" color="tertiary">
                    {displayViews}
                  </Text>
                  {displayUploadTime && (
                    <>
                      <Text size="small" color="tertiary">
                        •
                      </Text>
                      <Text size="small" color="tertiary">
                        {displayUploadTime}
                      </Text>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to convert VideoItem to VideoCardProps
export function videoItemToCardProps(
  video: VideoItem,
  options?: {
    onClick?: () => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    showChannel?: boolean;
    aspectRatio?: '16:9' | '4:3' | '1:1';
    priority?: boolean;
  }
): VideoCardProps {
  return {
    video,
    ...options,
  };
}
