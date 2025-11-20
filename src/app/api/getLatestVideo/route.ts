import { NextResponse } from 'next/server';
import { latestVideoData } from '../../../../mockData/videoAPI.js';

export async function GET() {
  try {
    // 2초 딜레이 추가 (스켈레톤 UI 확인용)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
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