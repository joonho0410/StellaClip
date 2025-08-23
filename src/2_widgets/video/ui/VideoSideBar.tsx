'use client';

import { useCurrentVideo } from '@/4_entities/video';
import { SlidePanel, VideoDetailPanel, VideoDetailData } from '@/5_shared/ui';
import type { VideoItem } from '@/4_entities/video/types';

interface VideoSideBarProps {
  className?: string;
}

// VideoItem을 VideoDetailData로 변환하는 함수
const transformVideoItemToDetailData = (video: VideoItem): VideoDetailData => {
  return {
    id: video.id,
    title: video.title,
    description: video.description,
    thumbnail: video.thumbnail,
    youtubeId: video.videoId,
    channelName: video.channelTitle,
    views: video.viewCount?.toLocaleString(),
    likeCount: video.likeCount?.toString(),
    tags: video.tags ? JSON.parse(video.tags) : [],
    uploadTime: new Date(video.publishedAt).toLocaleDateString(),
    quality: 'HD' as const,
  };
};

export const VideoSideBar = ({ className }: VideoSideBarProps) => {
  const { currentVideo, setCurrentVideo } = useCurrentVideo();

  const handleClosePanel = () => {
    setCurrentVideo(null);
  };

  if (!currentVideo) {
    return null;
  }

  const videoDetailData = transformVideoItemToDetailData(currentVideo);

  return (
    <SlidePanel
      isOpen={!!currentVideo}
      onClose={handleClosePanel}
      title={currentVideo.title}
      position="left"
      className={className}
    >
      <VideoDetailPanel video={videoDetailData} />
    </SlidePanel>
  );
};
