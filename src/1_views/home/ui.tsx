'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { YouTubePlayer } from '@/shared/ui/youtube-player';
import { VideoCard } from '@/shared/ui/video-card';
import { Button } from '@/shared/ui/button';
import { Text } from '@/shared/ui/typography';
import { Badge } from '@/shared/ui/badge';
import { HeroVideosFeature } from '@/features/hero-section';
import { cn } from '@/shared/lib/utils';

// 샘플 비디오 데이터
const videoSections = {
  trending: {
    id: 'trending',
    title: '트렌딩',
    icon: '🔥',
    videos: [
      {
        id: 'dQw4w9WgXcQ',
        title: 'Rick Astley - Never Gonna Give You Up (Official Video)',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        duration: '3:33',
        channelName: 'Rick Astley',
        channelAvatar: 'https://picsum.photos/seed/rickastley/32/32',
        views: '1.4B views',
        uploadTime: '14 years ago',
        quality: 'HD' as const,
      },
      {
        id: 'jNQXAC9IVRw',
        title: 'Me at the zoo',
        thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
        duration: '0:19',
        channelName: 'jawed',
        channelAvatar: 'https://picsum.photos/seed/jawed/32/32',
        views: '300M views',
        uploadTime: '18 years ago',
        quality: 'SD' as const,
      },
      {
        id: 'kJQP7kiw5Fk',
        title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
        thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
        duration: '4:42',
        channelName: 'Luis Fonsi',
        channelAvatar: 'https://picsum.photos/seed/luisfonsi/32/32',
        views: '8.2B views',
        uploadTime: '7 years ago',
        quality: '4K' as const,
      },
    ],
  },
  technology: {
    id: 'technology',
    title: '기술',
    icon: '💻',
    videos: [
      {
        id: 'Ke90Tje7VS0',
        title: 'React in 100 Seconds',
        thumbnail: 'https://img.youtube.com/vi/Ke90Tje7VS0/maxresdefault.jpg',
        duration: '2:45',
        channelName: 'Fireship',
        channelAvatar: 'https://picsum.photos/seed/fireship/32/32',
        views: '2.1M views',
        uploadTime: '3 years ago',
        quality: 'HD' as const,
      },
      {
        id: 'w7ejDZ8SWv8',
        title: 'Next.js 13... this changes everything',
        thumbnail: 'https://img.youtube.com/vi/w7ejDZ8SWv8/maxresdefault.jpg',
        duration: '12:16',
        channelName: 'Fireship',
        channelAvatar: 'https://picsum.photos/seed/fireship2/32/32',
        views: '1.8M views',
        uploadTime: '2 years ago',
        quality: 'HD' as const,
      },
      {
        id: 'gT4il_ZATU8',
        title: 'TypeScript Tutorial for Beginners',
        thumbnail: 'https://img.youtube.com/vi/gT4il_ZATU8/maxresdefault.jpg',
        duration: '1:37:15',
        channelName: 'Programming with Mosh',
        channelAvatar: 'https://picsum.photos/seed/mosh/32/32',
        views: '3.4M views',
        uploadTime: '3 years ago',
        quality: 'HD' as const,
      },
    ],
  },
  music: {
    id: 'music',
    title: '음악',
    icon: '🎵',
    videos: [
      {
        id: 'fJ9rUzIMcZQ',
        title: 'Queen – Bohemian Rhapsody (Official Video Remastered)',
        thumbnail: 'https://img.youtube.com/vi/fJ9rUzIMcZQ/maxresdefault.jpg',
        duration: '5:55',
        channelName: 'Queen Official',
        channelAvatar: 'https://picsum.photos/seed/queen/32/32',
        views: '1.8B views',
        uploadTime: '14 years ago',
        quality: 'HD' as const,
      },
      {
        id: 'QH2-TGUlwu4',
        title: 'Nyan Cat [original]',
        thumbnail: 'https://img.youtube.com/vi/QH2-TGUlwu4/maxresdefault.jpg',
        duration: '3:37',
        channelName: 'saraj00n',
        channelAvatar: 'https://picsum.photos/seed/saraj00n/32/32',
        views: '230M views',
        uploadTime: '13 years ago',
        quality: 'SD' as const,
      },
      {
        id: '9bZkp7q19f0',
        title: 'PSY - GANGNAM STYLE(강남스타일) M/V',
        thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
        duration: '4:13',
        channelName: 'officialpsy',
        channelAvatar: 'https://picsum.photos/seed/psy/32/32',
        views: '4.8B views',
        uploadTime: '12 years ago',
        quality: 'HD' as const,
      },
    ],
  },
  gaming: {
    id: 'gaming',
    title: '게임',
    icon: '🎮',
    videos: [
      {
        id: 'hFZFjoX2cGg',
        title: 'Minecraft - Official Trailer',
        thumbnail: 'https://img.youtube.com/vi/hFZFjoX2cGg/maxresdefault.jpg',
        duration: '1:51',
        channelName: 'Minecraft',
        channelAvatar: 'https://picsum.photos/seed/minecraft/32/32',
        views: '120M views',
        uploadTime: '5 years ago',
        quality: 'HD' as const,
      },
      {
        id: 'BgAlQuqzl8o',
        title: 'Among Us Official Trailer',
        thumbnail: 'https://img.youtube.com/vi/BgAlQuqzl8o/maxresdefault.jpg',
        duration: '1:30',
        channelName: 'InnerSloth',
        channelAvatar: 'https://picsum.photos/seed/innersloth/32/32',
        views: '45M views',
        uploadTime: '4 years ago',
        quality: 'HD' as const,
      },
      {
        id: 'MmB9b5njVbA',
        title: 'The Legend of Zelda: Tears of the Kingdom – Official Trailer',
        thumbnail: 'https://img.youtube.com/vi/MmB9b5njVbA/maxresdefault.jpg',
        duration: '3:28',
        channelName: 'Nintendo',
        channelAvatar: 'https://picsum.photos/seed/nintendo/32/32',
        views: '28M views',
        uploadTime: '2 years ago',
        quality: '4K' as const,
      },
    ],
  },
};

