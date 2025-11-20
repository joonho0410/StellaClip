'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { cn } from '@/5_shared/lib/utils';
import type { VideoWithDetails } from '@/4_entities/video/api';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/thumbs';

interface ThumbnailNavigationProps {
  videos: VideoWithDetails[];
  activeIndex: number;
  onThumbnailSwiperInit: (swiper: SwiperType) => void;
  onSlideChange?: (index: number) => void;
  className?: string;
}

export function ThumbnailNavigation({ 
  videos, 
  activeIndex, 
  onThumbnailSwiperInit,
  onSlideChange, 
  className 
}: ThumbnailNavigationProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="bg-[var(--color-bg-tertiary)] backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-4 mx-auto w-full border border-[var(--color-border-primary)]">
        <Swiper
          modules={[Thumbs]}
          onSwiper={onThumbnailSwiperInit}
          spaceBetween={6}
          slidesPerView={'auto'}
          freeMode={true}
          watchSlidesProgress={true}
          className="thumbnail-swiper h-[50px] sm:h-[60px] lg:h-[80px]"
          breakpoints={{
            320: {
              slidesPerView: 'auto',
              spaceBetween: 4,
            },
            480: {
              slidesPerView: 'auto',
              spaceBetween: 6,
            },
            640: {
              slidesPerView: 'auto',
              spaceBetween: 8,
            },
            1024: {
              slidesPerView: 'auto',
              spaceBetween: 12,
            },
          }}
        >
          {videos.map((video, index) => (
            <SwiperSlide key={video.id} className="!w-auto">
              <div
                onClick={() => onSlideChange?.(index)}
                className={cn(
                  'relative h-[50px] w-[75px] sm:h-[60px] sm:w-[90px] lg:h-[80px] lg:w-[120px] cursor-pointer rounded-md sm:rounded-lg overflow-hidden transition-all duration-200 shadow-lg flex-shrink-0',
                  activeIndex === index
                    ? 'ring-2 sm:ring-3 lg:ring-4 ring-[var(--color-primary)] scale-105'
                    : 'hover:ring-1 sm:hover:ring-2 hover:ring-[var(--color-border-secondary)] hover:scale-105'
                )}
              >
                <Image
                  src={
                    video.thumbnail?.replace('hqdefault', 'maxresdefault') ||
                    '/placeholder-video.jpg'
                  }
                  alt={video.title}
                  fill
                  className="object-cover"
                  unoptimized
                  sizes="(max-width: 640px) 75px, (max-width: 1024px) 90px, 120px"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}