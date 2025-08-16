// 특정 멤버의 동영상 조회 예시들
// 이 파일은 참고용이며, 실제 코드에서 사용할 수 있는 Prisma 쿼리들을 보여줍니다.

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// 1. 멤버 이름으로 해당 멤버의 모든 동영상 조회
async function getVideosByMemberName(memberName) {
  const videos = await prisma.video.findMany({
    where: {
      memberAppearances: {
        some: {
          member: {
            name: memberName, // 예: 'yuni', 'hina'
          },
        },
      },
    },
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
    orderBy: {
      publishedAt: 'desc',
    },
  })

  return videos.map(video => ({
    ...video,
    tags: JSON.parse(video.tags || '[]'),
  }))
}

// 2. 멤버 ID로 해당 멤버의 동영상 조회 (페이지네이션)
async function getVideosByMemberId(memberId, page = 1, limit = 10) {
  const offset = (page - 1) * limit

  const [videos, totalCount] = await Promise.all([
    prisma.video.findMany({
      where: {
        memberAppearances: {
          some: {
            memberId: memberId,
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
      orderBy: {
        publishedAt: 'desc',
      },
      take: limit,
      skip: offset,
    }),
    prisma.video.count({
      where: {
        memberAppearances: {
          some: {
            memberId: memberId,
          },
        },
      },
    }),
  ])

  return {
    videos: videos.map(video => ({
      ...video,
      tags: JSON.parse(video.tags || '[]'),
    })),
    pagination: {
      total: totalCount,
      page,
      limit,
      hasMore: offset + limit < totalCount,
    },
  }
}

// 3. 특정 세대의 모든 멤버들이 출연한 동영상들
async function getVideosByGeneration(generation) {
  const videos = await prisma.video.findMany({
    where: {
      memberAppearances: {
        some: {
          member: {
            generation: generation, // 'MYSTIC', 'UNIVERSE', 'CLICHE'
          },
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
    orderBy: {
      publishedAt: 'desc',
    },
  })

  return videos.map(video => ({
    ...video,
    tags: JSON.parse(video.tags || '[]'),
    members: video.memberAppearances.map(appearance => ({
      ...appearance.member,
      hashtags: JSON.parse(appearance.member.hashtags || '[]'),
    })),
  }))
}

// 4. 특정 멤버의 클립만 조회
async function getMemberClips(memberName) {
  return await prisma.video.findMany({
    where: {
      AND: [
        {
          memberAppearances: {
            some: {
              member: {
                name: memberName,
              },
            },
          },
        },
        {
          category: 'CLIP',
        },
      ],
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
}

// 5. 특정 멤버의 공식 채널 영상만 조회
async function getMemberOfficialVideos(memberName) {
  return await prisma.video.findMany({
    where: {
      AND: [
        {
          memberAppearances: {
            some: {
              member: {
                name: memberName,
              },
            },
          },
        },
        {
          isOfficial: true,
        },
      ],
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
}

// 6. 멤버와 함께 해당 멤버의 비디오 통계 조회
async function getMemberWithVideoStats(memberName) {
  const member = await prisma.member.findUnique({
    where: { name: memberName },
    include: {
      videoAppearances: {
        include: {
          video: true,
        },
      },
    },
  })

  if (!member) return null

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
      .sort((a, b) => b.video.publishedAt - a.video.publishedAt)[0]?.video,
  }

  return {
    member: {
      ...member,
      hashtags: JSON.parse(member.hashtags || '[]'),
    },
    stats,
  }
}

// 7. 여러 멤버가 함께 출연한 동영상 찾기
async function getVideosWithMultipleMembers(memberNames) {
  return await prisma.video.findMany({
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
}

module.exports = {
  getVideosByMemberName,
  getVideosByMemberId,
  getVideosByGeneration,
  getMemberClips,
  getMemberOfficialVideos,
  getMemberWithVideoStats,
  getVideosWithMultipleMembers,
}

// 사용 예시:
// const videos = await getVideosByMemberName('yuni')
// const { videos, pagination } = await getVideosByMemberId('member-id', 1, 5)
// const clips = await getMemberClips('hina')
// const stats = await getMemberWithVideoStats('tabi')