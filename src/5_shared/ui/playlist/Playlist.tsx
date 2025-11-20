'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import { Text } from '../typography';
import { Button, IconButton } from '../button';
// import { Badge } from '../badge'; // Currently unused but may be needed for future features

export interface PlaylistItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  channelName?: string;
  views?: string;
  isActive?: boolean;
}

export interface PlaylistProps {
  title: string;
  items: PlaylistItem[];
  currentIndex?: number;
  onItemClick?: (item: PlaylistItem, index: number) => void;
  onPlayAll?: () => void;
  onShuffle?: () => void;
  className?: string;
  maxHeight?: string;
  showControls?: boolean;
  compact?: boolean;
}

// Icons
const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const ShuffleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="16,3 21,3 21,8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21,16 21,21 16,21" />
    <line x1="15" y1="15" x2="21" y2="21" />
    <line x1="4" y1="4" x2="9" y2="9" />
  </svg>
);

const PlayAllIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 4h4l2 5l-3 7h4l2-5-3-7h4" />
    <polygon points="5,17 8,20 8,14" />
    <polygon points="19,17 16,20 16,14" />
  </svg>
);

const DragIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="12" r="1" />
    <circle cx="9" cy="5" r="1" />
    <circle cx="9" cy="19" r="1" />
    <circle cx="15" cy="12" r="1" />
    <circle cx="15" cy="5" r="1" />
    <circle cx="15" cy="19" r="1" />
  </svg>
);

export function Playlist({
  title,
  items,
  currentIndex = -1,
  onItemClick,
  onPlayAll,
  onShuffle,
  className,
  maxHeight = "400px",
  showControls = true,
  compact = false,
}: PlaylistProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleItemClick = (item: PlaylistItem, index: number) => {
    onItemClick?.(item, index);
  };

  return (
    <div
      className={cn(
        'bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border-primary)]',
        className
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-[var(--color-border-primary)]">
        <div className="flex items-center justify-between">
          <div>
            <Text weight="semibold" className="mb-1">
              {title}
            </Text>
            <Text size="small" color="secondary">
              {items.length} videos
            </Text>
          </div>
          
          {showControls && (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<PlayAllIcon />}
                onClick={onPlayAll}
              >
                Play All
              </Button>
              <IconButton
                variant="ghost"
                size="sm"
                icon={<ShuffleIcon />}
                onClick={onShuffle}
              />
            </div>
          )}
        </div>
      </div>

      {/* Playlist Items */}
      <div
        className="overflow-y-auto"
        style={{ maxHeight }}
      >
        {items.map((item, index) => {
          const isActive = index === currentIndex;
          const isHovered = hoveredIndex === index;
          
          return (
            <div
              key={item.id}
              className={cn(
                'flex items-center gap-3 p-3 cursor-pointer transition-colors',
                'hover:bg-[var(--color-bg-tertiary)]',
                isActive && 'bg-[var(--color-bg-tertiary)] border-l-2 border-[var(--color-primary)]',
                compact ? 'p-2' : 'p-3'
              )}
              onClick={() => handleItemClick(item, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Index/Play Button */}
              <div className="flex items-center justify-center w-6 h-6 flex-shrink-0">
                {isActive ? (
                  <div className="w-3 h-3 bg-[var(--color-primary)] rounded-full animate-pulse" />
                ) : isHovered ? (
                  <PlayIcon />
                ) : (
                  <Text size="small" color="tertiary" weight="medium">
                    {index + 1}
                  </Text>
                )}
              </div>

              {/* Thumbnail */}
              <div className={cn(
                'relative flex-shrink-0 bg-[var(--color-bg-quaternary)] rounded overflow-hidden',
                compact ? 'w-16 h-12' : 'w-20 h-14'
              )}>
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80px, 64px"
                />
                <div className="absolute bottom-1 right-1 bg-black/80 text-white px-1 py-0.5 rounded text-xs">
                  {item.duration}
                </div>
              </div>

              {/* Video Info */}
              <div className="flex-1 min-w-0">
                <Text
                  size={compact ? "small" : "regular"}
                  weight="medium"
                  className={cn(
                    'line-clamp-2 mb-1',
                    isActive && 'text-[var(--color-primary)]'
                  )}
                >
                  {item.title}
                </Text>
                
                <div className="flex items-center gap-2 text-xs">
                  {item.channelName && (
                    <Text size="small" color="secondary">
                      {item.channelName}
                    </Text>
                  )}
                  {item.views && item.channelName && (
                    <Text size="small" color="tertiary">•</Text>
                  )}
                  {item.views && (
                    <Text size="small" color="tertiary">
                      {item.views}
                    </Text>
                  )}
                </div>
              </div>

              {/* Drag Handle */}
              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <IconButton
                  variant="ghost"
                  size="xs"
                  icon={<DragIcon />}
                  className="cursor-grab active:cursor-grabbing"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {items.length === 0 && (
        <div className="p-8 text-center">
          <Text color="tertiary">No videos in this playlist</Text>
        </div>
      )}
    </div>
  );
};