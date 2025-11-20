'use client';

import React, { useState } from 'react';
import { cn } from '@/5_shared/lib/utils';
import { Heading, Text } from '../typography';
import { Button, IconButton } from '../button';
import { VideoGrid } from '../video-grid';
import { VideoCard, VideoCardProps } from '@/4_entities/video/ui';
import { ChevronLeftIcon, ChevronRightIcon } from '@/5_shared/svg';

export interface CategorySectionProps {
  title: string;
  description?: string;
  videos: (VideoCardProps & { id: string })[];
  showViewAll?: boolean;
  viewAllText?: string;
  onViewAll?: () => void;
  onVideoClick?: (videoId: string, video: VideoCardProps) => void;
  className?: string;
  headerClassName?: string;
  maxItems?: number;
  cardSize?: 'sm' | 'md' | 'lg';
  aspectRatio?: '16:9' | '4:3' | '1:1';
  showChannel?: boolean;
  layout?: 'grid' | 'carousel';
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  colsDesktop?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}


export function CategorySection({
  title,
  description,
  videos,
  showViewAll = true,
  viewAllText = 'View All',
  onViewAll,
  onVideoClick,
  className,
  headerClassName,
  maxItems,
  cardSize = 'md',
  aspectRatio = '16:9',
  showChannel = true,
  layout = 'grid',
  cols = 1,
  colsDesktop = 3,
}: CategorySectionProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const displayVideos = maxItems ? videos.slice(0, maxItems) : videos;

  const scrollLeft = () => {
    const container = document.getElementById(`carousel-${title.replace(/\s+/g, '-')}`);
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      setScrollPosition(Math.max(0, scrollPosition - scrollAmount));
    }
  };

  const scrollRight = () => {
    const container = document.getElementById(`carousel-${title.replace(/\s+/g, '-')}`);
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(scrollPosition + scrollAmount);
    }
  };

  if (displayVideos.length === 0) {
    return null;
  }

  const renderGrid = () => (
    <VideoGrid
      videos={displayVideos}
      cols={cols}
      colsDesktop={colsDesktop}
      cardSize={cardSize}
      aspectRatio={aspectRatio}
      showChannel={showChannel}
      onVideoClick={onVideoClick}
    />
  );

  const renderCarousel = () => (
    <div className="relative group">
      {/* Navigation Buttons */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <IconButton
          variant="ghost"
          icon={<ChevronLeftIcon />}
          onClick={scrollLeft}
          className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 border-none shadow-lg"
        />
      </div>
      
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <IconButton
          variant="ghost"
          icon={<ChevronRightIcon />}
          onClick={scrollRight}
          className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 border-none shadow-lg"
        />
      </div>

      {/* Scrollable Container */}
      <div
        id={`carousel-${title.replace(/\s+/g, '-')}`}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayVideos.map((video) => (
          <div key={video.id} className="flex-none w-80">
            <VideoCard
              {...video}
              size={cardSize}
              aspectRatio={aspectRatio}
              showChannel={showChannel}
              onClick={() => onVideoClick?.(video.id, video)}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className={cn('space-y-6', className)}>
      {/* Header */}
      <div className={cn('flex items-center justify-between', headerClassName)}>
        <div className="space-y-1">
          <Heading as="h2" size="title2">
            {title}
          </Heading>
          {description && (
            <Text color="secondary" size="regular">
              {description}
            </Text>
          )}
        </div>

        {showViewAll && onViewAll && (
          <Button
            variant="ghost"
            onClick={onViewAll}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          >
            {viewAllText}
          </Button>
        )}
      </div>

      {/* Content */}
      {layout === 'carousel' ? renderCarousel() : renderGrid()}
    </section>
  );
};