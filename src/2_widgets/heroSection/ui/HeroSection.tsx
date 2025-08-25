'use client';

import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { cn } from '@/5_shared/lib/utils';
import { Card } from '@/5_shared/ui/card';
import { Container } from '@/5_shared/ui/container';
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
    <section className={cn('py-4 mb-8 lg:py-6', className)}>
      <Container size="xl" className="px-2 sm:px-4">
        <Card variant="elevated" padding="none" className="overflow-hidden">
          <div className="@container p-4 lg:p-8">
            <div className="grid grid-cols-1 @2xl:grid-cols-2 gap-6 lg:gap-12 items-start @2xl:h-[300px]">
              {/* Video Section */}
              <div className="order-1 overflow-hidden min-w-0 self-center">
                <VideoSection
                  videos={videos}
                  onSlideChange={setActiveIndex}
                  thumbsSwiper={thumbsSwiper}
                  className="flex-2"
                />
              </div>
              {/* Description Section */}
              <DescriptionSection video={currentVideo} className="order-2" />
            </div>

            {/* Thumbnail Navigation - positioned at bottom of both sections */}
            <div className="hidden @2xl:block">
              <ThumbnailNavigation
                videos={videos}
                activeIndex={activeIndex}
                onThumbnailSwiperInit={setThumbsSwiper}
                onSlideChange={handleSlideChange}
                className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-[var(--color-border-primary)]"
              />
            </div>
          </div>
        </Card>
      </Container>
    </section>
  );
}
