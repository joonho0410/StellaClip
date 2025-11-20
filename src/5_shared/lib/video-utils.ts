/**
 * Video-related utility functions
 */

/**
 * Format view count number to human-readable string
 */
export function formatViewCount(viewCount: number | null | undefined): string | undefined {
  if (viewCount === null || viewCount === undefined) {
    return undefined;
  }

  if (viewCount >= 1000000) {
    return `${(viewCount / 1000000).toFixed(1)}M views`;
  }
  
  if (viewCount >= 1000) {
    return `${(viewCount / 1000).toFixed(1)}K views`;
  }
  
  return `${viewCount} views`;
}

/**
 * Format upload time from ISO string to relative time string
 */
export function formatUploadTime(publishedAt: string | undefined): string | undefined {
  if (!publishedAt) {
    return undefined;
  }

  try {
    const publishDate = new Date(publishedAt);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - publishDate.getTime()) / (1000 * 3600 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  } catch {
    return undefined;
  }
}

/**
 * Get display channel name with fallback
 */
export function getDisplayChannelName(channelTitle?: string, fallbackChannelName?: string): string | undefined {
  return channelTitle || fallbackChannelName;
}