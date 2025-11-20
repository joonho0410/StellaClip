import { useQuery } from '@tanstack/react-query';
import type { VideoWithDetails } from '@/4_entities/video/api';

async function fetchHeroVideos(): Promise<VideoWithDetails[]> {
  const response = await fetch('/api/getLatestVideo');

  if (!response.ok) {
    throw new Error(`Failed to fetch latest videos: ${response.statusText}`);
  }

  const result = await response.json();
  
  // Transform YouTube API data to VideoWithDetails format
  const transformedVideos: VideoWithDetails[] = result.data.items.map((item: {
    id: { videoId: string };
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      channelId: string;
      channelTitle: string;
      thumbnails: {
        default?: { url: string };
        medium?: { url: string };
        high?: { url: string };
      };
    };
  }) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    description: item.snippet.description,
    thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url || null,
    videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    youtubeId: item.id.videoId,
    youtubeUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    duration: null,
    views: 0,
    isPublic: true,
    createdAt: new Date(item.snippet.publishedAt),
    updatedAt: new Date(item.snippet.publishedAt),
    userId: item.snippet.channelId,
    user: {
      id: item.snippet.channelId,
      username: item.snippet.channelTitle,
      fullName: item.snippet.channelTitle,
      avatarUrl: null,
    },
    tags: [],
    _count: {
      comments: 0,
      likes: 0,
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
