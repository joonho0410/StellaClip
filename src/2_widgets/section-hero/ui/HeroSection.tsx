'use client';

import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { cn } from '@/5_shared/lib/utils';
import { Card } from '@/5_shared/ui/card';
import {
  VideoSection,
  DescriptionSection,
  ThumbnailNavigation,
} from './blocks';
import { VideoItem } from '@/4_entities';

interface HeroSectionProps {
  className?: string;
  videos: VideoItem[];
}

export function HeroSection({ className, videos }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const currentVideo = videos[activeIndex];

  const handleSlideChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div
      className={cn(
        'w-full max-w-7xl mx-auto px-4 py-4 mb-8 lg:px-6 lg:py-6',
        className
      )}
    >
      <Card
        variant="elevated"
        padding="none"
        className="overflow-hidden w-full max-w-full"
      >
        <div className="@container p-4 lg:p-8 w-full max-w-full overflow-hidden">
          <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-6 lg:gap-12 items-start w-full max-w-full">
            {/* Video Section */}
            <div className="w-full max-w-full order-1 overflow-hidden min-w-0 self-center">
              <VideoSection
                videos={videos}
                onSlideChange={setActiveIndex}
                thumbsSwiper={thumbsSwiper}
                className="w-full max-w-full flex-2"
              />
            </div>
            {/* Description Section */}
            <DescriptionSection video={currentVideo} className="order-2" />
          </div>
        </div>

        {/* Thumbnail Navigation - positioned at bottom of both sections */}
        <div className="px-4 lg:px-8 pb-4 lg:pb-8 hidden lg:block">
          <ThumbnailNavigation
            videos={videos}
            activeIndex={activeIndex}
            onThumbnailSwiperInit={setThumbsSwiper}
            onSlideChange={handleSlideChange}
            className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-[var(--color-border-primary)]"
          />
        </div>
      </Card>
    </div>
  );
}
