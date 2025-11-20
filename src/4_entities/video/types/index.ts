// YouTube API Response Types based on mockData

// 실제로 application 에서 사용할 Type;
export interface VideoItem {
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
  thumbnails: YouTubeThumbnails;
  duration?: string;
}

// API에서 받아올 때 사용할 responseType

export interface YouTubeVideoId {
  kind: 'youtube#video';
  videoId: string;
}

export interface YouTubeSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: YouTubeThumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

export interface YouTubeThumbnails {
  default: YouTubeThumbnail;
  medium?: YouTubeThumbnail;
  high?: YouTubeThumbnail;
}

export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeSearchListResponse {
  kind: 'youtube#searchListResponse';
  etag: string;
  nextPageToken?: string;
  regionCode: string;
  pageInfo: YouTubePageInfo;
  items: YouTubeSearchResult[];
}

export interface YouTubePageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface YouTubeSearchResult {
  kind: 'youtube#searchResult';
  etag: string;
  id: YouTubeVideoId;
  snippet?: YouTubeSnippet;
}

// YouTube Video Details API Response Types
export interface YouTubeVideoDetailsResponse {
  kind: 'youtube#videoListResponse';
  etag: string;
  items: YouTubeVideoDetails[];
  pageInfo: YouTubePageInfo;
}

export interface YouTubeVideoDetails {
  kind: 'youtube#video';
  etag: string;
  id: string;
  snippet: YouTubeVideoSnippet;
  statistics: YouTubeVideoStatistics;
}

export interface YouTubeVideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: YouTubeVideoThumbnails;
  channelTitle: string;
  tags?: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: {
    title: string;
    description: string;
  };
  defaultAudioLanguage?: string;
}

export interface YouTubeVideoThumbnails {
  default: YouTubeThumbnail;
  medium: YouTubeThumbnail;
  high: YouTubeThumbnail;
  standard?: YouTubeThumbnail;
  maxres?: YouTubeThumbnail;
}

export interface YouTubeVideoStatistics {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}

// Prisma Video model을 위한 변환된 타입
export interface VideoCreateInput {
  videoId: string;
  title: string;
  description?: string;
  publishedAt: Date;
  thumbnailDefault?: string;
  thumbnailMedium?: string;
  thumbnailHigh?: string;
  channelId: string;
  channelTitle: string;
  isOfficial?: boolean;
  viewCount?: number;
  likeCount?: number;
  tags: string; // JSON string
  sourceQuery?: string;
  duration?: string;
}
