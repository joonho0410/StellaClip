import { useQuery } from '@tanstack/react-query';
import { useCohortStella } from '@/4_entities/URLQuery/model/store';
import type { VideoWithDetails } from '@/4_entities/video/api';
import type {
  CohortType,
  StellaType,
  VideoSortType,
} from '@/4_entities/URLQuery/model/type';

interface HeroVideoParams {
  cohort: CohortType;
  stella: StellaType;
  sort?: VideoSortType;
  limit?: number;
  offset?: number;
}

async function fetchHeroVideos(
  params: HeroVideoParams
): Promise<VideoWithDetails[]> {
  const searchParams = new URLSearchParams({
    cohort: params.cohort,
    stella: params.stella,
    limit: params.limit?.toString() || '8',
    offset: params.offset?.toString() || '0',
    ...(params.sort && { sort: params.sort }),
  });

  const response = await fetch(`/api/videos?${searchParams}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch videos: ${response.statusText}`);
  }

  return response.json();
}

export function useHeroVideos() {
  const { cohort, stella } = useCohortStella();

  const {
    data = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['heroVideos', { cohort, stella }],
    queryFn: () => fetchHeroVideos({ cohort, stella }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return {
    data,
    loading,
    error: error as Error | null,
    refetch,
  };
}
