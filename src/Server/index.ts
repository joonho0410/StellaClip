/**
 * Server Module Barrel Exports
 * Provides clean imports for the backend architecture
 */

// Service Container
export { ServiceContainer, getServiceContainer } from './ServiceContainer';

// Services
export { VideoService } from './Service/VideoService';

// Repositories
export { VideoRepository } from './Model/VideoRepository';
export { BaseRepository } from './Model/BaseRepository';

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