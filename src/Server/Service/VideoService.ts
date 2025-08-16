import { VideoRepository } from '../Model/VideoRepository';
import type { CreateVideoDTO, UpdateVideoDTO, VideoDTO } from '../types/dto/VideoDTO';
import type { PaginationParams } from '../types/interfaces/ServiceInterfaces';

/**
 * Video Service Layer
 * Handles business logic for video operations
 */
export class VideoService {
  constructor(private videoRepository: VideoRepository) {}

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
    const existingVideo = await this.videoRepository.findByVideoId(data.videoId);
    if (existingVideo) {
      throw new Error('Video with this YouTube ID already exists');
    }

    const video = await this.videoRepository.create(data);
    return this.mapToDTO(video);
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
   * Increment video view count
   */
  async incrementViews(id: string): Promise<VideoDTO> {
    const video = await this.videoRepository.incrementViews(id);
    return this.mapToDTO(video);
  }

  /**
   * Upsert video from YouTube API
   */
  async upsertFromYouTube(data: CreateVideoDTO): Promise<VideoDTO> {
    // Business logic for YouTube data validation
    if (!data.channelId || !data.videoId) {
      throw new Error('Channel ID and Video ID are required for YouTube videos');
    }

    const video = await this.videoRepository.upsert(data);
    return this.mapToDTO(video);
  }

  /**
   * Batch upsert videos from YouTube API
   */
  async batchUpsertFromYouTube(videosData: CreateVideoDTO[]): Promise<VideoDTO[]> {
    // Business logic validation for batch operation
    if (videosData.length === 0) {
      return [];
    }

    if (videosData.length > 50) {
      throw new Error('Batch size cannot exceed 50 videos');
    }

    const results = await this.videoRepository.batchUpsert(videosData);
    return results.map(this.mapToDTO);
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
      publishedAt: video.publishedAt.toISOString(),
      thumbnailDefault: video.thumbnailDefault,
      thumbnailMedium: video.thumbnailMedium,
      thumbnailHigh: video.thumbnailHigh,
      channelId: video.channelId,
      channelTitle: video.channelTitle,
      isOfficial: video.isOfficial,
      duration: video.duration,
      viewCount: video.viewCount,
      likeCount: video.likeCount,
      category: video.category,
      tags: video.tags,
      sourceQuery: video.sourceQuery,
      crawledAt: video.crawledAt.toISOString(),
      updatedAt: video.updatedAt.toISOString(),
      memberAppearances: video.memberAppearances?.map((appearance: any) => ({
        member: {
          id: appearance.member.id,
          name: appearance.member.name,
          displayName: appearance.member.displayName,
          generation: appearance.member.generation,
          hashtags: appearance.member.hashtags,
        },
      })) || [],
    };
  }
}