// 히어로 섹션용 추천 비디오
const heroVideo = {
  id: 'dQw4w9WgXcQ',
  title: 'Rick Astley - Never Gonna Give You Up (Official Video)',
  description: '가장 유명한 인터넷 밈 중 하나가 된 Rick Astley의 클래식한 히트곡입니다. 1987년에 발매된 이 곡은 수십 년이 지난 지금도 사랑받고 있으며, "Rickrolling" 문화의 중심이 되었습니다.',
  thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
  channelName: 'Rick Astley',
  channelAvatar: 'https://picsum.photos/seed/rickastley/40/40',
  views: '1.4B views',
  uploadTime: '14 years ago',
};

export function HomePage() {
  const [activeSection, setActiveSection] = useState<keyof typeof videoSections>('trending');
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  const handleVideoClick = (videoId: string) => {
    setCurrentVideo(videoId);
  };

  const sections = Object.values(videoSections);
  const currentSectionVideos = videoSections[activeSection].videos;

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Hero Videos Feature Section */}
      <HeroVideosFeature />
      
      {/* Original Hero Section */}
      <section className="relative mb-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  🎬 Stella Clip
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-[var(--color-text-primary)] leading-tight">
                  Discover Amazing
                  <span className="block text-[var(--color-accent)]">
                    Video Content
                  </span>
                </h1>
                <Text size="large" color="secondary" className="max-w-lg">
                  {heroVideo.description}
                </Text>
              </div>

              {/* Hero Video Info */}
              <div className="flex items-center gap-4 p-4 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border-primary)]">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={heroVideo.channelAvatar}
                    alt={heroVideo.channelName}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <Text weight="medium" className="truncate">
                    {heroVideo.channelName}
                  </Text>
                  <Text size="small" color="tertiary">
                    {heroVideo.views} • {heroVideo.uploadTime}
                  </Text>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => handleVideoClick(heroVideo.id)}
                >
                  ▶ 지금 시청하기
                </Button>
                <Button variant="ghost" size="lg">
                  더 살펴보기
                </Button>
              </div>
            </div>

            {/* Hero Video Player */}
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                <YouTubePlayer
                  videoId={currentVideo || heroVideo.id}
                  title={heroVideo.title}
                  className="w-full h-full"
                  autoplay={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Navigation */}
      <section className="border-b border-[var(--color-border-primary)] mb-8">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-4">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? 'primary' : 'ghost'}
                size="md"
                onClick={() => setActiveSection(section.id as keyof typeof videoSections)}
                className={cn(
                  'flex-shrink-0 gap-2',
                  activeSection === section.id && 'shadow-lg'
                )}
              >
                <span className="text-base">{section.icon}</span>
                {section.title}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">{videoSections[activeSection].icon}</span>
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
              {videoSections[activeSection].title}
            </h2>
            <div className="flex-1 h-px bg-[var(--color-border-primary)]" />
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentSectionVideos.map((video) => (
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
                onClick={() => handleVideoClick(video.id)}
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
              더 많은 {videoSections[activeSection].title} 콘텐츠 보기
            </Button>
          </div>
        </div>
      </section>

      {/* Trending Section Preview */}
      {activeSection !== 'trending' && (
        <section className="bg-[var(--color-bg-secondary)] py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl">🔥</span>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                지금 인기 급상승
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoSections.trending.videos.slice(0, 3).map((video) => (
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
                  onClick={() => handleVideoClick(video.id)}
                  className="cursor-pointer transition-transform hover:scale-105"
                  size="md"
                  showChannel={true}
                  aspectRatio="16:9"
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <Button 
                variant="primary" 
                size="lg"
                onClick={() => setActiveSection('trending')}
              >
                모든 트렌딩 영상 보기
              </Button>
            </div>
          </div>
        </section>
      )}

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
              <Button variant="ghost" size="sm">소개</Button>
              <Button variant="ghost" size="sm">개인정보처리방침</Button>
              <Button variant="ghost" size="sm">이용약관</Button>
              <Button variant="ghost" size="sm">고객지원</Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}