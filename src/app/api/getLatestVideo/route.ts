import { NextResponse } from 'next/server';
import { latestVideoData } from '../../../../mockData/videoAPI.js';

export async function GET() {
  try {
    return NextResponse.json({
      data: latestVideoData,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch latest videos', success: false },
      { status: 500 }
    );
  }
}