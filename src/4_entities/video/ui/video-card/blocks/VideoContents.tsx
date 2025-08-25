import { VideoInfo } from './VideoInfo';

type Props = {
  className: string;
  channelTitle: string;
  videoTitle: string;
  viewCount?: string;
  uploadTime?: string;
};

export const VideoContents = ({
  className,
  channelTitle,
  videoTitle,
  viewCount,
  uploadTime,
}: Props) => {
  return (
    <div className={className}>
      <VideoInfo
        title={videoTitle}
        channelName={channelTitle}
        viewCount={viewCount}
        uploadTime={uploadTime}
      />
    </div>
  );
};
