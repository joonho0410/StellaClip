// YouTube API Response Types based on mockData

// 실제로 application 에서 사용할 Type;
export interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  thumbnail: string;
  channelId: string;
  channelTitle: string;
  publishedAt: string;
  publishTime: string;
  liveBroadcastContent: string;
  thumbnails: YouTubeThumbnails;
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
