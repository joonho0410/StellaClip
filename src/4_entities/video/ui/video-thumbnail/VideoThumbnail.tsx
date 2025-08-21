import Image from 'next/image';
import type { VideoItem } from '../../types';

interface VideoThumbnailProps {
  video: VideoItem;
  onClick: (...args: any) => void;
  className?: string;
}

export const VideoThumbnail = ({
  video,
  onClick,
  className,
}: VideoThumbnailProps) => {
  return (
    <div
      className={`relative w-full max-w-full h-full overflow-hidden aspect-video cursor-pointer ${
        className || ''
      }`}
      onClick={onClick}
    >
      <Image
        // thumbnail의 경우에 해상도를 여러 방식으로 받아 올 수 있도록 해야한다.
        src={
          video.thumbnail?.replace('hqdefault', 'maxresdefault') ||
          '/placeholder-video.jpg'
        }
        alt={video.title}
        fill
        className="object-cover"
        unoptimized
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );
};
