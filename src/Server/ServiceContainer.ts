import { PrismaClient } from '@prisma/client';
import { VideoRepository } from './Model/VideoRepository';
import { VideoService } from './Service/VideoService';

/**
 * Service Container for Dependency Injection
 * Implements Singleton pattern for service instances
 */
export class ServiceContainer {
  private static instance: ServiceContainer;
  private prismaClient: PrismaClient;
  private videoRepository: VideoRepository;
  private videoService: VideoService;

  private constructor() {
    // Initialize Prisma client
    this.prismaClient = new PrismaClient();
    
    // Initialize repositories
    this.videoRepository = new VideoRepository(this.prismaClient);
    
    // Initialize services
    this.videoService = new VideoService(this.videoRepository);
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
   * Get Video Service instance
   */
  public getVideoService(): VideoService {
    return this.videoService;
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
  }> {
    try {
      // Check database connection
      await this.prismaClient.$queryRaw`SELECT 1`;
      
      return {
        database: true,
        services: true,
      };
    } catch (error) {
      console.error('Health check failed:', error);
      return {
        database: false,
        services: false,
      };
    }
  }
}

/**
 * Helper function to get service container instance
 */
export const getServiceContainer = () => ServiceContainer.getInstance();