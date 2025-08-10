'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { HeroVideoSection, type VideoData } from '@/widgets/hero-video-section';
import { useQueryParams } from '@/shared/lib/query-params';
import { useHeroVideos, type HeroVideoFilters } from '@/entities/video';
import { VideoWithDetails } from '@/entities/video/api';

export interface HeroVideosFeatureProps {
  className?: string;
}

export function HeroVideosFeature({ className }: HeroVideosFeatureProps) {
  const router = useRouter();
  const { queryParams } = useQueryParams();

  // Query parameters를 Hero video filters로 변환
  const heroFilters: HeroVideoFilters = useMemo(() => ({
    cohort: queryParams.cohort || 'ALL',
    member: queryParams.member || undefined,
    search: queryParams.search || undefined,
    limit: 10,
  }), [queryParams.cohort, queryParams.member, queryParams.search]);

  // Hero videos 데이터 조회
  const {
    data: heroData,
    isLoading,
    error,
    refetch
  } = useHeroVideos(heroFilters);

  // VideoWithDetails를 VideoData로 변환하는 함수
  const transformVideoData = (video: VideoWithDetails): VideoData => {
    return {
      id: video.id,
      title: video.title,
      description: video.description || undefined,
      thumbnail: video.thumbnail || '/placeholder-video.jpg',
      duration: formatDuration(video.duration || 0),
      channelName: video.user.fullName || video.user.username || 'Unknown Channel',
      channelAvatar: video.user.avatarUrl || '/placeholder-avatar.jpg',
      views: formatViews(video.views || 0),
      uploadTime: formatUploadTime(video.createdAt),
      quality: getVideoQuality(video.videoUrl || video.youtubeUrl),
    };
  };

  // 변환된 비디오 데이터
  const featuredVideo = heroData?.featuredVideo ? transformVideoData(heroData.featuredVideo) : undefined;
  const relatedVideos = heroData?.relatedVideos?.map(transformVideoData) || [];

  // 비디오 클릭 핸들러
  const handleVideoClick = (video: VideoData) => {
    // 비디오 상세 페이지로 이동하거나 모달 열기
    router.push(`/video/${video.id}`);
  };

  // 전체보기 클릭 핸들러
  const handleViewAllClick = () => {
    // 비디오 목록 페이지로 이동
    const queryString = new URLSearchParams({
      ...(heroFilters.cohort !== 'ALL' && { cohort: heroFilters.cohort }),
      ...(heroFilters.member && { member: heroFilters.member }),
      ...(heroFilters.search && { search: heroFilters.search }),
    }).toString();

    router.push(`/videos${queryString ? `?${queryString}` : ''}`);
  };

  // 에러 상태 처리
  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-[var(--color-text-tertiary)] mb-4">
          영상을 불러오는 중 오류가 발생했습니다.
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <HeroVideoSection
      featuredVideo={featuredVideo}
      relatedVideos={relatedVideos}
      isLoading={isLoading}
      cohort={heroFilters.cohort}
      member={heroFilters.member}
      onVideoClick={handleVideoClick}
      onViewAllClick={handleViewAllClick}
      className={className}
    />
  );
}

// 유틸리티 함수들
function formatDuration(seconds: number): string {
  if (seconds < 60) {
    return `0:${seconds.toString().padStart(2, '0')}`;
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  
  if (minutes < 60) {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  return `${hours}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function formatViews(views: number): string {
  if (views < 1000) {
    return `${views} views`;
  }
  
  if (views < 1000000) {
    return `${Math.floor(views / 100) / 10}K views`;
  }
  
  if (views < 1000000000) {
    return `${Math.floor(views / 100000) / 10}M views`;
  }
  
  return `${Math.floor(views / 100000000) / 10}B views`;
}

function formatUploadTime(date: Date | string): string {
  const uploadDate = new Date(date);
  const now = new Date();
  const diffInMs = now.getTime() - uploadDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    }
    return `${diffInHours} hours ago`;
  }
  
  if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  }
  
  if (diffInDays < 365) {
    const diffInMonths = Math.floor(diffInDays / 30);
    return `${diffInMonths} months ago`;
  }
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} years ago`;
}

function getVideoQuality(videoUrl?: string | null): 'SD' | 'HD' | '4K' | undefined {
  if (!videoUrl) return undefined;
  
  // YouTube URL에서 품질 추정 (실제로는 API에서 품질 정보를 가져와야 함)
  if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
    // YouTube 비디오는 대부분 HD 이상
    return 'HD';
  }
  
  // 파일 이름이나 URL에서 품질 추정
  if (videoUrl.includes('4k') || videoUrl.includes('2160p')) {
    return '4K';
  }
  
  if (videoUrl.includes('hd') || videoUrl.includes('1080p') || videoUrl.includes('720p')) {
    return 'HD';
  }
  
  return 'SD';
}