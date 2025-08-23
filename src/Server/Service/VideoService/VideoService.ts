import { VideoRepository } from '../../Model/VideoRepository';
import { MemberRepository } from '../../Model/MemberRepository';
import { VideoMemberRepository } from '../../Model/VideoMemberRepository';
import type {
  CreateVideoDTO,
  UpdateVideoDTO,
  VideoDTO,
} from '../../types/dto/VideoDTO';
import type { PaginationParams } from '../../types/interfaces/ServiceInterfaces';

/**
 * Video Service Layer
 * Handles business logic for video operations
 */
export class VideoService {
  constructor(
    private videoRepository: VideoRepository,
    private memberRepository: MemberRepository,
    private videoMemberRepository: VideoMemberRepository
  ) {}

  /**
   * Get all videos with pagination
   */
  async getAllVideos(params: PaginationParams): Promise<VideoDTO[]> {
    const videos = await this.videoRepository.findMany({
      limit: params.limit,
      offset: params.offset,
    });

    return videos.map(this.mapToDTO);
  }

  /**
   * Get videos by channel
   */
  async getVideosByChannel(
    channelId: string,
    params: PaginationParams
  ): Promise<VideoDTO[]> {
    const videos = await this.videoRepository.findByChannelId(channelId, {
      limit: params.limit,
      offset: params.offset,
    });

    return videos.map(this.mapToDTO);
  }

  /**
   * Get official videos only
   */
  async getOfficialVideos(params: PaginationParams): Promise<VideoDTO[]> {
    const videos = await this.videoRepository.findOfficialVideos({
      limit: params.limit,
      offset: params.offset,
    });

    return videos.map(this.mapToDTO);
  }

  /**
   * Get video by ID
   */
  async getVideoById(id: string): Promise<VideoDTO | null> {
    const video = await this.videoRepository.findById(id);
    return video ? this.mapToDTO(video) : null;
  }

  /**
   * Create new video
   */
  async createVideo(data: CreateVideoDTO): Promise<VideoDTO> {
    // Business logic validation
    if (!data.videoId || !data.title) {
      throw new Error('Video ID and title are required');
    }

    // Check for duplicates
    const existingVideo = await this.videoRepository.findByVideoId(
      data.videoId
    );
    if (existingVideo) {
      throw new Error('Video with this YouTube ID already exists');
    }

    // Create the video
    const video = await this.videoRepository.create(data);

    // Handle member relationships if provided
    if (data.memberNames && data.memberNames.length > 0) {
      await this.createVideoMemberRelationships(video.id, data.memberNames);
    }

    // Fetch the video again with member relationships
    const videoWithMembers = await this.videoRepository.findById(video.id);
    return this.mapToDTO(videoWithMembers!);
  }

  /**
   * Update existing video
   */
  async updateVideo(id: string, data: UpdateVideoDTO): Promise<VideoDTO> {
    const existingVideo = await this.videoRepository.findById(id);
    if (!existingVideo) {
      throw new Error('Video not found');
    }

    const video = await this.videoRepository.update(id, data);
    return this.mapToDTO(video);
  }

  /**
   * Delete video
   */
  async deleteVideo(id: string): Promise<void> {
    const existingVideo = await this.videoRepository.findById(id);
    if (!existingVideo) {
      throw new Error('Video not found');
    }

    await this.videoRepository.delete(id);
  }

  /**
   * Search videos by text
   */
  async searchVideos(
    query: string,
    params: PaginationParams
  ): Promise<VideoDTO[]> {
    if (!query.trim()) {
      return [];
    }

    const videos = await this.videoRepository.searchByText(query, {
      limit: params.limit,
      offset: params.offset,
    });

    return videos.map(this.mapToDTO);
  }

  /**
   * Search videos by Stella member
   */
  async searchVideosByStella(params: {
    stellaName: string;
    isOfficial?: boolean;
    page: number;
    limit: number;
  }): Promise<{ videos: VideoDTO[]; total: number }> {
    // Business logic validation
    if (!params.stellaName.trim()) {
      throw new Error('Stella name is required');
    }

    // Calculate offset from page number
    const offset = (params.page - 1) * params.limit;

    // Search videos through repository
    const result = await this.videoRepository.findByStellaMember(
      params.stellaName,
      {
        limit: params.limit,
        offset,
        isOfficial: params.isOfficial,
      }
    );

    return {
      videos: result.videos.map(this.mapToDTO),
      total: result.total,
    };
  }

