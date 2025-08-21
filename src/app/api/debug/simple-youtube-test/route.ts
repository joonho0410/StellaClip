import { NextResponse } from 'next/server';

/**
 * Simple YouTube API test
 * GET /api/debug/simple-youtube-test
 */
export async function GET() {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        error: 'YouTube API key not configured',
        envCheck: Object.keys(process.env).filter(key => key.includes('YOUTUBE')),
      });
    }

    // Test with a known video ID
    const videoId = 'HgHP9deY17g';
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${apiKey}`;
    
    console.log('Making request to:', url);
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json({
        error: 'YouTube API failed',
        status: response.status,
        data,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        itemCount: data.items?.length || 0,
        firstItem: data.items?.[0] ? {
          id: data.items[0].id,
          title: data.items[0].snippet?.title,
          duration: data.items[0].contentDetails?.duration,
          channelTitle: data.items[0].snippet?.channelTitle,
        } : null,
        rawResponse: data,
      },
    });

  } catch (error) {
    console.error('YouTube API test error:', error);
    return NextResponse.json({
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}