import { NextRequest, NextResponse } from 'next/server';
import { getServiceContainer } from '@/Server/Service/ServiceContainer';

/**
 * Debug API to test video search directly
 * GET /api/debug/test-search?stella=rin
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const stella = searchParams.get('stella') || 'rin';
    
    const serviceContainer = getServiceContainer();
    const videoRepository = serviceContainer.getVideoRepository();

    // Test different variations of the name
    const variations = [stella, stella.toLowerCase(), stella.toUpperCase()];
    
    const results = [];
    
    for (const variation of variations) {
      console.log(`Testing search with: "${variation}"`);
      
      const result = await videoRepository.findByStellaMember(variation, {
        limit: 5,
        offset: 0,
        isOfficial: true,
      });
      
      results.push({
        searchTerm: variation,
        total: result.total,
        videosCount: result.videos.length,
        videoTitles: result.videos.map(v => v.title),
      });
    }

    return NextResponse.json({
      success: true,
      data: results,
    });

  } catch (error) {
    console.error('Test search error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Test search failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}