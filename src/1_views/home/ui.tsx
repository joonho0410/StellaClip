'use client';

import React from 'react';
import { VideoCard } from '@/5_shared/ui/video-card';
import { Button } from '@/5_shared/ui/button';
import { Text } from '@/5_shared/ui/typography';
import { ContainerHeroSection } from '@/2_widgets/section-hero';
import { useVideoSearch, transformVideoForCard } from '@/5_shared/lib/hooks';

export function HomePage() {
  // Fetch RIN's official videos
  const {
    videos: stellaVideos,
    isLoading: stellaLoading,
    error: stellaError,
  } = useVideoSearch({
    stella: 'RIN',
    isOfficial: true,
    maxResult: 12,
    page: 1,
    enabled: true,
  });

  const handleVideoClick = () => {
    // TODO: Implement video click handling
  };

  // Get current section videos
  const getCurrentSectionVideos = () => {
    if (stellaLoading) return [];
    if (stellaError) return [];
    return stellaVideos.map(transformVideoForCard);
  };

  const currentSectionVideos = getCurrentSectionVideos();

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <ContainerHeroSection />

      {/* Video Grid Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">🎬</span>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
              RIN Official Videos
            </h2>
            <div className="flex-1 h-px bg-[var(--color-border-primary)]" />
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 @2xl:grid-cols-3 @5xl:grid-cols-4 gap-6">
            {/* Loading State for Stella Section */}
            {stellaLoading && (
              <>
                {Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="aspect-video rounded-lg bg-[var(--color-bg-secondary)] animate-pulse"
                  />
                ))}
              </>
            )}

            {/* Error State for Stella Section */}
            {stellaError && (
              <div className="col-span-full text-center py-8">
                <Text color="tertiary" className="mb-4">
                  RIN 영상을 불러오는 중 오류가 발생했습니다: {stellaError}
                </Text>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => window.location.reload()}
                >
                  다시 시도
                </Button>
              </div>
            )}

            {/* Empty State for Stella Section */}
            {!stellaLoading &&
              !stellaError &&
              currentSectionVideos.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <Text color="tertiary" className="mb-4">
                    RIN의 공식 영상이 없습니다.
                  </Text>
                  <Text size="small" color="tertiary">
                    영상을 수집하려면 위의 크롤링 버튼을 사용해보세요.
                  </Text>
                </div>
              )}

            {/* Video Cards */}
            {!stellaLoading &&
              currentSectionVideos.map((video) => (
                <VideoCard
                  key={video.id}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  duration={video.duration}
                  channelName={video.channelName}
                  channelAvatar={video.channelAvatar}
                  views={video.views}
                  uploadTime={video.uploadTime}
                  quality={video.quality}
                  onClick={handleVideoClick}
                  className="cursor-pointer transition-transform hover:scale-105"
                  size="md"
                  showChannel={true}
                  aspectRatio="16:9"
                />
              ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button variant="secondary" size="lg">
              더 많은 RIN 콘텐츠 보기
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border-primary)] py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <Text size="large" weight="medium">
              🎬 Stella Clip
            </Text>
            <Text color="tertiary">
              최고의 비디오 콘텐츠를 발견하고 즐기세요
            </Text>
            <div className="flex justify-center gap-4 mt-6">
              <Button variant="ghost" size="sm">
                소개
              </Button>
              <Button variant="ghost" size="sm">
                개인정보처리방침
              </Button>
              <Button variant="ghost" size="sm">
                이용약관
              </Button>
              <Button variant="ghost" size="sm">
                고객지원
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
