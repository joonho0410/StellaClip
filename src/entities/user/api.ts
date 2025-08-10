import { prisma } from '@/shared/lib/prisma'
import type { User } from '@prisma/client'

export interface CreateUserData {
  authId: string
  email: string
  username?: string
  fullName?: string
  avatarUrl?: string
}

export interface UpdateUserData {
  username?: string
  fullName?: string
  avatarUrl?: string
}

export class UserService {
  static async createUser(data: CreateUserData): Promise<User> {
    return prisma.user.create({
      data,
    })
  }

  static async getUserByAuthId(authId: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { authId },
      include: {
        _count: {
          select: {
            videos: true,
            playlists: true,
            subscribers: true,
            subscriptions: true,
          },
        },
      },
    })
  }

  static async getUserByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { username },
      include: {
        _count: {
          select: {
            videos: true,
            playlists: true,
            subscribers: true,
            subscriptions: true,
          },
        },
      },
    })
  }

  static async updateUser(authId: string, data: UpdateUserData): Promise<User> {
    return prisma.user.update({
      where: { authId },
      data,
    })
  }

  static async deleteUser(authId: string): Promise<void> {
    await prisma.user.delete({
      where: { authId },
    })
  }

  static async getUserStats(authId: string) {
    const user = await prisma.user.findUnique({
      where: { authId },
      include: {
        _count: {
          select: {
            videos: true,
            playlists: true,
            subscribers: true,
            subscriptions: true,
          },
        },
        videos: {
          select: {
            views: true,
          },
        },
      },
    })

    if (!user) return null

    const totalViews = user.videos.reduce((sum, video) => sum + video.views, 0)

    return {
      ...user._count,
      totalViews,
    }
  }
}