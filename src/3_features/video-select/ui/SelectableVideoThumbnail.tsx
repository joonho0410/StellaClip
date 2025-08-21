'use client';

import { useCallback } from 'react';
import { VideoThumbnail } from '@/4_entities/video';
import { useVideoSelect } from '../model/useVideoSelect';
import type { VideoItem } from '@/4_entities/video';
import { cn } from '@/5_shared/lib/utils';

interface SelectableVideoThumbnailProps {
  video: VideoItem;
  className?: string;
}

export const SelectableVideoThumbnail = ({
  video,
  className,
}: SelectableVideoThumbnailProps) => {
  const { handleVideoSelect } = useVideoSelect();

  const handleClick = (selectedVideo: VideoItem) => {
    handleVideoSelect(video);
  };

  return (
    <div
      className={cn(
        'relative transition-all duration-200 hover:scale-105 cursor-pointer',
        className
      )}
    >
      <VideoThumbnail
        video={video}
        onClick={handleClick}
        className={cn('transition-transform duration-200')}
      />
    </div>
  );
};
