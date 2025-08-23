import type { AllMember, GenType } from '@/4_entities/member';

// API 요청 타입들
export interface SearchVideosRequest {
  member?: AllMember | 'ALL';
  generation?: GenType | 'ALL';
  isOfficial?: boolean;
  maxResult?: number;
  page?: number;
}

export interface GetVideoByIdRequest {
  id: string;
}

// API 응답 타입들  
export interface SearchVideosResponse {
  data: VideoDTO[];
  total?: number;
  page?: number;
  hasMore?: boolean;
}

export interface VideoDTO {
  id: string;
  videoId: string;
  title: string;
  description: string | null;
  thumbnail: string;
  channelId: string;
  channelTitle: string;
  publishedAt: string;
  isOfficial: boolean;
  viewCount: number | null;
  likeCount: number | null;
  tags: string;
  thumbnails: {
    default: {
      url: string;
      width: number;
      height: number;
    };
    medium?: {
      url: string;
      width: number;
      height: number;
    };
    high?: {
      url: string;
      width: number;
      height: number;
    };
  };
}