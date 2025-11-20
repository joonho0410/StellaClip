import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import { Text } from '../typography';
import { Badge } from '../badge';
import { VideoPlaceholder, AvatarPlaceholder } from '../placeholder-image';

export interface VideoCardProps {
  title: string;
  thumbnail: string;
  duration?: string;
  channelName?: string;
  channelAvatar?: string;
  views?: string;
  uploadTime?: string;
  isLive?: boolean;
  quality?: '4K' | 'HD' | 'SD';
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showChannel?: boolean;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  priority?: boolean; // Add priority prop for image loading
  // Extended props for video detail  
  id?: string;
  description?: string;
  youtubeId?: string;
  tags?: string[];
  likeCount?: string;
  dislikeCount?: string;
}

const sizeStyles = {
  sm: {
    container: 'w-full max-w-xs',
    thumbnail: 'h-40',
    spacing: 'p-3',
  },
  md: {
    container: 'w-full max-w-sm',
    thumbnail: 'h-48',
    spacing: 'p-4',
  },
  lg: {
    container: 'w-full max-w-md',
    thumbnail: 'h-56',
    spacing: 'p-4',
  },
};

const aspectRatioStyles = {
  '16:9': 'aspect-video',
  '4:3': 'aspect-[4/3]',
  '1:1': 'aspect-square',
};

export function VideoCard({
  title,
  thumbnail,
  duration,
  channelName,
  channelAvatar,
  views,
  uploadTime,
  isLive = false,
  quality,
  onClick,
  className,
  size = 'md',
  showChannel = true,
  aspectRatio = '16:9',
  priority = false,
  // Extended props (not used in display but passed through for VideoCardWithPanel)
  id: _id,
  description: _description,
  youtubeId: _youtubeId,
  tags: _tags,
  likeCount: _likeCount,
  dislikeCount: _dislikeCount
}: VideoCardProps) {
  const sizeConfig = sizeStyles[size];
  const [thumbnailError, setThumbnailError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  // Check if URL is valid and from allowed domains
  const isValidUrl = (url: string | undefined) => {
    if (!url || url.trim() === '') return false;
    
    try {
      const urlObj = new URL(url);
      
      // List of allowed domains from next.config.ts
      const allowedDomains = [
        'img.youtube.com',
        'i.ytimg.com', 
        'images.unsplash.com',
        'picsum.photos',
        'via.placeholder.com'
      ];
      
      // Check if hostname is in allowed list
      return allowedDomains.includes(urlObj.hostname);
    } catch {
      return false;
    }
  };

  const handleThumbnailError = () => {
    setThumbnailError(true);
  };

  const handleAvatarError = () => {
    setAvatarError(true);
  };

  return (
    <div
      className={cn(
        'bg-[var(--color-bg-secondary)] rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:bg-[var(--color-bg-tertiary)] hover:scale-[1.02] group',
        sizeConfig.container,
        className
      )}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className={cn('relative overflow-hidden', aspectRatioStyles[aspectRatio])}>
        {thumbnailError || !isValidUrl(thumbnail) ? (
          <div className="w-full h-full flex items-center justify-center bg-[var(--color-bg-tertiary)]">
            <VideoPlaceholder size="lg" />
          </div>
        ) : (
          <Image
            src={thumbnail!}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            onError={handleThumbnailError}
          />
        )}
        
        {/* Overlay badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        
        {/* Duration or Live badge */}
        <div className="absolute bottom-2 right-2 flex gap-1">
          {isLive && (
            <Badge variant="danger" size="sm" className="bg-red-600 text-white">
              LIVE
            </Badge>
          )}
          {duration && !isLive && (
            <div className="bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
              {duration}
            </div>
          )}
        </div>

        {/* Quality badge */}
        {quality && (
          <div className="absolute top-2 right-2">
            <Badge variant="outline" size="sm" className="bg-black/60 text-white border-white/20">
              {quality}
            </Badge>
          </div>
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={cn(sizeConfig.spacing)}>
        <div className="flex gap-3">
          {/* Channel Avatar */}
          {showChannel && (
            <div className="flex-shrink-0 mt-1">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                {avatarError || !isValidUrl(channelAvatar) ? (
                  <AvatarPlaceholder size="md" />
                ) : (
                  <Image
                    src={channelAvatar!}
                    alt={channelName || 'Channel avatar'}
                    fill
                    className="object-cover"
                    sizes="32px"
                    onError={handleAvatarError}
                  />
                )}
              </div>
            </div>
          )}

          {/* Video Info */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <Text
              className="font-medium line-clamp-2 group-hover:text-[var(--color-text-primary)] transition-colors"
              color="primary"
            >
              {title}
            </Text>

            {/* Channel Name */}
            {showChannel && channelName && (
              <Text
                size="small"
                color="secondary"
                className="mt-1 hover:text-[var(--color-text-primary)] transition-colors"
              >
                {channelName}
              </Text>
            )}

            {/* Metadata */}
            <div className="flex items-center gap-1 mt-1">
              {views && (
                <>
                  <Text size="small" color="tertiary">
                    {views}
                  </Text>
                  {uploadTime && (
                    <>
                      <Text size="small" color="tertiary">•</Text>
                      <Text size="small" color="tertiary">
                        {uploadTime}
                      </Text>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};