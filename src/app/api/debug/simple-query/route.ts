import { NextResponse } from 'next/server';
import { getServiceContainer } from '@/Server/Service/ServiceContainer';

/**
 * Debug API with simple Prisma queries
 * GET /api/debug/simple-query
 */
export async function GET() {
  try {
    const serviceContainer = getServiceContainer();
    const prisma = serviceContainer.getPrismaClient();

    // Find RIN member
    const rinMember = await prisma.member.findUnique({
      where: { name: 'rin' },
    });

    if (!rinMember) {
      return NextResponse.json({
        success: false,
        error: 'RIN member not found',
      });
    }

    // Find video-member relationships for RIN
    const videoMemberRelations = await prisma.videoMember.findMany({
      where: { memberId: rinMember.id },
      include: {
        video: {
          select: {
            id: true,
            title: true,
            isOfficial: true,
            sourceQuery: true,
          },
        },
      },
      take: 10,
    });

    // Try to find videos using the memberAppearances relation
    const videosViaAppearances = await prisma.video.findMany({
      where: {
        memberAppearances: {
          some: {
            memberId: rinMember.id,
          },
        },
        isOfficial: true,
      },
      select: {
        id: true,
        title: true,
        isOfficial: true,
        sourceQuery: true,
      },
      take: 5,
    });

    return NextResponse.json({
      success: true,
      data: {
        rinMember: {
          id: rinMember.id,
          name: rinMember.name,
          displayName: rinMember.displayName,
        },
        videoMemberRelationsCount: videoMemberRelations.length,
        videoMemberRelations: videoMemberRelations.map(rel => ({
          videoId: rel.videoId,
          videoTitle: rel.video.title,
          videoIsOfficial: rel.video.isOfficial,
        })),
        videosViaAppearancesCount: videosViaAppearances.length,
        videosViaAppearances: videosViaAppearances.map(v => ({
          title: v.title,
          isOfficial: v.isOfficial,
          sourceQuery: v.sourceQuery,
        })),
      },
    });

  } catch (error) {
    console.error('Simple query error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Simple query failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}