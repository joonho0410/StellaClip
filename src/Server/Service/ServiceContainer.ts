import { PrismaClient } from '@prisma/client';
import { VideoRepository } from '../Model/VideoRepository';
import { MemberRepository } from '../Model/MemberRepository';
import { VideoMemberRepository } from '../Model/VideoMemberRepository';
import { VideoService } from './VideoService/VideoService';
import { YouTubeService } from './YouTubeService/YouTubeService';

/**
 * Service Container for Dependency Injection
 * Implements Singleton pattern for service instances
 */
export class ServiceContainer {
  private static instance: ServiceContainer;
  private prismaClient: PrismaClient;
  private videoRepository: VideoRepository;
  private memberRepository: MemberRepository;
  private videoMemberRepository: VideoMemberRepository;
  private videoService: VideoService;
  private youtubeService: YouTubeService;

  private constructor() {
    // Initialize Prisma client
    this.prismaClient = new PrismaClient();

    // Initialize repositories
    this.videoRepository = new VideoRepository(this.prismaClient);
    this.memberRepository = new MemberRepository(this.prismaClient);
    this.videoMemberRepository = new VideoMemberRepository(this.prismaClient);

    // Initialize services
    this.videoService = new VideoService(
      this.videoRepository,
      this.memberRepository,
      this.videoMemberRepository
    );
    this.youtubeService = new YouTubeService(
      this.videoRepository,
      this.memberRepository,
      this.videoMemberRepository
    );
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  /**
   * Get Prisma client instance
   */
  public getPrismaClient(): PrismaClient {
    return this.prismaClient;
  }

  /**
   * Get Video Repository instance
   */
  public getVideoRepository(): VideoRepository {
    return this.videoRepository;
  }

  /**
   * Get Member Repository instance
   */
  public getMemberRepository(): MemberRepository {
    return this.memberRepository;
  }

  /**
   * Get VideoMember Repository instance
   */
  public getVideoMemberRepository(): VideoMemberRepository {
    return this.videoMemberRepository;
  }

  /**
   * Get Video Service instance
   */
  public getVideoService(): VideoService {
    return this.videoService;
  }

  /**
   * Get YouTube Service instance
   */
  public getYouTubeService(): YouTubeService {
    return this.youtubeService;
  }

  /**
   * Cleanup resources
   */
  public async cleanup(): Promise<void> {
    await this.prismaClient.$disconnect();
  }

  /**
   * Health check for all services
   */
  public async healthCheck(): Promise<{
    database: boolean;
    services: boolean;
    youtube: boolean;
  }> {
    try {
      // Check database connection
      await this.prismaClient.$queryRaw`SELECT 1`;

      // Check YouTube service
      const youtubeHealthy = await this.youtubeService.healthCheck();

      return {
        database: true,
        services: true,
        youtube: youtubeHealthy,
      };
    } catch (error) {
      console.error('Health check failed:', error);
      return {
        database: false,
        services: false,
        youtube: false,
      };
    }
  }
}

/**
 * Helper function to get service container instance
 */
export const getServiceContainer = () => ServiceContainer.getInstance();
