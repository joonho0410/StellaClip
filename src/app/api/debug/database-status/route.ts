import { NextResponse } from 'next/server';
import { getServiceContainer } from '@/Server/Service/ServiceContainer';

/**
 * Debug API to check current database status
 * GET /api/debug/database-status
 */
export async function GET() {
  try {
    const serviceContainer = getServiceContainer();
    const videoRepository = serviceContainer.getVideoRepository();
    const memberRepository = serviceContainer.getMemberRepository();
    const videoMemberRepository = serviceContainer.getVideoMemberRepository();

    // Count total videos
    const totalVideos = await videoRepository.count();
    
    // Count official videos
    const officialVideos = await videoRepository.countOfficial();
    
    // Get all members
    const members = await memberRepository.findAll();
    
    // Get sample videos to see their structure (with member appearances included)
    const sampleVideos = await videoRepository.findMany({ limit: 5, offset: 0 });
    
    // Check if any videoMember relationships exist
    const sampleVideoMemberRelations = await Promise.all(
      sampleVideos.map(async (video) => {
        const relations = await videoMemberRepository.findByVideoId(video.id);
        return {
          videoId: video.id,
          title: video.title,
          relationCount: relations.length,
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: {
        counts: {
          totalVideos,
          officialVideos,
          totalMembers: members.length,
        },
        members: members.map(member => ({
          id: member.id,
          name: member.name,
          displayName: member.displayName,
          generation: member.generation,
        })),
        sampleVideos: sampleVideos.map(video => ({
          id: video.id,
          videoId: video.videoId,
          title: video.title,
          isOfficial: video.isOfficial,
          sourceQuery: video.sourceQuery,
          // Note: memberAppearances is populated by the repository's include clause
          memberAppearancesCount: (video as any).memberAppearances?.length || 0,
        })),
        sampleVideoMemberRelations,
      },
    });
  } catch (error) {
    console.error('Error checking database status:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to check database status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}