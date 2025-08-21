import { NextResponse } from 'next/server';
import { getVideoDetails, convertYouTubeDataToVideoInputs, parseYouTubeDuration } from '@/Server/Service/youtubeService/utils';

/**
 * Test API for YouTube video conversion with duration
 * GET /api/debug/test-video-conversion?videoId=HgHP9deY17g
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('videoId') || 'HgHP9deY17g';
    
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        error: 'YouTube API key not configured',
      });
    }

    // Get video details from YouTube API
    const youtubeVideos = await getVideoDetails([videoId], apiKey);
    
    if (youtubeVideos.length === 0) {
      return NextResponse.json({
        error: 'No video found',
      });
    }

    const youtubeVideo = youtubeVideos[0];
    
    // Convert to our format
    const officialChannelIds = [youtubeVideo.snippet.channelId]; // Treat as official for testing
    const convertedVideos = convertYouTubeDataToVideoInputs(
      youtubeVideos, 
      officialChannelIds, 
      'test-conversion'
    );
    
    const convertedVideo = convertedVideos[0];

    // Test duration parsing separately
    const rawDuration = youtubeVideo.contentDetails.duration;
    const parsedDuration = parseYouTubeDuration(rawDuration);

    return NextResponse.json({
      success: true,
      data: {
        rawYouTubeData: {
          id: youtubeVideo.id,
          title: youtubeVideo.snippet.title,
          duration: rawDuration,
          channelTitle: youtubeVideo.snippet.channelTitle,
        },
        parsedDuration,
        convertedVideoDTO: {
          videoId: convertedVideo.videoId,
          title: convertedVideo.title,
          duration: convertedVideo.duration,
          channelTitle: convertedVideo.channelTitle,
          isOfficial: convertedVideo.isOfficial,
        },
        fullConvertedVideo: convertedVideo,
      },
    });

  } catch (error) {
    console.error('Video conversion test error:', error);
    return NextResponse.json({
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}