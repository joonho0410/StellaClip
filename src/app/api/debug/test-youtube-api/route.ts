import { NextRequest, NextResponse } from 'next/server';
import { getVideoDetails } from '@/Server/Service/youtubeService/utils';

/**
 * Test API for YouTube API contentDetails
 * GET /api/debug/test-youtube-api?videoId=HgHP9deY17g
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId') || 'HgHP9deY17g'; // Default to a known video
    
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'YouTube API key not configured' },
        { status: 500 }
      );
    }

    console.log(`Testing YouTube API with video ID: ${videoId}`);
    
    // Call YouTube API directly to see the response
    const videos = await getVideoDetails([videoId], apiKey);
    
    if (videos.length === 0) {
      return NextResponse.json(
        { error: 'No video found with that ID' },
        { status: 404 }
      );
    }

    const video = videos[0];
    
    return NextResponse.json({
      success: true,
      data: {
        videoId: video.id,
        title: video.snippet.title,
        duration: {
          raw: video.contentDetails.duration,
          // Note: Duration parsing disabled for build compatibility
          parsed: undefined,
        },
        contentDetails: video.contentDetails,
        snippet: {
          title: video.snippet.title,
          channelTitle: video.snippet.channelTitle,
          publishedAt: video.snippet.publishedAt,
        },
        statistics: video.statistics,
      },
    });

  } catch (error) {
    console.error('YouTube API test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'YouTube API test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}