'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { cn } from '@/5_shared/lib/utils';
import { useHeroVideos } from '../model/useHeroVideo';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

interface HeroSectionProps {
  className?: string;
}

export function HeroSection({ className }: HeroSectionProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: videos, loading, error } = useHeroVideos();

  if (loading) {
    return (
      <div className={cn('w-full max-w-6xl mx-auto p-4 mb-8', className)}>
        <div className="rounded-lg overflow-hidden shadow-lg h-[400px] bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-500">Loading videos...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('w-full max-w-6xl mx-auto p-4 mb-8', className)}>
        <div className="rounded-lg overflow-hidden shadow-lg h-[400px] bg-red-100 flex items-center justify-center">
          <div className="text-red-600">
            Error loading videos: {error.message}
          </div>
        </div>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className={cn('w-full max-w-6xl mx-auto p-4 mb-8', className)}>
        <div className="rounded-lg overflow-hidden shadow-lg h-[400px] bg-gray-100 flex items-center justify-center">
          <div className="text-gray-500">No videos available</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('w-full max-w-6xl mx-auto p-4 mb-8', className)}>
      {/* Main large video display */}
      <div className="relative">
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
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="rounded-lg overflow-hidden shadow-lg h-[400px]"
        >
          {videos.map((video) => (
            <SwiperSlide key={video.id}>
              <div className="relative h-[400px] bg-gray-900">
                <Image
                  src={video.thumbnail || '/placeholder-video.jpg'}
                  alt={video.title}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                  unoptimized
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gray-500 bg-opacity-30 hover:bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200">
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </div>
        <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-gray-500 bg-opacity-30 hover:bg-opacity-50 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200">
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </div>

        {/* Overlapping Thumbnail navigation - positioned at bottom of main video */}
        <div className="absolute bottom-4 left-0 right-0 z-10">
          <div className="bg-black/50 rounded-lg p-4 mx-auto max-w-full">
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbsSwiper}
              spaceBetween={12}
              slidesPerView={'auto'}
              freeMode={true}
              watchSlidesProgress={true}
              className="thumbnail-swiper h-[80px]"
              breakpoints={{
                320: {
                  slidesPerView: 3,
                  spaceBetween: 8
                },
                480: {
                  slidesPerView: 4,
                  spaceBetween: 10
                },
                640: {
                  slidesPerView: 5,
                  spaceBetween: 12
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 12
                }
              }}
            >
              {videos.map((video, index) => (
                <SwiperSlide key={video.id} className="w-auto">
                  <div
                    className={cn(
                      'relative h-[80px] w-[120px] cursor-pointer rounded-lg overflow-hidden transition-all duration-200 shadow-lg',
                      activeIndex === index
                        ? 'ring-4 ring-blue-500 scale-105'
                        : 'hover:ring-2 hover:ring-gray-300 hover:scale-105'
                    )}
                  >
                    <Image
                      src={video.thumbnail || '/placeholder-video.jpg'}
                      alt={video.title}
                      width={120}
                      height={80}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
