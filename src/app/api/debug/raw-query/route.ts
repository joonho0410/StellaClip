import { NextResponse } from 'next/server';
import { getServiceContainer } from '@/Server/Service/ServiceContainer';

/**
 * Debug API to run raw queries and check database state
 * GET /api/debug/raw-query
 */
export async function GET() {
  try {
    const serviceContainer = getServiceContainer();
    const prisma = serviceContainer.getPrismaClient();

    // Direct raw queries to understand the data structure
    const memberData = await prisma.$queryRaw`
      SELECT * FROM members WHERE name LIKE 'rin' COLLATE NOCASE LIMIT 5
    `;

    const videoMemberData = await prisma.$queryRaw`
      SELECT 
        vm.*,
        v.title as video_title,
        v.isOfficial as video_isOfficial,
        m.name as member_name,
        m.displayName as member_displayName
      FROM video_members vm
      JOIN videos v ON vm.videoId = v.id
      JOIN members m ON vm.memberId = m.id
      WHERE m.name LIKE 'rin' COLLATE NOCASE
      LIMIT 10
    `;

    const videosWithRin = await prisma.$queryRaw`
      SELECT 
        v.id,
        v.title,
        v.isOfficial,
        v.sourceQuery,
        COUNT(vm.id) as member_count
      FROM videos v
      LEFT JOIN video_members vm ON v.id = vm.videoId
      LEFT JOIN members m ON vm.memberId = m.id
      WHERE m.name LIKE 'rin' COLLATE NOCASE
      GROUP BY v.id, v.title, v.isOfficial, v.sourceQuery
      LIMIT 10
    `;

    // Test Prisma ORM queries
    const rinMember = await prisma.member.findUnique({
      where: { name: 'rin' },
    });

    let prismaPrismaQuery = null;
    if (rinMember) {
      prismaPrismaQuery = await prisma.video.findMany({
        where: {
          memberAppearances: {
            some: {
              memberId: rinMember.id,
            },
          },
          isOfficial: true,
        },
        include: {
          memberAppearances: {
            include: {
              member: true,
            },
          },
        },
        take: 5,
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        memberData,
        videoMemberData,
        videosWithRin,
        rinMember,
        prismaQueryResults: {
          count: prismaPrismaQuery?.length || 0,
          videos: prismaPrismaQuery?.map(v => ({
            title: v.title,
            isOfficial: v.isOfficial,
            memberCount: v.memberAppearances.length,
          })) || [],
        },
      },
    });

  } catch (error) {
    console.error('Raw query error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Raw query failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}