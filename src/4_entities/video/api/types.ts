import type { AllMember, GenType } from '@/4_entities/member';
import type { VideoDTO } from '@/Server/Service/VideoService';

// Re-export VideoDTO from Server layer
export type { VideoDTO };

// API 요청 타입들
export interface SearchVideosParams {
  member?: AllMember | 'ALL';
  generation?: GenType | 'ALL';
  isOfficial?: boolean;
  maxResult?: number;
  page?: number;
}

// API 응답 타입들
export interface SearchVideosResponse {
  data: VideoDTO[];
  total?: number;
  page?: number;
  hasMore?: boolean;
}
