import { prisma } from '@/shared/lib/prisma'
import type { Video, Tag } from '@prisma/client'

export interface CreateVideoData {
  title: string
  description?: string
  thumbnail?: string
  videoUrl: string
  duration?: number
  isPublic?: boolean
  youtubeId?: string
  youtubeUrl?: string
  userId: string
  tagIds?: string[]
}

export interface UpdateVideoData {
  title?: string
  description?: string
  thumbnail?: string
  duration?: number
  isPublic?: boolean
  tagIds?: string[]
}

export interface VideoWithDetails extends Video {
  user: {
    id: string
    username: string | null
    fullName: string | null
    avatarUrl: string | null
  }
  tags: Array<{
    tag: Tag
  }>
  _count: {
    comments: number
    likes: number
  }
}

export class VideoService {
  static async createVideo(data: CreateVideoData): Promise<Video> {
    const { tagIds, ...videoData } = data

    return prisma.video.create({
      data: {
        ...videoData,
        tags: tagIds ? {
          create: tagIds.map(tagId => ({ tagId }))
        } : undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
            avatarUrl: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    })
  }

  static async getVideo(id: string): Promise<VideoWithDetails | null> {
    return prisma.video.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
            avatarUrl: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    })
  }

  static async getVideosByUser(userId: string, isPublic?: boolean): Promise<VideoWithDetails[]> {
    return prisma.video.findMany({
      where: {
        userId,
        ...(isPublic !== undefined && { isPublic }),
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
            avatarUrl: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }

  static async getPublicVideos(limit = 20, offset = 0): Promise<VideoWithDetails[]> {
    return prisma.video.findMany({
      where: { isPublic: true },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
            avatarUrl: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    })
  }

  static async updateVideo(id: string, data: UpdateVideoData): Promise<Video> {
    const { tagIds, ...videoData } = data

    return prisma.video.update({
      where: { id },
      data: {
        ...videoData,
        ...(tagIds && {
          tags: {
            deleteMany: {},
            create: tagIds.map(tagId => ({ tagId })),
          },
        }),
      },
    })
  }

  static async deleteVideo(id: string): Promise<void> {
    await prisma.video.delete({
      where: { id },
    })
  }

  static async incrementViews(id: string): Promise<Video> {
    return prisma.video.update({
      where: { id },
      data: {
        views: {
          increment: 1,
        },
      },
    })
  }

  static async searchVideos(query: string, limit = 20): Promise<VideoWithDetails[]> {
    return prisma.video.findMany({
      where: {
        AND: [
          { isPublic: true },
          {
            OR: [
              {
                title: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
              {
                description: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
              {
                tags: {
                  some: {
                    tag: {
                      name: {
                        contains: query,
                        mode: 'insensitive',
                      },
                    },
                  },
                },
              },
            ],
          },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            fullName: true,
            avatarUrl: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      take: limit,
      orderBy: {
        views: 'desc',
      },
    })
  }
}