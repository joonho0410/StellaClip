import { NextRequest, NextResponse } from 'next/server';
import { getServiceContainer } from '@/Server/ServiceContainer';
import type { CreateVideoDTO } from '@/Server/types/dto/VideoDTO';

/**
 * Example API Route using new Spring Boot MVC architecture
 * Controller Layer - handles HTTP requests and delegates to Service layer
 */

/**
 * GET /api/videos/example-new-architecture
 * Get all videos with pagination
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Input validation
    if (limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: 'Limit must be between 1 and 100' },
        { status: 400 }
      );
    }

    if (offset < 0) {
      return NextResponse.json(
        { error: 'Offset must be non-negative' },
        { status: 400 }
      );
    }

    // Get service instance from container
    const serviceContainer = getServiceContainer();
    const videoService = serviceContainer.getVideoService();

    // Delegate business logic to service layer
    const videos = await videoService.getAllVideos({ limit, offset });

    return NextResponse.json({
      videos,
      pagination: {
        limit,
        offset,
        count: videos.length,
      },
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/videos/example-new-architecture
 * Create a new video
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Input validation
    const createVideoData: CreateVideoDTO = {
      videoId: body.videoId,
      title: body.title,
      description: body.description,
      publishedAt: body.publishedAt,
      thumbnailDefault: body.thumbnailDefault,
      thumbnailMedium: body.thumbnailMedium,
      thumbnailHigh: body.thumbnailHigh,
      channelId: body.channelId,
      channelTitle: body.channelTitle,
      isOfficial: body.isOfficial,
      duration: body.duration,
      viewCount: body.viewCount,
      likeCount: body.likeCount,
      category: body.category,
      tags: body.tags || '[]',
      sourceQuery: body.sourceQuery,
    };

    // Basic validation
    if (!createVideoData.videoId || !createVideoData.title || !createVideoData.channelId) {
      return NextResponse.json(
        { error: 'videoId, title, and channelId are required' },
        { status: 400 }
      );
    }

    // Get service instance from container
    const serviceContainer = getServiceContainer();
    const videoService = serviceContainer.getVideoService();

    // Delegate business logic to service layer
    const video = await videoService.createVideo(createVideoData);

    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('Error creating video:', error);
    
    if (error instanceof Error && error.message.includes('already exists')) {
      return NextResponse.json(
        { error: error.message },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Health check endpoint
 */
export async function HEAD() {
  try {
    const serviceContainer = getServiceContainer();
    const health = await serviceContainer.healthCheck();

    if (health.database && health.services) {
      return new NextResponse(null, { status: 200 });
    } else {
      return new NextResponse(null, { status: 503 });
    }
  } catch (error) {
    return new NextResponse(null, { status: 503 });
  }
}