import Image from 'next/image';
import type { VideoItem } from '../types';
import { useState } from 'react';
import { VideoPlaceholder } from '@/5_shared';

interface VideoThumbnailProps {
  video: VideoItem;
  onClick?: (...args: any) => void;
  className?: string;
}

export const VideoThumbnail = ({
  video,
  onClick,
  className,
}: VideoThumbnailProps) => {
  const [isLoadError, setIsLoadError] = useState(false);

  return (
    <div
      className={`relative w-full max-w-full h-full overflow-hidden aspect-video cursor-pointer ${
        className || ''
      }`}
      onClick={onClick}
    >
      {isLoadError ? (
        <div className="w-full h-full flex items-center justify-center bg-[var(--color-bg-tertiary)]">
          <VideoPlaceholder size="lg" />
        </div>
      ) : (
        <Image
        // thumbnail의 경우에 해상도를 여러 방식으로 받아 올 수 있도록 해야한다.
        src={
          video.thumbnails?.high?.url ||
          video.thumbnails?.medium?.url ||
          video.thumbnails?.default?.url ||
          video.thumbnail ||
          '/placeholder-video.jpg'
        }
        alt={video.title}
        fill
        className="object-cover"
        unoptimized
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
          onError={() => setIsLoadError(true)}
        />
      )}
      <div className="absolute bottom-2 right-2 flex gap-1">
        {video.duration && (
          <div className="bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
            {video.duration}
          </div>
        )}
      </div>
    </div>
  );
};
