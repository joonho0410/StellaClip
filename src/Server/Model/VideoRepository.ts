import { PrismaClient, Video, VideoCategory } from '@prisma/client';
import type { CreateVideoDTO, UpdateVideoDTO } from '../Service/VideoService/types';
import type { PaginationParams } from '../types/interfaces/ServiceInterfaces';

/**
 * Video Repository Layer
 * Handles all database operations for videos
 */
export class VideoRepository {
  constructor(private prisma: PrismaClient) {}

  /**
   * Find video by ID with member appearances
   */
  async findById(id: string): Promise<Video | null> {
    return this.prisma.video.findUnique({
      where: { id },
      include: {
        memberAppearances: {
          include: {
            member: true,
          },
        },
      },
    });
  }

  /**
   * Find video by YouTube video ID
   */
  async findByVideoId(videoId: string): Promise<Video | null> {
    return this.prisma.video.findUnique({
      where: { videoId },
      include: {
        memberAppearances: {
          include: {
            member: true,
          },
        },
      },
    });
  }

  /**
   * Find all videos with pagination
   */
  async findMany(params: PaginationParams): Promise<Video[]> {
    return this.prisma.video.findMany({
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
      take: params.limit,
      skip: params.offset,
    });
  }

  /**
   * Find videos by channel ID
   */
  async findByChannelId(
    channelId: string,
    params: PaginationParams
  ): Promise<Video[]> {
    return this.prisma.video.findMany({
      where: { channelId },
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
      take: params.limit,
      skip: params.offset,
    });
  }

  /**
   * Find official videos only
   */
  async findOfficialVideos(params: PaginationParams): Promise<Video[]> {
    return this.prisma.video.findMany({
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
      take: params.limit,
      skip: params.offset,
    });
  }

  /**
   * Search videos by text in title, description, or tags
   */
  async searchByText(query: string, params: PaginationParams): Promise<Video[]> {
    return this.prisma.video.findMany({
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
      orderBy: {
        viewCount: 'desc',
      },
      take: params.limit,
      skip: params.offset,
    });
  }

  /**
   * Find videos by Stella member name with pagination and filtering
   */
  async findByStellaMember(
    stellaName: string,
    params: PaginationParams & { isOfficial?: boolean }
  ): Promise<{ videos: Video[]; total: number }> {
    // Handle 'ALL' case to get all videos
    const whereCondition: any = {};

    if (stellaName.toUpperCase() !== 'ALL') {
      whereCondition.memberAppearances = {
        some: {
          member: {
            name: stellaName.toUpperCase(), // Use uppercase to match database
          },
        },
      };
    }

    // Add official filter if specified
    if (params.isOfficial !== undefined) {
      whereCondition.isOfficial = params.isOfficial;
    }

    // Get total count for pagination
    const total = await this.prisma.video.count({
      where: whereCondition,
    });

    // Get videos with pagination
    const videos = await this.prisma.video.findMany({
      where: whereCondition,
      include: {
        memberAppearances: {
          include: {
            member: true,
          },
        },
      },
      orderBy: [
        {
          publishedAt: 'desc',
        },
        {
          viewCount: 'desc',
        },
      ],
      take: params.limit,
      skip: params.offset,
    });

    return { videos, total };
  }

  /**
   * Find videos by Generation with pagination and filtering
   */
  async findByGeneration(
    genName: string,
    params: PaginationParams & { isOfficial?: boolean }
  ): Promise<{ videos: Video[]; total: number }> {
    // Handle 'ALL' case to get all videos
    const whereCondition: any = {};

    if (genName.toUpperCase() !== 'ALL') {
      // Convert genName to uppercase to match database enum
      const normalizedGen = genName.toUpperCase();
      whereCondition.memberAppearances = {
        some: {
          member: {
            generation: normalizedGen,
          },
        },
      };
    }

    // Add official filter if specified
    if (params.isOfficial !== undefined) {
      whereCondition.isOfficial = params.isOfficial;
    }

    // Get total count for pagination
    const total = await this.prisma.video.count({
      where: whereCondition,
    });

    // Get videos with pagination
    const videos = await this.prisma.video.findMany({
      where: whereCondition,
      include: {
        memberAppearances: {
          include: {
            member: true,
          },
        },
      },
      orderBy: [
        {
          publishedAt: 'desc',
        },
        {
          viewCount: 'desc',
        },
      ],
      take: params.limit,
      skip: params.offset,
    });

    return { videos, total };
  }

