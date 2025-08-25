/**
 * Data Transfer Objects for Video entities
 */

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
  duration?: string;
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

export interface MemberAppearanceDTO {
  member: {
    id: string;
    name: string;
    displayName: string;
    generation: 'MYSTIC' | 'UNIVERSE' | 'CLICHE';
    hashtags: string;
  };
}

export interface CreateVideoDTO {
  videoId: string;
  title: string;
  description?: string;
  publishedAt: string;
  thumbnailDefault?: string;
  thumbnailMedium?: string;
  thumbnailHigh?: string;
  channelId: string;
  channelTitle: string;
  isOfficial?: boolean;
  duration?: string;
  viewCount?: number;
  likeCount?: number;
  category?: 'CLIP' | 'SHORTS';
  tags: string;
  sourceQuery?: string;
  memberNames?: string[]; // Array of member names that appear in the video
}

export interface UpdateVideoDTO {
  title?: string;
  description?: string;
  thumbnailDefault?: string;
  thumbnailMedium?: string;
  thumbnailHigh?: string;
  channelTitle?: string;
  isOfficial?: boolean;
  duration?: string;
  viewCount?: number;
  likeCount?: number;
  category?: 'CLIP' | 'SHORTS';
  tags?: string;
  sourceQuery?: string;
}

export interface VideoListResponse {
  videos: VideoDTO[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
}

export interface VideoSearchResponse extends VideoListResponse {
  query: string;
}