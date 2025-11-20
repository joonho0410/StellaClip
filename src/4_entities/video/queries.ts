'use client';

import { useQuery, useInfiniteQuery, type QueryClient } from '@tanstack/react-query';
import { VideoService, type VideoWithDetails } from './api';

// Query keys
export const videoQueries = {
  all: ['videos'] as const,
  lists: () => [...videoQueries.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...videoQueries.lists(), { filters }] as const,
  details: () => [...videoQueries.all, 'detail'] as const,
  detail: (id: string) => [...videoQueries.details(), id] as const,
  hero: () => [...videoQueries.all, 'hero'] as const,
  heroByFilters: (filters: HeroVideoFilters) => [...videoQueries.hero(), { filters }] as const,
};

// 공식채널 영상 필터 타입
export interface HeroVideoFilters {
  cohort?: string;
  member?: string;
  search?: string;
  limit?: number;
}

// 공식채널 영상 응답 타입
export interface HeroVideoResponse {
  featuredVideo: VideoWithDetails | null;
  relatedVideos: VideoWithDetails[];
  total: number;
  hasMore: boolean;
}

// Mock 공식채널 매핑 (실제로는 데이터베이스나 API에서 가져와야 함)
const COHORT_CHANNELS: Record<string, string[]> = {
  'ALL': ['모든 공식채널'],
  '1기': ['1기 공식채널', '1기 멤버들'],
  '2기': ['2기 공식채널', '2기 멤버들'], 
  '3기': ['3기 공식채널', '3기 멤버들'],
  '4기': ['4기 공식채널', '4기 멤버들'],
  '5기': ['5기 공식채널', '5기 멤버들'],
};

const MEMBER_CHANNELS: Record<string, string> = {
  '김철수': '김철수 채널',
  '이영희': '이영희 채널',
  '박민수': '박민수 채널',
  '정수영': '정수영 채널',
  '최진우': '최진우 채널',
  '한소라': '한소라 채널',
  '문대성': '문대성 채널',
  '조은비': '조은비 채널',
};

// 공식채널 영상 조회 서비스 (확장)
class HeroVideoService {
  // 공식채널 영상 조회 (실제로는 API 호출)
  static async getHeroVideos(filters: HeroVideoFilters): Promise<HeroVideoResponse> {
    const { cohort = 'ALL', member, search, limit = 10 } = filters;

    // 실제 구현에서는 cohort와 member에 따라 특정 채널의 영상들을 필터링
    let videos: VideoWithDetails[];
    
    if (search) {
      // 검색이 있는 경우 검색 결과
      videos = await VideoService.searchVideos(search, limit);
    } else {
      // 일반적인 공개 영상 조회
      videos = await VideoService.getPublicVideos(limit);
    }

    // cohort나 member 필터링 로직 (실제로는 데이터베이스 쿼리에서 처리)
    let filteredVideos = videos;
    
    if (member && MEMBER_CHANNELS[member]) {
      // 특정 멤버의 영상만 필터링
      filteredVideos = videos.filter(video => 
        video.user.fullName?.includes(member) || 
        video.user.username?.includes(member)
      );
    } else if (cohort !== 'ALL' && COHORT_CHANNELS[cohort]) {
      // 특정 기수의 영상만 필터링 (실제로는 사용자의 cohort 정보로 필터링)
      filteredVideos = videos.filter(() => {
        // 예시: 사용자의 cohort 정보로 필터링
        return true; // 실제 구현 필요
      });
    }

    const featuredVideo = filteredVideos[0] || null;
    const relatedVideos = filteredVideos.slice(1);

    return {
      featuredVideo,
      relatedVideos,
      total: filteredVideos.length,
      hasMore: filteredVideos.length >= limit,
    };
  }

  // 무한 스크롤용 영상 조회
  static async getInfiniteHeroVideos(
    filters: HeroVideoFilters, 
    pageParam: number = 0
  ): Promise<{
    videos: VideoWithDetails[];
    nextPage: number | undefined;
    hasNextPage: boolean;
  }> {
    const limit = filters.limit || 10;
    const offset = pageParam * limit;

    let videos: VideoWithDetails[];

    if (filters.search) {
      videos = await VideoService.searchVideos(filters.search, limit);
    } else {
      videos = await VideoService.getPublicVideos(limit, offset);
    }

    // 필터링 로직 적용
    let filteredVideos = videos;
    
    if (filters.member && MEMBER_CHANNELS[filters.member]) {
      filteredVideos = videos.filter(video => 
        video.user.fullName?.includes(filters.member!) || 
        video.user.username?.includes(filters.member!)
      );
    }

    const hasNextPage = filteredVideos.length >= limit;
    const nextPage = hasNextPage ? pageParam + 1 : undefined;

    return {
      videos: filteredVideos,
      nextPage,
      hasNextPage,
    };
  }
}

// Hero 영상 조회 훅
export function useHeroVideos(filters: HeroVideoFilters) {
  return useQuery({
    queryKey: videoQueries.heroByFilters(filters),
    queryFn: () => HeroVideoService.getHeroVideos(filters),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
    refetchOnWindowFocus: false,
  });
}

// 무한 스크롤 Hero 영상 조회 훅
export function useInfiniteHeroVideos(filters: HeroVideoFilters) {
  return useInfiniteQuery({
    queryKey: [...videoQueries.heroByFilters(filters), 'infinite'],
    queryFn: ({ pageParam = 0 }) => HeroVideoService.getInfiniteHeroVideos(filters, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });
}

// 개별 영상 조회 훅
export function useVideo(id: string) {
  return useQuery({
    queryKey: videoQueries.detail(id),
    queryFn: () => VideoService.getVideo(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 10, // 10분
    gcTime: 1000 * 60 * 60, // 1시간
  });
}

// 검색 영상 조회 훅
export function useSearchVideos(query: string, limit = 20) {
  return useQuery({
    queryKey: videoQueries.list({ search: query, limit }),
    queryFn: () => VideoService.searchVideos(query, limit),
    enabled: !!query && query.trim().length > 0,
    staleTime: 1000 * 60 * 2, // 2분 (검색 결과는 짧은 캐시)
    gcTime: 1000 * 60 * 10, // 10분
  });
}

// Prefetch 유틸리티
export const videoPrefetch = {
  heroVideos: (queryClient: QueryClient, filters: HeroVideoFilters) => {
    return queryClient.prefetchQuery({
      queryKey: videoQueries.heroByFilters(filters),
      queryFn: () => HeroVideoService.getHeroVideos(filters),
      staleTime: 1000 * 60 * 5,
    });
  },

  video: (queryClient: QueryClient, id: string) => {
    return queryClient.prefetchQuery({
      queryKey: videoQueries.detail(id),
      queryFn: () => VideoService.getVideo(id),
      staleTime: 1000 * 60 * 10,
    });
  },
};

// Query invalidation 유틸리티
export const videoInvalidate = {
  all: (queryClient: QueryClient) => {
    return queryClient.invalidateQueries({
      queryKey: videoQueries.all,
    });
  },

  heroVideos: (queryClient: QueryClient, filters?: Partial<HeroVideoFilters>) => {
    if (filters) {
      return queryClient.invalidateQueries({
        queryKey: videoQueries.heroByFilters(filters as HeroVideoFilters),
      });
    }
    return queryClient.invalidateQueries({
      queryKey: videoQueries.hero(),
    });
  },

  video: (queryClient: QueryClient, id: string) => {
    return queryClient.invalidateQueries({
      queryKey: videoQueries.detail(id),
    });
  },
};