// 비디오 쿼리를 위한 헬퍼 함수들
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// JSON 파싱 헬퍼
const parseVideoData = (video: any) => ({
  ...video,
  tags: JSON.parse(video.tags || '[]'),
})

const parseMemberData = (member: any) => ({
  ...member,
  hashtags: JSON.parse(member.hashtags || '[]'),
})

// 1. 특정 멤버의 동영상들 조회
export async function getMemberVideos(
  memberIdentifier: string, // name 또는 id
  options: {
    category?: 'CLIP' | 'SHORTS'
    isOfficial?: boolean
    limit?: number
    offset?: number
    sortBy?: 'publishedAt' | 'title'
    sortOrder?: 'asc' | 'desc'
  } = {}
) {
  const {
    category,
    isOfficial,
    limit = 10,
    offset = 0,
    sortBy = 'publishedAt',
    sortOrder = 'desc',
  } = options

  // 멤버 찾기
  const member = await prisma.member.findFirst({
    where: {
      OR: [{ id: memberIdentifier }, { name: memberIdentifier }],
    },
  })

  if (!member) {
    throw new Error('Member not found')
  }

  // where 조건 구성
  const whereConditions: any = {
    memberAppearances: {
      some: {
        memberId: member.id,
      },
    },
  }

  if (category) whereConditions.category = category
  if (isOfficial !== undefined) whereConditions.isOfficial = isOfficial

  // 정렬 조건
  const orderBy: any = {}
  orderBy[sortBy] = sortOrder

  // 비디오 조회
  const [videos, totalCount] = await Promise.all([
    prisma.video.findMany({
      where: whereConditions,
      include: {
        memberAppearances: {
          include: {
            member: {
              select: {
                id: true,
                name: true,
                displayName: true,
                generation: true,
              },
            },
          },
        },
      },
      orderBy,
      take: limit,
      skip: offset,
    }),
    prisma.video.count({ where: whereConditions }),
  ])

  // 통계 조회
  const stats = {
    totalVideos: totalCount,
    clipCount: await prisma.video.count({
      where: { ...whereConditions, category: 'CLIP' },
    }),
    shortsCount: await prisma.video.count({
      where: { ...whereConditions, category: 'SHORTS' },
    }),
    officialCount: await prisma.video.count({
      where: { ...whereConditions, isOfficial: true },
    }),
  }

  return {
    member: parseMemberData(member),
    videos: videos.map(parseVideoData),
    stats,
    pagination: {
      total: totalCount,
      limit,
      offset,
      hasMore: offset + limit < totalCount,
      currentPage: Math.floor(offset / limit) + 1,
      totalPages: Math.ceil(totalCount / limit),
    },
  }
}

// 2. 세대별 동영상들 조회
export async function getGenerationVideos(
  generation: 'MYSTIC' | 'UNIVERSE' | 'CLICHE',
  options: {
    category?: 'CLIP' | 'SHORTS'
    isOfficial?: boolean
    limit?: number
    offset?: number
  } = {}
) {
  const { category, isOfficial, limit = 10, offset = 0 } = options

  const whereConditions: any = {
    memberAppearances: {
      some: {
        member: {
          generation,
        },
      },
    },
  }

  if (category) whereConditions.category = category
  if (isOfficial !== undefined) whereConditions.isOfficial = isOfficial

  const [videos, totalCount] = await Promise.all([
    prisma.video.findMany({
      where: whereConditions,
      include: {
        memberAppearances: {
          include: {
            member: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      take: limit,
      skip: offset,
    }),
    prisma.video.count({ where: whereConditions }),
  ])

  return {
    generation,
    videos: videos.map(video => ({
      ...parseVideoData(video),
      members: video.memberAppearances.map(app => parseMemberData(app.member)),
    })),
    pagination: {
      total: totalCount,
      limit,
      offset,
      hasMore: offset + limit < totalCount,
    },
  }
}

// 3. 여러 멤버가 함께 출연한 동영상들 찾기
export async function getCollaborationVideos(memberNames: string[]) {
  const videos = await prisma.video.findMany({
    where: {
      AND: memberNames.map(memberName => ({
        memberAppearances: {
          some: {
            member: {
              name: memberName,
            },
          },
        },
      })),
    },
    include: {
      memberAppearances: {
        include: {
          member: true,
        },
      },
    },
    orderBy: {
      publishedAt: 'desc',
    },
  })

  return videos.map(video => ({
    ...parseVideoData(video),
    members: video.memberAppearances.map(app => parseMemberData(app.member)),
  }))
}

// 4. 멤버 통계 조회
export async function getMemberStats(memberIdentifier: string) {
  const member = await prisma.member.findFirst({
    where: {
      OR: [{ id: memberIdentifier }, { name: memberIdentifier }],
    },
    include: {
      videoAppearances: {
        include: {
          video: true,
        },
      },
    },
  })

  if (!member) {
    throw new Error('Member not found')
  }

  const stats = {
    totalVideos: member.videoAppearances.length,
    clipCount: member.videoAppearances.filter(
      app => app.video.category === 'CLIP'
    ).length,
    shortsCount: member.videoAppearances.filter(
      app => app.video.category === 'SHORTS'
    ).length,
    officialCount: member.videoAppearances.filter(
      app => app.video.isOfficial
    ).length,
    latestVideo: member.videoAppearances
      .sort((a, b) => 
        new Date(b.video.publishedAt).getTime() - new Date(a.video.publishedAt).getTime()
      )[0]?.video,
  }

  return {
    member: parseMemberData(member),
    stats: {
      ...stats,
      latestVideo: stats.latestVideo ? parseVideoData(stats.latestVideo) : null,
    },
  }
}

// 5. 인기 동영상 조회 (특정 멤버)
export async function getMemberPopularVideos(
  memberIdentifier: string,
  limit = 5
) {
  const member = await prisma.member.findFirst({
    where: {
      OR: [{ id: memberIdentifier }, { name: memberIdentifier }],
    },
  })

  if (!member) {
    throw new Error('Member not found')
  }

  // viewCount 기준으로 정렬 (없으면 최신순)
  const videos = await prisma.video.findMany({
    where: {
      memberAppearances: {
        some: {
          memberId: member.id,
        },
      },
    },
    include: {
      memberAppearances: {
        include: {
          member: true,
        },
      },
    },
    orderBy: [
      { viewCount: 'desc' },
      { publishedAt: 'desc' },
    ],
    take: limit,
  })

  return videos.map(parseVideoData)
}

// 6. 최근 동영상 조회 (전체 또는 특정 멤버)
export async function getRecentVideos(
  options: {
    memberName?: string
    generation?: 'MYSTIC' | 'UNIVERSE' | 'CLICHE'
    category?: 'CLIP' | 'SHORTS'
    isOfficial?: boolean
    limit?: number
  } = {}
) {
  const { memberName, generation, category, isOfficial, limit = 10 } = options

  const whereConditions: any = {}

  if (memberName || generation) {
    whereConditions.memberAppearances = {
      some: {
        member: {
          ...(memberName && { name: memberName }),
          ...(generation && { generation }),
        },
      },
    }
  }

  if (category) whereConditions.category = category
  if (isOfficial !== undefined) whereConditions.isOfficial = isOfficial

  const videos = await prisma.video.findMany({
    where: whereConditions,
    include: {
      memberAppearances: {
        include: {
          member: true,
        },
      },
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: limit,
  })

  return videos.map(video => ({
    ...parseVideoData(video),
    members: video.memberAppearances.map(app => parseMemberData(app.member)),
  }))
}

export {
  parseVideoData,
  parseMemberData,
}