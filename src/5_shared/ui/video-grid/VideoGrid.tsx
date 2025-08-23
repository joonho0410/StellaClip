import React from 'react';
import { VideoCard, VideoCardProps } from '@/4_entities/video/ui';
import { Grid } from '../layout';

export interface VideoGridProps {
  videos: (VideoCardProps & { id: string })[];
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  colsDesktop?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  cardSize?: 'sm' | 'md' | 'lg';
  aspectRatio?: '16:9' | '4:3' | '1:1';
  showChannel?: boolean;
  onVideoClick?: (videoId: string, video: VideoCardProps) => void;
}

export function VideoGrid({
  videos,
  cols = 1,
  colsDesktop = 3,
  gap = 'lg',
  className,
  cardSize = 'md',
  aspectRatio = '16:9',
  showChannel = true,
  onVideoClick,
}: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-[var(--color-bg-tertiary)] rounded-full flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[var(--color-text-tertiary)]">
            <path d="M23 7l-7 5 7 5V7z" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">
          No videos found
        </h3>
        <p className="text-[var(--color-text-secondary)] max-w-sm">
          There are no videos to display at the moment. Check back later for new content.
        </p>
      </div>
    );
  }

  return (
    <Grid
      cols={cols}
      colsDesktop={colsDesktop}
      gap={gap}
      className={className}
    >
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          {...video}
          size={cardSize}
          aspectRatio={aspectRatio}
          showChannel={showChannel}
          onClick={() => onVideoClick?.(video.id, video)}
        />
      ))}
    </Grid>
  );
};