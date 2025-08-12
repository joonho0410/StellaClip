import Image from 'next/image';
import { VideoItem } from '../types';
import { useCurrentVideo } from '../model/store';
import { useCallback } from 'react';

type VideoProps = {
  video: VideoItem;
};

export const VideoThumbnail = ({ video }: VideoProps) => {
  const { setCurrentVideo } = useCurrentVideo();

  // console.log(`${video.title} is rerendered`);

  const handleClick = useCallback(() => {
    setCurrentVideo(video);
  }, [video.id]);

  return (
    <div
      className="relative w-full max-w-full h-full overflow-hidden aspect-video cursor-pointer"
      onClick={handleClick}
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
