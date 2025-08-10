'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import { getYouTubeEmbedUrl, getYouTubeThumbnail } from '@/shared/lib/youtube';

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

const PlayIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

export function YouTubePlayer({
  videoId,
  title,
  autoplay = false,
  className,
  aspectRatio = '16:9',
  onReady,
  onPlay,
}: YouTubePlayerProps) {
  const [isLoaded, setIsLoaded] = useState(autoplay);
  const [thumbnailError, setThumbnailError] = useState(false);

  const embedUrl = getYouTubeEmbedUrl(videoId, autoplay);
  const thumbnailUrl = getYouTubeThumbnail(videoId, 'maxres');
  const fallbackThumbnailUrl = getYouTubeThumbnail(videoId, 'high');

  const handlePlayClick = () => {
    setIsLoaded(true);
    onPlay?.();
  };

  const handleIframeLoad = () => {
    onReady?.();
  };

  return (
    <div
      className={cn(
        'relative bg-black rounded-lg overflow-hidden group',
        aspectRatioStyles[aspectRatio],
        className
      )}
    >
      {!isLoaded ? (
        // Thumbnail with play button overlay
        <>
          <Image
            src={thumbnailError ? fallbackThumbnailUrl : thumbnailUrl}
            alt={title || `YouTube video ${videoId}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setThumbnailError(true)}
            priority={!thumbnailError}
          />
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-200" />
          
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handlePlayClick}
              className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transition-all duration-200 hover:scale-110 shadow-lg"
              aria-label={`Play ${title || 'video'}`}
            >
              <PlayIcon />
            </button>
          </div>

          {/* YouTube branding */}
          <div className="absolute bottom-4 right-4 opacity-80">
            <svg width="68" height="48" viewBox="0 0 68 48" fill="none">
              <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#FF0000"/>
              <path d="M 45,24 27,14 27,34" fill="white"/>
            </svg>
          </div>

          {/* Title overlay */}
          {title && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-white font-medium line-clamp-2 text-sm">
                {title}
              </h3>
            </div>
          )}
        </>
      ) : (
        // YouTube iframe
        <iframe
          src={embedUrl}
          title={title || `YouTube video ${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
          onLoad={handleIframeLoad}
        />
      )}
    </div>
  );
};