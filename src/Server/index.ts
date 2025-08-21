/**
 * Server Module Barrel Exports
 * Provides clean imports for the backend architecture
 */

// Service Container
export {
  ServiceContainer,
  getServiceContainer,
} from './Service/ServiceContainer';

// Services
export { VideoService } from './Service/VideoService/VideoService';
export { YouTubeService } from './Service/youtubeService/YouTubeService';

// Repositories
export { VideoRepository } from './Model/VideoRepository';

// Types and DTOs
export type {
  VideoDTO,
  CreateVideoDTO,
  UpdateVideoDTO,
  VideoListResponse,
  VideoSearchResponse,
  MemberAppearanceDTO,
} from './types/dto/VideoDTO';

export type {
  PaginationParams,
  ServiceResponse,
  BatchServiceResponse,
  SearchParams,
  FilterParams,
  ServiceContext,
  CacheOptions,
} from './types/interfaces/ServiceInterfaces';

export type {
  YouTubeSearchResponse,
  YouTubeVideoDetailsResponse,
  YouTubeVideoDetails,
  YouTubeChannelProcessResult,
  YouTubeBatchProcessResult,
} from './types/dto/YouTubeDTO';
