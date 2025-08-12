'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { cn } from '@/5_shared/lib/utils';
import type { VideoItem } from '@/4_entities/video/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { VideoThumbnail } from '@/4_entities/video/ui/Thumbnail';

interface VideoSectionProps {
  videos: VideoItem[];
  onSlideChange: (index: number) => void;
  thumbsSwiper: SwiperType | null;
  className?: string;
}

export function VideoSection({
  videos,
  onSlideChange,
  thumbsSwiper,
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
          onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}
          className="w-full max-w-full h-full overflow-hidden"
        >
          {videos.map((video) => (
            <SwiperSlide key={video.id}>
              <VideoThumbnail video={video} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
}
