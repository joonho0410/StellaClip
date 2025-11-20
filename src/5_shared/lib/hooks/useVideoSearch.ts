'use client';

import { useState, useEffect } from 'react';

export interface VideoSearchResult {
  id: string;
  videoId: string;
  title: string;
  description: string | null;
  publishedAt: string;
  thumbnailDefault: string | null;
  thumbnailMedium: string | null;
  thumbnailHigh: string | null;
  channelId: string;
  channelTitle: string;
  isOfficial: boolean;
  duration: string | null;
  viewCount: number;
  likeCount: number | null;
  category: string | null;
  tags: string | null;
  memberAppearances: Array<{
    member: {
      id: string;
      name: string;
      displayName: string;
      generation: number;
      hashtags: string[];
    };
  }>;
}

export interface VideoSearchResponse {
  success: boolean;
  data: VideoSearchResult[];
  message?: string;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface UseVideoSearchParams {
  stella: string;
  isOfficial?: boolean;
  maxResult?: number;
  page?: number;
  enabled?: boolean;
}

export function useVideoSearch({
  stella,
  isOfficial,
  maxResult = 20,
  page = 1,
  enabled = true,
}: UseVideoSearchParams) {
  const [data, setData] = useState<VideoSearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || !stella) return;

    const fetchVideos = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const searchParams = new URLSearchParams({
          stella,
          page: page.toString(),
          maxResult: maxResult.toString(),
        });

        if (isOfficial !== undefined) {
          searchParams.append('isOfficial', isOfficial.toString());
        }

        const response = await fetch(`/api/videos/search?${searchParams.toString()}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: VideoSearchResponse = await response.json();
        
        if (!result.success) {
          throw new Error(result.message || 'Failed to fetch videos');
        }

        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching videos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, [stella, isOfficial, maxResult, page, enabled]);

  const refetch = () => {
    if (stella && enabled) {
      const searchParams = new URLSearchParams({
        stella,
        page: page.toString(),
        maxResult: maxResult.toString(),
      });

      if (isOfficial !== undefined) {
        searchParams.append('isOfficial', isOfficial.toString());
      }

      fetch(`/api/videos/search?${searchParams.toString()}`)
        .then(response => response.json())
        .then(setData)
        .catch(setError);
    }
  };

  return {
    data,
    videos: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    refetch,
  };
}

/**
 * Transform API video data to VideoCard props
 */
export function transformVideoForCard(video: VideoSearchResult) {
  // Format view count
  const formatViews = (count: number) => {
    if (count >= 1000000000) {
      return `${(count / 1000000000).toFixed(1)}B views`;
    } else if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
  };

  // Format upload time
  const formatUploadTime = (publishedAt: string) => {
    const now = new Date();
    const published = new Date(publishedAt);
    const diffInMs = now.getTime() - published.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return '1 day ago';
    } else if (diffInDays < 30) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffInDays / 365);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  };

  return {
    id: video.videoId,
    title: video.title,
    thumbnail: video.thumbnailHigh || video.thumbnailMedium || video.thumbnailDefault || `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`,
    duration: video.duration || '0:00',
    channelName: video.channelTitle,
    channelAvatar: `https://picsum.photos/seed/${video.channelId}/32/32`,
    views: formatViews(video.viewCount),
    uploadTime: formatUploadTime(video.publishedAt),
    quality: 'HD' as const,
  };
}