  /**
   * Search videos by Generation
   */
  async searchVideosByGen(params: {
    genName: string;
    isOfficial?: boolean;
    page: number;
    limit: number;
  }): Promise<{ videos: VideoDTO[]; total: number }> {
    // Business logic validation
    if (!params.genName.trim()) {
      throw new Error('Generation name is required');
    }

    // Calculate offset from page number
    const offset = (params.page - 1) * params.limit;

    // Search videos through repository
    const result = await this.videoRepository.findByGeneration(params.genName, {
      limit: params.limit,
      offset,
      isOfficial: params.isOfficial,
    });

    return {
      videos: result.videos.map(this.mapToDTO),
      total: result.total,
    };
  }

  /**
   * Upsert video from YouTube API
   */
  async upsertFromYouTube(data: CreateVideoDTO): Promise<VideoDTO> {
    // Business logic for YouTube data validation
    if (!data.channelId || !data.videoId) {
      throw new Error(
        'Channel ID and Video ID are required for YouTube videos'
      );
    }

    const video = await this.videoRepository.upsert(data);

    // Handle member relationships if provided
    if (data.memberNames && data.memberNames.length > 0) {
      // Clear existing relationships and create new ones
      await this.videoMemberRepository.deleteByVideoId(video.id);
      await this.createVideoMemberRelationships(video.id, data.memberNames);
    }

    // Fetch the video again with member relationships
    const videoWithMembers = await this.videoRepository.findById(video.id);
    return this.mapToDTO(videoWithMembers!);
  }

  /**
   * Batch upsert videos from YouTube API
   */
  async batchUpsertFromYouTube(
    videosData: CreateVideoDTO[]
  ): Promise<VideoDTO[]> {
    // Business logic validation for batch operation
    if (videosData.length === 0) {
      return [];
    }

    if (videosData.length > 50) {
      throw new Error('Batch size cannot exceed 50 videos');
    }

    // Use individual upsert calls to ensure member relationships are handled
    const results = await Promise.allSettled(
      videosData.map((videoData) => this.upsertFromYouTube(videoData))
    );

    const videos: VideoDTO[] = [];
    const errors: Error[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        videos.push(result.value);
      } else {
        console.error(
          `Failed to upsert video ${videosData[index].videoId}:`,
          result.reason
        );
        errors.push(result.reason);
      }
    });

    if (errors.length > 0) {
      console.warn(
        `${errors.length}/${videosData.length} videos failed to upsert`
      );
    }

    return videos;
  }

  /**
   * Create video-member relationships based on member names
   * Looks up member IDs by name and creates relationships in videoMember table
   */
  private async createVideoMemberRelationships(
    videoId: string,
    memberNames: string[]
  ): Promise<void> {
    // Remove duplicates and normalize names to uppercase
    const uniqueNames = [
      ...new Set(memberNames.map((name) => name.trim().toUpperCase())),
    ];

    // Find all members by name (findByName already normalizes to uppercase)
    const memberPromises = uniqueNames.map((name) =>
      this.memberRepository.findByName(name)
    );
    const members = await Promise.all(memberPromises);

    // Filter out null results and log missing members
    const validMembers = members.filter((member, index) => {
      if (!member) {
        console.warn(`Member '${uniqueNames[index]}' not found in database`);
        return false;
      }
      return true;
    });

    if (validMembers.length === 0) {
      console.warn('No valid members found for video relationships');
      return;
    }

    // Create video-member relationships
    const relationships = validMembers.map((member) => ({
      videoId,
      memberId: member!.id,
    }));

    try {
      await this.videoMemberRepository.createMany(relationships);
      console.log(
        `Created ${relationships.length} video-member relationships for video ${videoId}`
      );
    } catch (error) {
      console.error('Error creating video-member relationships:', error);
      throw new Error('Failed to create video-member relationships');
    }
  }

  /**
   * Map Prisma model to DTO
   */
  private mapToDTO(video: any): VideoDTO {
    return {
      id: video.id,
      videoId: video.videoId,
      title: video.title,
      description: video.description,
      thumbnail:
        video.thumbnailHigh ||
        video.thumbnailMedium ||
        video.thumbnailDefault ||
        '',
      channelId: video.channelId,
      channelTitle: video.channelTitle,
      publishedAt: video.publishedAt.toISOString(),
      isOfficial: video.isOfficial,
      viewCount: video.viewCount,
      likeCount: video.likeCount,
      tags: video.tags,
      duration: video.duration,
      thumbnails: {
        default: {
          url: video.thumbnailDefault || '',
          width: 120,
          height: 90,
        },
        medium: {
          url: video.thumbnailMedium || '',
          width: 320,
          height: 180,
        },
        high: {
          url: video.thumbnailHigh || '',
          width: 480,
          height: 360,
        },
      },
    };
  }
}
