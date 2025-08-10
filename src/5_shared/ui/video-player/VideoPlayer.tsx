'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/shared/lib/utils';
import { Button, IconButton } from '../button';
import { Text } from '../typography';

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
}

const aspectRatioStyles = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
};

// Icons
const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const VolumeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);

const FullscreenIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
  </svg>
);

export function VideoPlayer({
  src,
  poster,
  title,
  autoPlay = false,
  controls = true,
  loop = false,
  muted = false,
  className,
  aspectRatio = '16:9',
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      onTimeUpdate?.(video.currentTime, video.duration);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      onPlay?.();
    };

    const handlePause = () => {
      setIsPlaying(false);
      onPause?.();
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onPlay, onPause, onEnded, onTimeUpdate]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    const newVolume = parseFloat(e.target.value);
    
    if (video) {
      video.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={cn(
        'relative bg-black rounded-lg overflow-hidden group',
        aspectRatioStyles[aspectRatio],
        className
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        className="w-full h-full object-cover"
        onClick={togglePlay}
      />

      {/* Play button overlay (when paused) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Button
            variant="ghost"
            className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-none p-4 rounded-full"
            onClick={togglePlay}
          >
            <PlayIcon />
          </Button>
        </div>
      )}

      {/* Controls */}
      {controls && isHovering && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300">
          {/* Progress bar */}
          <div
            className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-3 group/progress"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-white rounded-full transition-all duration-150 group-hover/progress:h-1.5"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <IconButton
                variant="ghost"
                icon={isPlaying ? <PauseIcon /> : <PlayIcon />}
                onClick={togglePlay}
                className="text-white hover:bg-white/20 border-none"
              />

              <div className="flex items-center gap-2">
                <IconButton
                  variant="ghost"
                  icon={<VolumeIcon />}
                  className="text-white hover:bg-white/20 border-none"
                />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
                />
              </div>

              <Text size="small" className="text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </Text>
            </div>

            <div className="flex items-center gap-2">
              {title && (
                <Text size="small" className="text-white/80 max-w-xs truncate">
                  {title}
                </Text>
              )}
              <IconButton
                variant="ghost"
                icon={<FullscreenIcon />}
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20 border-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};