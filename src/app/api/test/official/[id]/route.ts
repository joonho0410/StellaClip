import { NextRequest, NextResponse } from 'next/server';
import { YouTubeVideoDetailsResponse } from '@/4_entities/video/types';
import { convertYouTubeVideosToVideoInputs } from '@/4_entities/video/lib/utils';
import { VideoService } from '@/4_entities/video/api';

// YouTube Search API response types
interface YouTubeSearchResponse {
  items: Array<{
    id: {
      kind: string;
      videoId: string;
    };
  }>;
}

// Utility function to extract video IDs from YouTube search response
function extractVideoIds(searchResponse: YouTubeSearchResponse): string[] {
  return searchResponse.items
    .filter(item => item.id.kind === 'youtube#video')
    .map(item => item.id.videoId);
}

// Function to fetch latest videos from a channel
async function fetchChannelVideos(channelId: string, apiKey: string) {
  const youtubeUrl = `https://youtube.googleapis.com/youtube/v3/search?channelId=${channelId}&maxResults=20&order=date&type=video&key=${apiKey}`;

  const response = await fetch(youtubeUrl);

  if (!response.ok) {
    throw new Error(`YouTube API request failed: ${response.status}`);
  }

  return await response.json();
}

// Function to fetch detailed video information
async function fetchVideoDetails(videoIds: string[], apiKey: string) {
  const videoIdsString = videoIds.join(',');
  const maxResults = videoIds.length;

  const youtubeUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIdsString}&maxResults=${maxResults}&key=${apiKey}`;

  const response = await fetch(youtubeUrl);

  if (!response.ok) {
    throw new Error(
      `YouTube video details API request failed: ${response.status}`
    );
  }

  return await response.json();
}

export async function POST(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Get YouTube API key from environment
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'YouTube API key not configured' },
        { status: 500 }
      );
    }

    // Get channel ID from environment based on the id parameter
    const channelIdKey = `NEXT_PUBLIC_${id.toUpperCase()}_CHANNEL_ID`;
    const channelId = process.env[channelIdKey];

    if (!channelId) {
      return NextResponse.json(
        { error: `Channel ID not found for: ${id}` },
        { status: 404 }
      );
    }

    // Step 1: Fetch latest videos from channel
    const channelVideos = await fetchChannelVideos(channelId, apiKey);

    // Extract video IDs from the search results using utility function
    const videoIds = extractVideoIds(channelVideos);

    if (videoIds.length === 0) {
      return NextResponse.json(
        { message: 'No videos found for this channel' },
        { status: 200 }
      );
    }

    // Step 2: Fetch detailed information for each video
    const videoDetails: YouTubeVideoDetailsResponse = await fetchVideoDetails(videoIds, apiKey);

    // Step 3: Convert YouTube data to our database format
    const officialChannelIds = [channelId]; // Mark this as official channel
    const videoInputs = convertYouTubeVideosToVideoInputs(
      videoDetails.items,
      officialChannelIds,
      `channel:${id}` // sourceQuery to track where this came from
    );

    // Step 4: Update database with video details
    const savedVideos = await VideoService.upsertVideosFromYouTube(videoInputs);

    return NextResponse.json({
      channelId,
      videosFound: videoIds.length,
      videosProcessed: savedVideos.length,
      videos: savedVideos.map(video => ({
        id: video.id,
        youtubeVideoId: video.videoId, // YouTube video ID
        title: video.title,
        publishedAt: video.publishedAt,
        viewCount: video.viewCount,
        likeCount: video.likeCount,
        isOfficial: video.isOfficial,
        channelTitle: video.channelTitle,
        description: video.description,
      })),
    });
  } catch (error) {
    console.error('Error processing channel videos:', error);
    return NextResponse.json(
      { error: 'Failed to process videos' },
      { status: 500 }
    );
  }
}
