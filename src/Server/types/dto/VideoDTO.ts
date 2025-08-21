/**
 * Data Transfer Objects for Video entities
 */

export interface VideoDTO {
  id: string;
  videoId: string;
  title: string;
  description: string | null;
  publishedAt: string;
  thumbnailDefault: string | null;
  thumbnailMedium: string | null;
  thumbnailHigh: string | null;
  channelId: string;
  channelTitle: string;
  isOfficial: boolean;
  duration: string | null;
  viewCount: number | null;
  likeCount: number | null;
  category: 'CLIP' | 'SHORTS' | null;
  tags: string;
  sourceQuery: string | null;
  crawledAt: string;
  updatedAt: string;
  memberAppearances: MemberAppearanceDTO[];
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