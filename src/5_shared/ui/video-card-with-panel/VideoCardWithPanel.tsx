'use client';

import React, { useState, useEffect } from 'react';
import { VideoCard, VideoCardProps } from '@/4_entities/video/ui';
import { SlidePanel } from '../slide-panel';
import { VideoDetailPanel, VideoDetailData } from '../video-detail-panel';

export interface VideoCardWithPanelProps extends VideoCardProps {
  onChannelClick?: (channelName: string) => void;
  onTagClick?: (tag: string) => void;
  onShare?: () => void;
  onSave?: () => void;
  enablePanel?: boolean;
}

export function VideoCardWithPanel({
  enablePanel = true,
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
    if (!videoProps.video.id) {
      setClientId(`video-${Date.now()}-${Math.floor(Math.random() * 1000)}`);
    }
  }, [videoProps.video.id]);

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
    id: videoProps.video.id || clientId,
    title: videoProps.video.title,
    thumbnail: videoProps.video.thumbnail,
    duration: videoProps.video.duration,
    channelName: videoProps.video.channelTitle,
    channelAvatar: '', // No avatar in VideoItem
    views: videoProps.video.viewCount?.toString(),
    uploadTime: videoProps.video.publishedAt,
    isLive: false, // No live status in VideoItem
    quality: undefined, // No quality in VideoItem
    description: videoProps.video.description,
    youtubeId: videoProps.video.videoId,
    tags: videoProps.video.tags ? (() => {
      try {
        return JSON.parse(videoProps.video.tags);
      } catch {
        return [videoProps.video.tags];
      }
    })() : undefined,
    likeCount: videoProps.video.likeCount?.toString(),
    dislikeCount: undefined, // No dislike count in VideoItem
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
          title={videoProps.video.title}
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