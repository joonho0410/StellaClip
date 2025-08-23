import { Grid } from '@/5_shared/ui/layout';
import { VideoCard, videoItemToCardProps } from '@/4_entities/video/ui';
import { VideoItem } from '@/4_entities/video/types';

type Props = {
  videos: VideoItem[];
  onVideoClick?: (video: VideoItem) => void;
};

export const SearchVideoGrid = ({ videos, onVideoClick }: Props) => {
  return (
    <Grid className="grid-cols-1 @2xl:grid-cols-3 @5xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          {...videoItemToCardProps(video, {
            onClick: () => onVideoClick?.(video),
            className: 'cursor-pointer transition-transform hover:scale-105',
            size: 'md',
            showChannel: true,
            aspectRatio: '16:9',
          })}
        />
      ))}
    </Grid>
  );
};
