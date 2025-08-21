import { VideoRepository } from '../../Model/VideoRepository';
import { MemberRepository } from '../../Model/MemberRepository';
import { VideoMemberRepository } from '../../Model/VideoMemberRepository';
import type { CreateVideoDTO, VideoDTO } from '../../types/dto/VideoDTO';
import {
  getYouTubeConfig,
  getChannelId,
  searchChannelVideos,
  getVideoDetails,
  convertYouTubeDataToVideoInputs,
  validateVideoInputs,
  filterOutOfficialChannelVideos,
  testYouTubeAPIHealth,
} from './utils';

/**
 * YouTube Service Layer
 * Handles YouTube API integration and video processing
 */
export class YouTubeService {
  constructor(
    private videoRepository: VideoRepository,
    private memberRepository: MemberRepository,
    private videoMemberRepository: VideoMemberRepository
  ) {}

  /**
   * Fetch and process official channel videos
   */
  async fetchOfficialChannelVideos(stellaName: string): Promise<{
    channelId: string;
    videosFound: number;
    videosProcessed: number;
    videos: VideoDTO[];
  }> {
    console.log(`[YouTubeService] Starting fetchOfficialChannelVideos for: ${stellaName}`);
    
    // Business logic validation
    if (!stellaName) {
      throw new Error('Channel name is required');
    }

    // Get configuration
    const config = getYouTubeConfig();
    const channelId = getChannelId(stellaName);
    console.log(`[YouTubeService] Channel ID for ${stellaName}: ${channelId}`);

    // Step 1: Search for videos in the channel
    const searchResults = await searchChannelVideos(channelId, config.apiKey);
    console.log(`[YouTubeService] Found ${searchResults.length} videos from search`);

    if (searchResults.length === 0) {
      return {
        channelId,
        videosFound: 0,
        videosProcessed: 0,
        videos: [],
      };
    }

    // Step 2: Get detailed video information
    const videoDetails = await getVideoDetails(searchResults, config.apiKey);
    console.log(`[YouTubeService] Got details for ${videoDetails.length} videos`);

    // Step 3: Convert and validate data
    const videoInputs = convertYouTubeDataToVideoInputs(
      videoDetails,
      [channelId], // Mark as official
      `channel:${stellaName}`
    );
    console.log(`[YouTubeService] Converted to ${videoInputs.length} video inputs`);

    // Step 4: Save to database with member relationships
    const savedVideos = await this.saveVideosToDatabase(videoInputs, stellaName);
    console.log(`[YouTubeService] Saved ${savedVideos.length} videos with member relationships`);

    return {
      channelId,
      videosFound: searchResults.length,
      videosProcessed: savedVideos.length,
      videos: savedVideos,
    };
  }

