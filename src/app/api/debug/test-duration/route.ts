import { NextResponse } from 'next/server';
import { parseYouTubeDuration } from '@/Server/Service/youtubeService/utils';

/**
 * Test API for YouTube duration parsing
 * GET /api/debug/test-duration
 */
export async function GET() {
  try {
    // Test various ISO 8601 duration formats
    const testDurations = [
      'PT4M13S',    // 4 minutes 13 seconds
      'PT1H30M45S', // 1 hour 30 minutes 45 seconds
      'PT45S',      // 45 seconds
      'PT10M',      // 10 minutes
      'PT2H',       // 2 hours
      'PT0S',       // 0 seconds (should return undefined)
      '',           // empty string (should return undefined)
    ];

    const results = testDurations.map(duration => ({
      input: duration,
      output: parseYouTubeDuration(duration),
    }));

    return NextResponse.json({
      success: true,
      data: {
        message: 'Duration parsing test results',
        results,
      },
    });

  } catch (error) {
    console.error('Duration parsing test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Duration parsing test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}