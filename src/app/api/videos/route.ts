import { NextRequest, NextResponse } from 'next/server';
import { VideoService } from '@/4_entities/video';
import { AuthService } from '@/shared/api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const search = searchParams.get('search');

    let videos;

    if (search) {
      videos = await VideoService.searchVideos(search, limit);
    } else {
      videos = await VideoService.getPublicVideos(limit, offset);
    }

    return NextResponse.json({ videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await AuthService.requireAuth();
    const body = await request.json();

    const video = await VideoService.createVideo({
      ...body,
      userId: user.id,
    });

    return NextResponse.json({ video }, { status: 201 });
  } catch (error) {
    console.error('Error creating video:', error);

    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    );
  }
}
