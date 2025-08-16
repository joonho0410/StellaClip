/**
 * Common interfaces for service layer
 */

export interface PaginationParams {
  limit: number;
  offset: number;
}

export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface BatchServiceResponse<T> {
  success: boolean;
  data: T[];
  errors: string[];
  successCount: number;
  errorCount: number;
}

export interface SearchParams extends PaginationParams {
  query: string;
  sortBy?: 'relevance' | 'date' | 'views' | 'likes';
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  isOfficial?: boolean;
  category?: 'CLIP' | 'SHORTS';
  channelId?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface ServiceContext {
  userId?: string;
  isAdmin?: boolean;
  requestId: string;
}

export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  tags?: string[];
}