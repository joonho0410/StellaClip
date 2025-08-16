import { prisma } from '@/5_shared/lib/prisma'
import type { Video, Member, VideoMember } from '@prisma/client'
import { VideoCreateInput } from './types'

export interface CreateVideoData {
  videoId: string
  title: string
  description?: string
  publishedAt: Date
  thumbnailDefault?: string
  thumbnailMedium?: string
  thumbnailHigh?: string
  channelId: string
  channelTitle: string
  isOfficial?: boolean
  duration?: string
  viewCount?: number
  likeCount?: number
  category?: 'CLIP' | 'SHORTS'
  tags: string
  sourceQuery?: string
}

export interface UpdateVideoData {
  title?: string
  description?: string
  thumbnailDefault?: string
  thumbnailMedium?: string
  thumbnailHigh?: string
  channelId?: string
  channelTitle?: string
  isOfficial?: boolean
  duration?: string
  viewCount?: number
  likeCount?: number
  category?: 'CLIP' | 'SHORTS'
  tags?: string
  sourceQuery?: string
}

export interface VideoWithDetails extends Video {
  memberAppearances: Array<VideoMember & {
    member: Member
  }>
}

export class VideoService {
  static async createVideo(data: CreateVideoData): Promise<Video> {
    return prisma.video.create({
      data: {
        videoId: data.videoId,
        title: data.title,
        description: data.description,
        publishedAt: data.publishedAt,
        thumbnailDefault: data.thumbnailDefault,
        thumbnailMedium: data.thumbnailMedium,
        thumbnailHigh: data.thumbnailHigh,
        channelId: data.channelId,
        channelTitle: data.channelTitle,
        isOfficial: data.isOfficial ?? false,
        duration: data.duration,
        viewCount: data.viewCount,
        likeCount: data.likeCount,
        category: data.category,
        tags: data.tags,
        sourceQuery: data.sourceQuery,
      },
    })
  }

  static async getVideo(id: string): Promise<VideoWithDetails | null> {
    return prisma.video.findUnique({
      where: { id },
      include: {
        memberAppearances: {
          include: {
            member: true,
          },
        },
      },
    })
  }

  static async getVideosByChannel(channelId: string, isOfficial?: boolean): Promise<VideoWithDetails[]> {
    return prisma.video.findMany({
      where: {
        channelId,
        ...(isOfficial !== undefined && { isOfficial }),
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

  static async getOfficialVideos(limit = 20, offset = 0): Promise<VideoWithDetails[]> {
    return prisma.video.findMany({
      where: { isOfficial: true },
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
    })
  }

  static async updateVideo(id: string, data: UpdateVideoData): Promise<Video> {
    return prisma.video.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        thumbnailDefault: data.thumbnailDefault,
        thumbnailMedium: data.thumbnailMedium,
        thumbnailHigh: data.thumbnailHigh,
        channelId: data.channelId,
        channelTitle: data.channelTitle,
        isOfficial: data.isOfficial,
        duration: data.duration,
        viewCount: data.viewCount,
        likeCount: data.likeCount,
        category: data.category,
        tags: data.tags,
        sourceQuery: data.sourceQuery,
        updatedAt: new Date(),
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
        viewCount: {
          increment: 1,
        },
      },
    })
  }

  static async searchVideos(query: string, limit = 20): Promise<VideoWithDetails[]> {
    return prisma.video.findMany({
      where: {
        OR: [
          {
            title: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
          {
            tags: {
              contains: query,
            },
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
      take: limit,
      orderBy: {
        viewCount: 'desc',
      },
    })
  }

  // Add method to get all videos
  static async getAllVideos(limit = 20, offset = 0): Promise<VideoWithDetails[]> {
    return prisma.video.findMany({
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
    })
  }

  // YouTube API 데이터를 기반으로 비디오를 upsert하는 함수
  static async upsertVideoFromYouTube(videoData: VideoCreateInput): Promise<Video> {
    return prisma.video.upsert({
      where: { 
        videoId: videoData.videoId 
      },
      update: {
        title: videoData.title,
        description: videoData.description,
        thumbnailDefault: videoData.thumbnailDefault,
        thumbnailMedium: videoData.thumbnailMedium,
        thumbnailHigh: videoData.thumbnailHigh,
        channelId: videoData.channelId,
        channelTitle: videoData.channelTitle,
        isOfficial: videoData.isOfficial,
        viewCount: videoData.viewCount,
        likeCount: videoData.likeCount,
        tags: videoData.tags,
        sourceQuery: videoData.sourceQuery,
        updatedAt: new Date(),
      },
      create: {
        videoId: videoData.videoId,
        title: videoData.title,
        description: videoData.description,
        publishedAt: videoData.publishedAt,
        thumbnailDefault: videoData.thumbnailDefault,
        thumbnailMedium: videoData.thumbnailMedium,
        thumbnailHigh: videoData.thumbnailHigh,
        channelId: videoData.channelId,
        channelTitle: videoData.channelTitle,
        isOfficial: videoData.isOfficial ?? false,
        viewCount: videoData.viewCount,
        likeCount: videoData.likeCount,
        tags: videoData.tags,
        sourceQuery: videoData.sourceQuery,
      },
    });
  }

  // 여러 YouTube 비디오를 한번에 upsert하는 함수
  static async upsertVideosFromYouTube(videosData: VideoCreateInput[]): Promise<Video[]> {
    const results = await Promise.allSettled(
      videosData.map(videoData => this.upsertVideoFromYouTube(videoData))
    );

    const videos: Video[] = [];
    const errors: Error[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        videos.push(result.value);
      } else {
        console.error(`Failed to upsert video ${videosData[index].videoId}:`, result.reason);
        errors.push(result.reason);
      }
    });

    if (errors.length > 0) {
      console.warn(`${errors.length}/${videosData.length} videos failed to upsert`);
    }

    return videos;
  }
}