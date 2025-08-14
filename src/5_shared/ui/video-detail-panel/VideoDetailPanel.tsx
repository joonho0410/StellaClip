'use client';

import React from 'react';
import { cn } from '@/shared/lib/utils';
import { YouTubePlayer } from '../youtube-player';
import { Text, Heading } from '../typography';
import { Badge } from '../badge';
import { Button, IconButton } from '../button';
import { Avatar } from '../avatar';

export interface VideoDetailData {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  duration?: string;
  channelName?: string;
  channelAvatar?: string;
  views?: string;
  uploadTime?: string;
  isLive?: boolean;
  quality?: '4K' | 'HD' | 'SD';
  // Video source - YouTube only
  youtubeId?: string;
  tags?: string[];
  likeCount?: string;
  dislikeCount?: string;
}

export interface VideoDetailPanelProps {
  video: VideoDetailData;
  className?: string;
  onChannelClick?: (channelName: string) => void;
  onTagClick?: (tag: string) => void;
  onShare?: () => void;
  onSave?: () => void;
}

// Icons
const ShareIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.59 13.51 6.83 3.98" />
    <path d="m15.41 6.51-6.82 3.98" />
  </svg>
);

const BookmarkIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
  </svg>
);

const ThumbsUpIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M7 10v12" />
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h3.73a2 2 0 0 1 1.92 2.56z" />
  </svg>
);

const EyeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export function VideoDetailPanel({
  video,
  className,
  onChannelClick,
  onTagClick,
  onShare,
  onSave,
}: VideoDetailPanelProps) {
  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Video Player */}
      <div className="relative bg-black p-4">
        {video.youtubeId ? (
          <YouTubePlayer
            videoId={video.youtubeId}
            title={video.title}
            className="w-full aspect-video"
            autoplay={false}
          />
        ) : (
          <div className="w-full aspect-video bg-[var(--color-bg-tertiary)] flex items-center justify-center">
            <Text color="tertiary">Video not available</Text>
          </div>
        )}

        {/* Video Overlay Info */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          {video.isLive && (
            <Badge variant="danger" size="sm" className="bg-red-600 text-white">
              LIVE
            </Badge>
          )}
          {video.quality && (
            <Badge
              variant="outline"
              size="sm"
              className="bg-black/60 text-white border-white/20"
            >
              {video.quality}
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Title and Actions */}
        <div className="space-y-4">
          <Heading size="title4" className="leading-tight">
            {video.title}
          </Heading>

          {/* Metadata */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
              {video.views && (
                <div className="flex items-center gap-1">
                  <EyeIcon />
                  <Text size="small" color="secondary">
                    {video.views}
                  </Text>
                </div>
              )}
              {video.uploadTime && (
                <Text size="small" color="secondary">
                  {video.uploadTime}
                </Text>
              )}
            </div>

            <div className="flex items-center gap-2">
              {video.likeCount && (
                <Button variant="ghost" size="sm" leftIcon={<ThumbsUpIcon />}>
                  {video.likeCount}
                </Button>
              )}
              <IconButton
                variant="ghost"
                size="sm"
                icon={<ShareIcon />}
                onClick={onShare}
              />
              <IconButton
                variant="ghost"
                size="sm"
                icon={<BookmarkIcon />}
                onClick={onSave}
              />
            </div>
          </div>
        </div>

        {/* Channel Info */}
        {video.channelName && (
          <div
            className="flex items-center gap-3 p-4 rounded-lg bg-[var(--color-bg-secondary)] cursor-pointer hover:bg-[var(--color-bg-tertiary)] transition-colors"
            onClick={() => onChannelClick?.(video.channelName!)}
          >
            <Avatar
              src={video.channelAvatar}
              alt={video.channelName}
              fallback={video.channelName.charAt(0)}
              size="md"
            />
            <div className="flex-1">
              <Text weight="medium" color="primary">
                {video.channelName}
              </Text>
              <Text size="small" color="secondary">
                Click to view channel
              </Text>
            </div>
          </div>
        )}

        {/* Description */}
        {video.description && (
          <div className="space-y-2">
            <Text weight="semibold" color="primary">
              Description
            </Text>
            <div className="p-4 rounded-lg bg-[var(--color-bg-secondary)]">
              <Text
                size="regular"
                color="secondary"
                className="whitespace-pre-wrap leading-relaxed"
              >
                {video.description}
              </Text>
            </div>
          </div>
        )}

        {/* Tags */}
        {video.tags && video.tags.length > 0 && (
          <div className="space-y-2">
            <Text weight="semibold" color="primary">
              Tags
            </Text>
            <div className="flex flex-wrap gap-2">
              {video.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  size="sm"
                  className="cursor-pointer hover:bg-[var(--color-bg-tertiary)] transition-colors"
                  onClick={() => onTagClick?.(tag)}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Additional Video Info */}
        <div className="space-y-2">
          <Text weight="semibold" color="primary">
            Video Details
          </Text>
          <div className="p-4 rounded-lg bg-[var(--color-bg-secondary)] space-y-2">
            {video.duration && (
              <div className="flex justify-between">
                <Text size="small" color="tertiary">
                  Duration
                </Text>
                <Text size="small" color="secondary">
                  {video.duration}
                </Text>
              </div>
            )}
            {video.quality && (
              <div className="flex justify-between">
                <Text size="small" color="tertiary">
                  Quality
                </Text>
                <Text size="small" color="secondary">
                  {video.quality}
                </Text>
              </div>
            )}
            <div className="flex justify-between">
              <Text size="small" color="tertiary">
                Video ID
              </Text>
              <Text size="small" color="secondary" className="font-mono">
                {video.youtubeId || video.id}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
