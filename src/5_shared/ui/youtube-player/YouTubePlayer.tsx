'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface YouTubePlayerProps {
  videoId: string;
  title?: string;
  autoplay?: boolean;
  controls?: boolean;
  modestBranding?: boolean;
  showInfo?: boolean;
  className?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

const aspectRatioStyles = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
};


export function YouTubePlayer({
  videoId,
  title,
  autoplay = false,
  controls = true,
  modestBranding = true,
  showInfo = false,
  className,
  aspectRatio = '16:9',
  onReady,
}: YouTubePlayerProps) {
  const handleIframeLoad = () => {
    onReady?.();
  };

  // Build embed URL with all parameters
  const buildEmbedUrl = () => {
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      controls: controls ? '1' : '0',
      modestbranding: modestBranding ? '1' : '0',
      showinfo: showInfo ? '1' : '0',
      rel: '0', // Don't show related videos
      iv_load_policy: '3', // Hide video annotations
      fs: '1', // Allow fullscreen
    });

    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  };

  return (
    <div
      className={cn(
        'relative bg-black rounded-lg overflow-hidden',
        aspectRatioStyles[aspectRatio],
        className
      )}
    >
      <iframe
        src={buildEmbedUrl()}
        title={title || `YouTube video ${videoId}`}
        style={{ border: 'none' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full rounded-lg"
        onLoad={handleIframeLoad}
      />
    </div>
  );
};