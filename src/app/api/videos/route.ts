import { NextResponse } from 'next/server';

export async function GET() {
  try {

    // Temporarily disabled - methods not available
    const videos: never[] = [];

    return NextResponse.json({ videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    // Temporarily disabled - authentication and video creation not available
    return NextResponse.json(
      { error: 'Video creation not implemented' },
      { status: 501 }
    );
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    );
  }
}
