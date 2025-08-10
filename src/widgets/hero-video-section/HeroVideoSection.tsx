'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import { Card, Container, Stack, Skeleton, Button } from '@/shared/ui';
import { VideoCard } from '@/shared/ui';
import { Heading, Text } from '@/shared/ui';

export interface VideoData {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  duration: string;
  channelName: string;
  channelAvatar: string;
  views: string;
  uploadTime: string;
  quality?: 'SD' | 'HD' | '4K';
}

export interface HeroVideoSectionProps {
  featuredVideo?: VideoData;
  relatedVideos?: VideoData[];
  isLoading?: boolean;
  cohort?: string;
  member?: string;
  onVideoClick?: (video: VideoData) => void;
  onViewAllClick?: () => void;
  className?: string;
}

export function HeroVideoSection({
  featuredVideo,
  relatedVideos = [],
  isLoading = false,
  cohort = 'ALL',
  member,
  onVideoClick,
  onViewAllClick,
  className
}: HeroVideoSectionProps) {
  const displayTitle = member 
    ? `${member}의 최신 영상`
    : cohort === 'ALL' 
      ? '공식채널 최신 영상'
      : `${cohort} 최신 영상`;

  if (isLoading) {
    return <HeroVideoSectionSkeleton className={className} />;
  }

  return (
    <section className={cn(
      'relative py-8 md:py-12',
      'bg-[var(--color-bg-primary)]',
      className
    )}>
      <Container size="xl">
        <Stack direction="column" spacing="lg">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Heading as="h2" size="title3" className="text-[var(--color-text-primary)]">
                {displayTitle}
              </Heading>
              <Text size="large" color="secondary">
                {member ? `${member}의 ` : cohort !== 'ALL' ? `${cohort} ` : ''}
                최신 업로드된 영상을 확인해보세요
              </Text>
            </div>
            {onViewAllClick && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onViewAllClick}
                className="hidden md:flex"
              >
                전체보기 →
              </Button>
            )}
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Featured Video - Large */}
            <div className="lg:col-span-2">
              {featuredVideo ? (
                <Card className="group cursor-pointer overflow-hidden border-0 bg-[var(--color-bg-secondary)]">
                  <div 
                    className="relative aspect-video overflow-hidden rounded-lg"
                    onClick={() => onVideoClick?.(featuredVideo)}
                  >
                    <Image
                      src={featuredVideo.thumbnail}
                      alt={featuredVideo.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-[12px] border-l-black border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                      </div>
                    </div>
                    {/* Duration */}
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm">
                      {featuredVideo.duration}
                    </div>
                    {featuredVideo.quality && (
                      <div className="absolute top-3 right-3 bg-[var(--color-accent)] text-white px-2 py-1 rounded text-xs font-medium">
                        {featuredVideo.quality}
                      </div>
                    )}
                  </div>
                  
                  {/* Video Info */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <Heading as="h3" size="title2" className="line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">
                        {featuredVideo.title}
                      </Heading>
                      {featuredVideo.description && (
                        <Text size="regular" color="tertiary" className="line-clamp-3">
                          {featuredVideo.description}
                        </Text>
                      )}
                    </div>
                    
                    {/* Channel Info */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={featuredVideo.channelAvatar}
                          alt={featuredVideo.channelName}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Text weight="medium" className="truncate">
                          {featuredVideo.channelName}
                        </Text>
                        <Text size="small" color="tertiary">
                          {featuredVideo.views} • {featuredVideo.uploadTime}
                        </Text>
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="aspect-video flex items-center justify-center bg-[var(--color-bg-secondary)] rounded-lg border-2 border-dashed border-[var(--color-border-primary)]">
                  <Text color="tertiary">추천 영상이 없습니다</Text>
                </div>
              )}
            </div>

            {/* Related Videos - Sidebar */}
            <div className="space-y-4">
              <div className="hidden lg:block">
                <Text size="large" weight="medium" className="mb-4">
                  관련 영상
                </Text>
              </div>
              
              {/* Mobile: Horizontal Scroll */}
              <div className="lg:hidden">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {relatedVideos.map((video) => (
                    <div key={video.id} className="flex-shrink-0 w-72">
                      <VideoCard
                        title={video.title}
                        thumbnail={video.thumbnail}
                        duration={video.duration}
                        channelName={video.channelName}
                        channelAvatar={video.channelAvatar}
                        views={video.views}
                        uploadTime={video.uploadTime}
                        quality={video.quality}
                        onClick={() => onVideoClick?.(video)}
                        size="sm"
                        aspectRatio="16:9"
                        showChannel={true}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop: Vertical List */}
              <div className="hidden lg:block space-y-3">
                {relatedVideos.slice(0, 4).map((video) => (
                  <div 
                    key={video.id}
                    className="group cursor-pointer"
                    onClick={() => onVideoClick?.(video)}
                  >
                    <div className="flex gap-3">
                      <div className="relative w-32 aspect-video flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                          sizes="128px"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white px-1.5 py-0.5 rounded text-xs">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 space-y-1">
                        <Text size="small" weight="medium" className="line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">
                          {video.title}
                        </Text>
                        <Text size="mini" color="tertiary">
                          {video.channelName}
                        </Text>
                        <Text size="mini" color="tertiary">
                          {video.views} • {video.uploadTime}
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Button - Mobile */}
              {onViewAllClick && (
                <div className="lg:hidden pt-4">
                  <Button 
                    variant="secondary" 
                    size="md"
                    fullWidth
                    onClick={onViewAllClick}
                  >
                    전체보기
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Stack>
      </Container>
    </section>
  );
}

function HeroVideoSectionSkeleton({ className }: { className?: string }) {
  return (
    <section className={cn(
      'relative py-8 md:py-12',
      'bg-[var(--color-bg-primary)]',
      className
    )}>
      <Container size="xl">
        <Stack direction="column" spacing="lg">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-5 w-72" />
            </div>
            <Skeleton className="h-9 w-20 hidden md:block" />
          </div>

          {/* Content Skeleton */}
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Featured Video Skeleton */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-0 bg-[var(--color-bg-secondary)]">
                <Skeleton className="aspect-video w-full" />
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-7 w-full" />
                    <Skeleton className="h-7 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Related Videos Skeleton */}
            <div className="space-y-4">
              <div className="hidden lg:block">
                <Skeleton className="h-6 w-20 mb-4" />
              </div>
              <div className="hidden lg:block space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex gap-3">
                    <Skeleton className="w-32 aspect-video rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Stack>
      </Container>
    </section>
  );
}