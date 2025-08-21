import { useQuery } from '@tanstack/react-query';
import { useSelectedGen, useSelectedStella } from '@/4_entities/member';
import type { VideoItem } from '@/4_entities/video/types';
import type { VideoDTO } from '@/Server/types/dto/VideoDTO';

async function fetchHeroVideos(gen: string, stella: string): Promise<VideoItem[]> {
  const searchParams = new URLSearchParams({
    isOfficial: 'true',
    maxResult: '20',
  });

  // Determine search type based on parameters
  if (stella !== 'ALL') {
    // Search by specific member
    searchParams.set('stella', stella);
  } else if (gen !== 'ALL') {
    // Search by generation
    searchParams.set('gen', gen);
  } else {
    // Search all official videos
    searchParams.set('stella', 'ALL');
  }

  const response = await fetch(`/api/videos/search?${searchParams}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch hero videos: ${response.statusText}`);
  }

  const result = await response.json();
  const videos: VideoDTO[] = result.data || [];
  
  // Transform VideoDTO to VideoItem
  return videos.map((video): VideoItem => ({
    id: video.id,
    youtubeId: video.videoId,
    title: video.title,
    description: video.description || '',
    thumbnail: video.thumbnailHigh || video.thumbnailMedium || video.thumbnailDefault || '',
    channelId: video.channelId,
    channelTitle: video.channelTitle,
    publishedAt: video.publishedAt,
    publishTime: video.publishedAt, // Use same value for both
    liveBroadcastContent: 'none', // Default value
    thumbnails: {
      default: { 
        url: video.thumbnailDefault || '', 
        width: 120, 
        height: 90 
      },
      medium: { 
        url: video.thumbnailMedium || '', 
        width: 320, 
        height: 180 
      },
      high: { 
        url: video.thumbnailHigh || '', 
        width: 480, 
        height: 360 
      },
    },
  }));
}

export function useHeroVideos() {
  const gen = useSelectedGen();
  const stella = useSelectedStella();

  const {
    data = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['heroVideos', gen, stella],
    queryFn: () => fetchHeroVideos(gen, stella),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    enabled: true,
  });

  return {
    data,
    loading,
    error: error as Error | null,
    refetch,
  };
}