  /**
   * Batch process multiple channels
   */
  async batchProcessChannels(channelNames: string[]): Promise<{
    totalProcessed: number;
    results: Array<{
      channelName: string;
      success: boolean;
      videosProcessed: number;
      error?: string;
    }>;
  }> {
    const results = await Promise.allSettled(
      channelNames.map(async (channelName) => {
        const result = await this.fetchOfficialChannelVideos(channelName);
        return {
          channelName,
          success: true,
          videosProcessed: result.videosProcessed,
        };
      })
    );

    const processedResults = results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          channelName: channelNames[index],
          success: false,
          videosProcessed: 0,
          error: result.reason.message,
        };
      }
    });

    const totalProcessed = processedResults
      .filter((r) => r.success)
      .reduce((sum, r) => sum + r.videosProcessed, 0);

    return {
      totalProcessed,
      results: processedResults,
    };
  }

  /**
   * Save videos to database with business logic and member relationships
   */
  private async saveVideosToDatabase(
    videoInputs: CreateVideoDTO[],
    stellaName: string,
    isClipMode: boolean = false
  ): Promise<VideoDTO[]> {
    // Business logic: validation and filtering using utility function
    let validVideos = validateVideoInputs(videoInputs);

    // For clip mode, filter out videos from official channels
    if (isClipMode) {
      validVideos = filterOutOfficialChannelVideos(validVideos);
    }

    if (validVideos.length === 0) {
      return [];
    }

    // Add stellaName to memberNames for all videos to create relationships
    const videosWithMembers = validVideos.map(video => ({
      ...video,
      memberNames: [stellaName], // Associate with the stella member
    }));

    // Process each video individually to ensure member relationships are created
    const savedVideos: any[] = [];
    
    for (const videoData of videosWithMembers) {
      try {
        // Use the individual upsert method which handles member relationships
        const savedVideo = await this.upsertVideoWithMembers(videoData);
        savedVideos.push(savedVideo);
      } catch (error) {
        console.error(`Failed to save video ${videoData.videoId}:`, error);
        // Continue with other videos even if one fails
      }
    }

    // Convert to DTOs using a mapper
    return savedVideos.map((video) => this.mapVideoToDTO(video));
  }

  /**
   * Upsert single video with member relationships
   */
  private async upsertVideoWithMembers(data: CreateVideoDTO): Promise<any> {
    // Upsert the video first
    const video = await this.videoRepository.upsert(data);

    // Create member relationships if memberNames are provided
    if (data.memberNames && data.memberNames.length > 0) {
      await this.createVideoMemberRelationships(video.id, data.memberNames);
    }

    // Fetch the video again with member relationships
    const videoWithMembers = await this.videoRepository.findById(video.id);
    return videoWithMembers;
  }

  /**
   * Create video-member relationships based on member names
   */
  private async createVideoMemberRelationships(videoId: string, memberNames: string[]): Promise<void> {
    // Remove duplicates and normalize names to uppercase
    const uniqueNames = [...new Set(memberNames.map(name => name.trim().toUpperCase()))];
    
    // Find all members by name
    const memberPromises = uniqueNames.map(name => this.memberRepository.findByName(name));
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
    const relationships = validMembers.map(member => ({
      videoId,
      memberId: member!.id,
    }));
    
    try {
      await this.videoMemberRepository.createMany(relationships);
      console.log(`Created ${relationships.length} video-member relationships for video ${videoId}`);
    } catch (error) {
      console.error('Error creating video-member relationships:', error);
      throw new Error('Failed to create video-member relationships');
    }
  }


  /**
   * Map Prisma model to DTO (could be moved to a separate mapper service)
   */
  private mapVideoToDTO(video: any): VideoDTO {
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
      memberAppearances:
        video.memberAppearances?.map((appearance: any) => ({
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

  /**
   * Search and process clip videos for Stella members
   */
  async searchClipVideos(stellaName: string, maxResults: number = 20): Promise<{
    videosFound: number;
    videosProcessed: number;
    videos: VideoDTO[];
  }> {
    console.log(`[YouTubeService] Starting searchClipVideos for: ${stellaName}`);
    
    // Business logic validation
    if (!stellaName) {
      throw new Error('Stella name is required');
    }

    // Get configuration
    const config = getYouTubeConfig();
    
    // Build search queries for fan-made clips
    const searchQueries = [
      `${stellaName} 클립`,
      `${stellaName} 하이라이트`, 
      `${stellaName} 키리누키`
    ];

    const allVideoResults: any[] = [];
    let totalFound = 0;

    // Search with multiple queries
    for (const query of searchQueries) {
      try {
        console.log(`[YouTubeService] Searching with query: ${query}`);
        const searchResults = await this.searchYouTubeVideos(query, Math.ceil(maxResults / searchQueries.length), config.apiKey);
        allVideoResults.push(...searchResults);
        totalFound += searchResults.length;
        console.log(`[YouTubeService] Found ${searchResults.length} videos for query: ${query}`);
      } catch (error) {
        console.error(`[YouTubeService] Error searching with query "${query}":`, error);
        // Continue with other queries even if one fails
      }
    }

    if (allVideoResults.length === 0) {
      return {
        videosFound: 0,
        videosProcessed: 0,
        videos: [],
      };
    }

    // Remove duplicates by videoId
    const uniqueVideos = allVideoResults.filter((video, index, self) => 
      index === self.findIndex(v => v.id.videoId === video.id.videoId)
    );

    // Limit to maxResults
    const limitedVideos = uniqueVideos.slice(0, maxResults);

    // Get detailed video information
    const videoDetails = await getVideoDetails(limitedVideos, config.apiKey);
    console.log(`[YouTubeService] Got details for ${videoDetails.length} clip videos`);

    // Convert and validate data - mark as non-official clips
    const videoInputs = convertYouTubeDataToVideoInputs(
      videoDetails,
      [], // Empty array means not official
      `clip:${stellaName}`
    );
    console.log(`[YouTubeService] Converted to ${videoInputs.length} video inputs`);

    // Save to database with member relationships (use clip mode to filter official channels)
    const savedVideos = await this.saveVideosToDatabase(videoInputs, stellaName, true);
    console.log(`[YouTubeService] Saved ${savedVideos.length} clip videos with member relationships`);

    return {
      videosFound: totalFound,
      videosProcessed: savedVideos.length,
      videos: savedVideos,
    };
  }

  /**
   * Search YouTube videos using YouTube Data API v3
   */
  private async searchYouTubeVideos(query: string, maxResults: number, apiKey: string): Promise<any[]> {
    const url = `https://youtube.googleapis.com/youtube/v3/search?maxResults=${maxResults}&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error(`Error searching YouTube with query "${query}":`, error);
      throw error;
    }
  }

  /**
   * Health check for YouTube API
   */
  async healthCheck(): Promise<boolean> {
    try {
      const config = getYouTubeConfig();
      return await testYouTubeAPIHealth(config.apiKey);
    } catch (error) {
      console.error('YouTube service health check failed:', error);
      return false;
    }
  }
}