  /**
   * Create new video
   */
  async create(data: CreateVideoDTO): Promise<Video> {
    return this.prisma.video.create({
      data: {
        videoId: data.videoId,
        title: data.title,
        description: data.description,
        publishedAt: new Date(data.publishedAt),
        thumbnailDefault: data.thumbnailDefault,
        thumbnailMedium: data.thumbnailMedium,
        thumbnailHigh: data.thumbnailHigh,
        channelId: data.channelId,
        channelTitle: data.channelTitle,
        isOfficial: data.isOfficial ?? false,
        duration: data.duration,
        viewCount: data.viewCount,
        likeCount: data.likeCount,
        category: data.category as VideoCategory,
        tags: data.tags,
        sourceQuery: data.sourceQuery,
      },
      include: {
        memberAppearances: {
          include: {
            member: true,
          },
        },
      },
    });
  }

  /**
   * Update existing video
   */
  async update(id: string, data: UpdateVideoDTO): Promise<Video> {
    return this.prisma.video.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.thumbnailDefault && { thumbnailDefault: data.thumbnailDefault }),
        ...(data.thumbnailMedium && { thumbnailMedium: data.thumbnailMedium }),
        ...(data.thumbnailHigh && { thumbnailHigh: data.thumbnailHigh }),
        ...(data.channelTitle && { channelTitle: data.channelTitle }),
        ...(data.isOfficial !== undefined && { isOfficial: data.isOfficial }),
        ...(data.duration && { duration: data.duration }),
        ...(data.viewCount !== undefined && { viewCount: data.viewCount }),
        ...(data.likeCount !== undefined && { likeCount: data.likeCount }),
        ...(data.category && { category: data.category as VideoCategory }),
        ...(data.tags && { tags: data.tags }),
        ...(data.sourceQuery && { sourceQuery: data.sourceQuery }),
        updatedAt: new Date(),
      },
      include: {
        memberAppearances: {
          include: {
            member: true,
          },
        },
      },
    });
  }

  /**
   * Delete video
   */
  async delete(id: string): Promise<void> {
    await this.prisma.video.delete({
      where: { id },
    });
  }

  /**
   * Increment view count
   */
  async incrementViews(id: string): Promise<Video> {
    return this.prisma.video.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
      include: {
        memberAppearances: {
          include: {
            member: true,
          },
        },
      },
    });
  }

  /**
   * Upsert video (create if not exists, update if exists)
   */
  async upsert(data: CreateVideoDTO): Promise<Video> {
    return this.prisma.video.upsert({
      where: { videoId: data.videoId },
      update: {
        title: data.title,
        description: data.description,
        thumbnailDefault: data.thumbnailDefault,
        thumbnailMedium: data.thumbnailMedium,
        thumbnailHigh: data.thumbnailHigh,
        channelTitle: data.channelTitle,
        isOfficial: data.isOfficial ?? false,
        duration: data.duration,
        viewCount: data.viewCount,
        likeCount: data.likeCount,
        tags: data.tags,
        sourceQuery: data.sourceQuery,
        updatedAt: new Date(),
      },
      create: {
        videoId: data.videoId,
        title: data.title,
        description: data.description,
        publishedAt: new Date(data.publishedAt),
        thumbnailDefault: data.thumbnailDefault,
        thumbnailMedium: data.thumbnailMedium,
        thumbnailHigh: data.thumbnailHigh,
        channelId: data.channelId,
        channelTitle: data.channelTitle,
        isOfficial: data.isOfficial ?? false,
        duration: data.duration,
        viewCount: data.viewCount,
        likeCount: data.likeCount,
        category: data.category as VideoCategory,
        tags: data.tags,
        sourceQuery: data.sourceQuery,
      },
      include: {
        memberAppearances: {
          include: {
            member: true,
          },
        },
      },
    });
  }

  /**
   * Batch upsert multiple videos
   */
  async batchUpsert(videosData: CreateVideoDTO[]): Promise<Video[]> {
    const results = await Promise.allSettled(
      videosData.map(videoData => this.upsert(videoData))
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

  /**
   * Count total videos
   */
  async count(): Promise<number> {
    return this.prisma.video.count();
  }

  /**
   * Count videos by channel
   */
  async countByChannel(channelId: string): Promise<number> {
    return this.prisma.video.count({
      where: { channelId },
    });
  }

  /**
   * Count official videos
   */
  async countOfficial(): Promise<number> {
    return this.prisma.video.count({
      where: { isOfficial: true },
    });
  }
}