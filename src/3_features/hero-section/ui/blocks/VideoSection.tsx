'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { cn } from '@/5_shared/lib/utils';
import type { VideoWithDetails } from '@/4_entities/video/api';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

interface VideoSectionProps {
  videos: VideoWithDetails[];
  onSlideChange: (index: number) => void;
  thumbsSwiper: SwiperType | null;
  onMainSwiperInit?: (swiper: SwiperType) => void;
  className?: string;
}

export function VideoSection({
  videos,
  onSlideChange,
  thumbsSwiper,
  onMainSwiperInit,
  className,
}: VideoSectionProps) {
  return (
    <div
      className={cn(
        'relative w-full max-w-full overflow-hidden min-w-0',
        className
      )}
    >
      {/* Main Video Player */}
      <div
        className="relative w-full max-w-full aspect-video overflow-hidden rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl lg:shadow-2xl bg-[var(--color-bg-secondary)] min-w-0"
        style={{ maxHeight: '400px' }}
      >
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          spaceBetween={10}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          pagination={{ clickable: true }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            slideThumbActiveClass: 'swiper-slide-thumb-active',
          }}
          onSwiper={onMainSwiperInit}
          onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}
          className="w-full max-w-full h-full overflow-hidden"
        >
          {videos.map((video) => (
            <SwiperSlide key={video.id}>
              <div className="relative w-full max-w-full h-full overflow-hidden aspect-video">
                <Image
                  src={
                    video.thumbnail?.replace('hqdefault', 'maxresdefault') ||
                    '/placeholder-video.jpg'
                  }
                  alt={video.title}
                  fill
                  className="object-cover"
                  unoptimized
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Navigation Arrows - Hidden on very small screens */}
      <div className="swiper-button-prev-custom absolute left-1 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[var(--color-bg-secondary)] bg-opacity-80 hover:bg-opacity-95 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 border border-[var(--color-border-primary)] backdrop-blur-sm">
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-[var(--color-text-primary)]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </div>
      <div className="swiper-button-next-custom absolute right-1 sm:right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[var(--color-bg-secondary)] bg-opacity-80 hover:bg-opacity-95 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 border border-[var(--color-border-primary)] backdrop-blur-sm">
        <svg
          className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 text-[var(--color-text-primary)]"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </div>
    </div>
  );
}
