'use client';

import { useEffect, useState } from 'react';
import { useCurrentVideo } from '@/4_entities/video';
import { SlidePanel, VideoDetailPanel } from '@/5_shared/ui';
import type { VideoItem } from '@/4_entities/video/types';

interface VideoSideBarProps {
  className?: string;
  onWidthChange?: (width: number) => void;
  onFullScreenChange?: (isFullScreen: boolean) => void;
}

export const VideoSideBar = ({ 
  className,
  onWidthChange,
  onFullScreenChange 
}: VideoSideBarProps) => {
  const { currentVideo, setCurrentVideo } = useCurrentVideo();
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClosePanel = () => {
    setCurrentVideo(null);
  };

  const handleChannelClick = (channelName: string) => {
    console.log('Channel clicked:', channelName);
    // Navigate to channel page or show channel info
  };

  const handleTagClick = (tag: string) => {
    console.log('Tag clicked:', tag);
    // Search for videos with this tag
  };

  const handleShare = () => {
    console.log('Share clicked');
    // Implement share functionality
  };

  const handleSave = () => {
    console.log('Save clicked');
    // Implement save functionality
  };

  const handlePanelWidthChange = (width: number) => {
    onWidthChange?.(width);
  };

  const handlePanelFullScreenChange = (isFullScreen: boolean) => {
    onFullScreenChange?.(isFullScreen);
  };

  // Transform VideoItem to the format expected by VideoDetailPanel
  const transformVideoForPanel = (video: VideoItem) => {
    return {
      id: video.id,
      title: video.title,
      description: video.description,
      thumbnail: video.thumbnail,
      youtubeId: video.youtubeId,
      channelName: video.channelTitle,
      channelAvatar: '', // VideoItem doesn't have avatar, use placeholder
      views: '0 views', // VideoItem doesn't have view count
      uploadTime: new Date(video.publishedAt).toLocaleDateString(),
      duration: '0:00', // VideoItem doesn't have duration
      tags: [], // VideoItem doesn't have tags array
      likeCount: '0',
    };
  };

  if (!currentVideo) {
    return null;
  }

  const panelVideo = transformVideoForPanel(currentVideo);

  return (
    <SlidePanel
      isOpen={!!currentVideo}
      onClose={handleClosePanel}
      title={currentVideo.title}
      fullScreenOnMobile={true}
      allowFullScreenToggle={true}
      position="left"
      pushContent={!isMobile}
      resizable={!isMobile}
      onWidthChange={handlePanelWidthChange}
      onFullScreenChange={handlePanelFullScreenChange}
      minWidth={300}
      maxWidth={800}
      className={className}
    >
      <VideoDetailPanel
        video={panelVideo}
        onChannelClick={handleChannelClick}
        onTagClick={handleTagClick}
        onShare={handleShare}
        onSave={handleSave}
      />
    </SlidePanel>
  );
};
