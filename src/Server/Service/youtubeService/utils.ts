import type {
  YouTubeVideoDetailsResponse,
  YouTubeVideoDetails,
  YouTubeSearchResponse,
} from '../../types/dto/YouTubeDTO';
import type { CreateVideoDTO } from '../../types/dto/VideoDTO';

/**
 * YouTube API Configuration
 */
export interface YouTubeConfig {
  apiKey: string;
  maxResults: number;
  order: 'date' | 'relevance' | 'rating' | 'title' | 'videoCount' | 'viewCount';
}

/**
 * Get YouTube API configuration from environment variables
 */
export function getYouTubeConfig(): YouTubeConfig {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    throw new Error('YouTube API key not configured');
  }

  return {
    apiKey,
    maxResults: 20,
    order: 'date',
  };
}

/**
 * Get channel ID from environment variables based on channel name
 */
export function getChannelId(channelName: string): string {
  const channelIdKey = `NEXT_PUBLIC_${channelName.toUpperCase()}_CHANNEL_ID`;
  const channelId = process.env[channelIdKey];

  if (!channelId) {
    throw new Error(`Channel ID not found for: ${channelName}`);
  }

  return channelId;
}

/**
 * Get all official channel IDs from environment variables
 */
export function getAllOfficialChannelIds(): string[] {
  const officialChannelIds: string[] = [];
  
  // Get all environment variables that match the pattern NEXT_PUBLIC_*_CHANNEL_ID
  Object.keys(process.env).forEach(key => {
    if (key.startsWith('NEXT_PUBLIC_') && key.endsWith('_CHANNEL_ID')) {
      const channelId = process.env[key];
      if (channelId) {
        officialChannelIds.push(channelId);
      }
    }
  });
  
  return officialChannelIds;
}

/**
 * Search for videos in a YouTube channel using YouTube Data API
 */
export async function searchChannelVideos(
  channelId: string,
  apiKey: string,
  maxResults: number = 20
): Promise<string[]> {
  const url = `https://youtube.googleapis.com/youtube/v3/search?channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&key=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `YouTube search API failed: ${response.status} ${response.statusText}`
    );
  }

  const data: YouTubeSearchResponse = await response.json();

  return data.items
    .filter((item) => item.id.kind === 'youtube#video')
    .map((item) => item.id.videoId);
}

/**
 * Get detailed video information from YouTube Data API
 */
export async function getVideoDetails(
  videoIds: string[],
  apiKey: string
): Promise<YouTubeVideoDetails[]> {
  const videoIdsString = videoIds.join(',');
  const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIdsString}&maxResults=${videoIds.length}&key=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `YouTube videos API failed: ${response.status} ${response.statusText}`
    );
  }

  const data: YouTubeVideoDetailsResponse = await response.json();
  return data.items;
}

/**
 * Parse ISO 8601 duration format (e.g., "PT4M13S") to human-readable format (e.g., "4:13")
 */
export function parseYouTubeDuration(iso8601Duration: string): string | undefined {
  if (!iso8601Duration || iso8601Duration === 'PT0S') {
    return undefined;
  }

  try {
    // Remove "PT" prefix and parse the duration
    const duration = iso8601Duration.replace('PT', '');
    
    // Extract hours, minutes, and seconds using regex
    const hoursMatch = duration.match(/(\d+)H/);
    const minutesMatch = duration.match(/(\d+)M/);
    const secondsMatch = duration.match(/(\d+)S/);
    
    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
    const seconds = secondsMatch ? parseInt(secondsMatch[1], 10) : 0;
    
    // Format as HH:MM:SS or MM:SS
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  } catch (error) {
    console.error('Error parsing YouTube duration:', iso8601Duration, error);
    return undefined;
  }
}

/**
 * Convert YouTube API data to our database format
 */
export function convertYouTubeDataToVideoInputs(
  youtubeVideos: YouTubeVideoDetails[],
  officialChannelIds: string[],
  sourceQuery: string
): CreateVideoDTO[] {
  return youtubeVideos.map((video) => {
    const { id, snippet, statistics, contentDetails } = video;

    const isOfficial = officialChannelIds.includes(snippet.channelId);
    const viewCount = statistics.viewCount
      ? parseInt(statistics.viewCount, 10)
      : undefined;
    const likeCount = statistics.likeCount
      ? parseInt(statistics.likeCount, 10)
      : undefined;
    const tags = JSON.stringify(snippet.tags || []);
    const duration = parseYouTubeDuration(contentDetails.duration);

    return {
      videoId: id,
      title: snippet.title,
      description: snippet.description || undefined,
      publishedAt: snippet.publishedAt,
      thumbnailDefault: snippet.thumbnails.default?.url,
      thumbnailMedium: snippet.thumbnails.medium?.url,
      thumbnailHigh: snippet.thumbnails.high?.url,
      channelId: snippet.channelId,
      channelTitle: snippet.channelTitle,
      isOfficial,
      duration,
      viewCount,
      likeCount,
      tags,
      sourceQuery,
    };
  });
}

/**
 * Validate video data for required fields
 */
export function validateVideoInputs(
  videoInputs: CreateVideoDTO[]
): CreateVideoDTO[] {
  return videoInputs.filter((video) => {
    // Filter out videos without required fields
    return video.videoId && video.title && video.channelId;
  });
}

/**
 * Filter out videos from official channels for clip processing
 */
export function filterOutOfficialChannelVideos(
  videoInputs: CreateVideoDTO[]
): CreateVideoDTO[] {
  const officialChannelIds = getAllOfficialChannelIds();
  
  return videoInputs.filter((video) => {
    // Filter out videos that are from official channels
    const isFromOfficialChannel = officialChannelIds.includes(video.channelId);
    
    if (isFromOfficialChannel) {
      console.log(`[Filter] Skipping video ${video.videoId} from official channel ${video.channelId}`);
      return false;
    }
    
    return true;
  });
}

/**
 * Test YouTube API health by making a simple search request
 */
export async function testYouTubeAPIHealth(apiKey: string): Promise<boolean> {
  try {
    // Simple quota check - search for a single video
    const testUrl = `https://youtube.googleapis.com/youtube/v3/search?q=test&maxResults=1&key=${apiKey}`;
    const response = await fetch(testUrl);

    return response.ok;
  } catch (error) {
    console.error('YouTube API health check failed:', error);
    return false;
  }
}
