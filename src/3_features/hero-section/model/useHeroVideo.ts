import { useQuery } from '@tanstack/react-query';
import type { VideoItem, YouTubeSearchResult } from '@/4_entities/video/types';

async function fetchHeroVideos(): Promise<VideoItem[]> {
  const response = await fetch('/api/getLatestVideo');

  if (!response.ok) {
    throw new Error(`Failed to fetch latest videos: ${response.statusText}`);
  }

  const result = await response.json();
  
  // Transform YouTube API data to VideoItem format
  const transformedVideos: VideoItem[] = result.data.items.map((item: YouTubeSearchResult) => ({
    id: item.id.videoId,
    youtubeId: item.id.videoId,
    title: item.snippet?.title || '',
    description: item.snippet?.description || '',
    thumbnail: item.snippet?.thumbnails.high?.url || item.snippet?.thumbnails.medium?.url || item.snippet?.thumbnails.default?.url || '',
    channelId: item.snippet?.channelId || '',
    channelTitle: item.snippet?.channelTitle || '',
    publishedAt: item.snippet?.publishedAt || '',
    publishTime: item.snippet?.publishTime || '',
    liveBroadcastContent: item.snippet?.liveBroadcastContent || '',
    thumbnails: item.snippet?.thumbnails || {
      default: { url: '', width: 120, height: 90 },
      medium: { url: '', width: 320, height: 180 },
      high: { url: '', width: 480, height: 360 },
    },
  }));

  return transformedVideos;
}

export function useHeroVideos() {
  const {
    data = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['heroVideos'],
    queryFn: fetchHeroVideos,
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
