'use client';

import React, { useState, useEffect } from 'react';
import { VideoCard, VideoCardProps } from '../video-card';
import { SlidePanel } from '../slide-panel';
import { VideoDetailPanel, VideoDetailData } from '../video-detail-panel';

export interface VideoCardWithPanelProps extends VideoCardProps {
  onChannelClick?: (channelName: string) => void;
  onTagClick?: (tag: string) => void;
  onShare?: () => void;
  onSave?: () => void;
  enablePanel?: boolean;
  fullScreenOnMobile?: boolean;
}

export function VideoCardWithPanel({
  enablePanel = true,
  fullScreenOnMobile = true,
  onChannelClick,
  onTagClick,
  onShare,
  onSave,
  onClick,
  ...videoProps
}: VideoCardWithPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [clientId, setClientId] = useState<string>('');

  // Generate ID on client side to prevent hydration mismatch
  useEffect(() => {
    if (!videoProps.id) {
      setClientId(`video-${Date.now()}-${Math.floor(Math.random() * 1000)}`);
    }
  }, [videoProps.id]);

  const handleCardClick = () => {
    console.log('Card clicked, enablePanel:', enablePanel); // Debug log
    
    if (enablePanel) {
      console.log('Opening panel...'); // Debug log
      setIsOpen(true);
    }

    // Also call the original onClick if provided
    onClick?.();
  };

  const handleClose = () => {
    console.log('Closing panel...'); // Debug log
    setIsOpen(false);
  };

  // Convert VideoCardProps to VideoDetailData
  const videoDetailData: VideoDetailData = {
    id: videoProps.id || clientId,
    title: videoProps.title,
    thumbnail: videoProps.thumbnail,
    duration: videoProps.duration,
    channelName: videoProps.channelName,
    channelAvatar: videoProps.channelAvatar,
    views: videoProps.views,
    uploadTime: videoProps.uploadTime,
    isLive: videoProps.isLive,
    quality: videoProps.quality,
    description: videoProps.description,
    youtubeId: videoProps.youtubeId,
    tags: videoProps.tags,
    likeCount: videoProps.likeCount,
    dislikeCount: videoProps.dislikeCount,
  };

  console.log('Rendering VideoCardWithPanel, isOpen:', isOpen); // Debug log

  return (
    <>
      <VideoCard
        {...videoProps}
        onClick={handleCardClick}
      />
      
      {enablePanel && (
        <SlidePanel
          isOpen={isOpen}
          onClose={handleClose}
          title={videoProps.title}
          fullScreenOnMobile={fullScreenOnMobile}
        >
          <VideoDetailPanel
            video={videoDetailData}
            onChannelClick={onChannelClick}
            onTagClick={onTagClick}
            onShare={onShare}
            onSave={onSave}
          />
        </SlidePanel>
      )}
    </>
  );
}