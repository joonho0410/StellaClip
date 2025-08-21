/**
 * YouTube API Data Transfer Objects
 */

export interface YouTubeSearchResponse {
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
  contentDetails: YouTubeVideoContentDetails;
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

export interface YouTubeVideoContentDetails {
  duration: string; // ISO 8601 format (e.g., "PT4M13S")
  dimension: string; // "2d" or "3d"
  definition: string; // "hd" or "sd"
  caption: string; // "true" or "false"
  licensedContent: boolean;
  regionRestriction?: {
    allowed?: string[];
    blocked?: string[];
  };
  contentRating?: any;
  projection: string; // "rectangular" or "360"
}

export interface YouTubeChannelProcessResult {
  channelName: string;
  channelId: string;
  success: boolean;
  videosFound: number;
  videosProcessed: number;
  error?: string;
}

export interface YouTubeBatchProcessResult {
  totalChannels: number;
  successfulChannels: number;
  failedChannels: number;
  totalVideosProcessed: number;
  results: YouTubeChannelProcessResult[];
}