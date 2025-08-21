import { useQuery } from '@tanstack/react-query';
import type { AllMember, GenType } from '@/4_entities/member';
import { videoApi } from '../api';
import type { SearchVideosRequest } from '../api';

export interface SearchVideosParams extends SearchVideosRequest {
  enabled?: boolean;
}

export function useSearchVideos(params: SearchVideosParams) {
  const {
    member = 'ALL',
    generation = 'ALL', 
    isOfficial = true,
    maxResult = 20,
    page = 1,
    enabled = true
  } = params;

  // API 호출용 매개변수 (enabled 제외)
  const apiParams: SearchVideosRequest = {
    member,
    generation,
    isOfficial,
    maxResult,
    page
  };

  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['videos', 'search', apiParams],
    queryFn: () => videoApi.searchVideos(apiParams),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    enabled,
  });

  return {
    videos: data,
    isLoading,
    error: error as Error | null,
    refetch,
  };
}