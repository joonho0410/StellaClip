import { PrismaClient, VideoMember } from '@prisma/client';

/**
 * VideoMember Repository Layer
 * Handles all database operations for video-member relationships
 */
export class VideoMemberRepository {
  constructor(private prisma: PrismaClient) {}

  /**
   * Create video-member relationship
   */
  async create(data: {
    videoId: string;
    memberId: string;
  }): Promise<VideoMember> {
    return this.prisma.videoMember.create({
      data,
      include: {
        member: true,
        video: true,
      },
    });
  }

  /**
   * Create multiple video-member relationships
   */
  async createMany(data: Array<{
    videoId: string;
    memberId: string;
  }>): Promise<void> {
    // Check for existing relationships and filter them out
    const existingChecks = await Promise.all(
      data.map(async ({ videoId, memberId }) => ({
        videoId,
        memberId,
        exists: await this.exists(videoId, memberId)
      }))
    );
    
    // Filter out existing relationships
    const newRelationships = existingChecks
      .filter(check => !check.exists)
      .map(({ videoId, memberId }) => ({ videoId, memberId }));
    
    if (newRelationships.length === 0) {
      console.log('All relationships already exist');
      return;
    }
    
    // Create new relationships
    await Promise.all(
      newRelationships.map(relationship => this.create(relationship))
    );
    
    console.log(`Created ${newRelationships.length} new video-member relationships`);
  }

  /**
   * Find all relationships for a video
   */
  async findByVideoId(videoId: string): Promise<VideoMember[]> {
    return this.prisma.videoMember.findMany({
      where: { videoId },
      include: {
        member: true,
      },
    });
  }

  /**
   * Find all relationships for a member
   */
  async findByMemberId(memberId: string): Promise<VideoMember[]> {
    return this.prisma.videoMember.findMany({
      where: { memberId },
      include: {
        video: true,
      },
    });
  }

  /**
   * Delete relationship
   */
  async delete(videoId: string, memberId: string): Promise<void> {
    await this.prisma.videoMember.delete({
      where: {
        videoId_memberId: {
          videoId,
          memberId,
        },
      },
    });
  }

  /**
   * Delete all relationships for a video
   */
  async deleteByVideoId(videoId: string): Promise<void> {
    await this.prisma.videoMember.deleteMany({
      where: { videoId },
    });
  }

  /**
   * Check if relationship exists
   */
  async exists(videoId: string, memberId: string): Promise<boolean> {
    const relationship = await this.prisma.videoMember.findUnique({
      where: {
        videoId_memberId: {
          videoId,
          memberId,
        },
      },
    });
    return !!relationship;
  }
}