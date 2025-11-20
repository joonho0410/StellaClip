import React, { useMemo } from 'react';
import type { VideoItem } from '@/4_entities/video/types';
import { cn } from '@/5_shared/lib/utils';
import { formatViewCount, formatUploadTime } from '@/5_shared/lib/video-utils';
import { VideoContents } from './blocks/VideoContents';
import { VideoThumbnail } from '..';

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
  aspectRatio = '16:9',
}: VideoCardProps) {
  const sizeConfig = sizeStyles[size];

  // Helper functions to format display values
  const viewCount = useMemo(
    () => formatViewCount(video.viewCount),
    [video.viewCount]
  );
  const uploadTime = useMemo(
    () => formatUploadTime(video.publishedAt),
    [video.publishedAt]
  );

  return (
    <div
      className={cn(
        'relative bg-[var(--color-bg-secondary)] rounded-lg cursor-pointer transition-all duration-200 hover:bg-[var(--color-bg-tertiary)] hover:scale-[1.02] group flex flex-col',
        sizeConfig.container,
        className
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          'relative overflow-hidden flex-shrink-0',
          aspectRatioStyles[aspectRatio]
        )}
      >
        <VideoThumbnail video={video} />
      </div>

      {/* Content */}
      <VideoContents
        className={cn(
          sizeConfig.spacing,
          'flex-1 flex flex-col justify-between'
        )}
        videoTitle={video.title}
        channelTitle={video.channelTitle}
        viewCount={viewCount}
        uploadTime={uploadTime}
      />
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
  }
): VideoCardProps {
  return {
    video,
    ...options,
  };
}
