'use client';

import { useCurrentVideo } from '@/4_entities/video';
import { SlidePanel, VideoDetailPanel } from '@/5_shared/ui';

interface VideoSideBarProps {
  className?: string;
}

export const VideoSideBar = ({ className }: VideoSideBarProps) => {
  const { currentVideo, setCurrentVideo } = useCurrentVideo();

  const handleClosePanel = () => {
    setCurrentVideo(null);
  };

  if (!currentVideo) {
    return null;
  }

  return (
    <SlidePanel
      isOpen={!!currentVideo}
      onClose={handleClosePanel}
      title={currentVideo.title}
      position="left"
      className={className}
    >
      <VideoDetailPanel video={currentVideo} />
    </SlidePanel>
  );
};
