'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { cn } from '@/5_shared/lib/utils';
import type { VideoItem } from '@/4_entities/video/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/thumbs';

interface ThumbnailNavigationProps {
  videos: VideoItem[];
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
    <div className={cn('w-full relative', className)}>
      <div className="bg-[var(--color-bg-tertiary)] backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-4 mx-auto w-full border border-[var(--color-border-primary)]">
        <Swiper
          modules={[Thumbs, Navigation]}
          onSwiper={onThumbnailSwiperInit}
          spaceBetween={6}
          slidesPerView={'auto'}
          freeMode={true}
          watchSlidesProgress={true}
          navigation={{
            prevEl: '.thumbnail-button-prev',
            nextEl: '.thumbnail-button-next',
          }}
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

      {/* Custom Navigation Arrows for Thumbnail Swiper */}
      <div className="thumbnail-button-prev absolute left-0 top-0 z-20 w-8 sm:w-10 lg:w-12 h-full bg-gray-500 bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center cursor-pointer transition-all duration-200">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[var(--color-text-primary)] drop-shadow-lg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </div>
      <div className="thumbnail-button-next absolute right-0 top-0 z-20 w-8 sm:w-10 lg:w-12 h-full bg-gray-500 bg-opacity-10 hover:bg-opacity-20 flex items-center justify-center cursor-pointer transition-all duration-200">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[var(--color-text-primary)] drop-shadow-lg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </div>
    </div>
  );
}