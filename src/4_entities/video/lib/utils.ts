import { YouTubeVideoDetails, VideoCreateInput } from '../types';

// YouTube API 응답을 Prisma Video 모델에 맞게 변환하는 유틸 함수
export function convertYouTubeVideoToVideoInput(
  youtubeVideo: YouTubeVideoDetails,
  channelIds?: string[], // 공식 채널 ID 목록
  sourceQuery?: string
): VideoCreateInput {
  const { id, snippet, statistics } = youtubeVideo;
  
  // 공식 채널 여부 확인
  const isOfficial = channelIds ? channelIds.includes(snippet.channelId) : false;
  
  // 숫자형 통계 변환 (문자열 -> 숫자)
  const viewCount = statistics.viewCount ? parseInt(statistics.viewCount, 10) : undefined;
  const likeCount = statistics.likeCount ? parseInt(statistics.likeCount, 10) : undefined;
  
  // 태그를 JSON 문자열로 변환
  const tags = JSON.stringify(snippet.tags || []);
  
  return {
    videoId: id,
    title: snippet.title,
    description: snippet.description || undefined,
    publishedAt: new Date(snippet.publishedAt),
    thumbnailDefault: snippet.thumbnails.default?.url,
    thumbnailMedium: snippet.thumbnails.medium?.url,
    thumbnailHigh: snippet.thumbnails.high?.url,
    channelId: snippet.channelId,
    channelTitle: snippet.channelTitle,
    isOfficial,
    viewCount,
    likeCount,
    tags,
    sourceQuery
  };
}

// 여러 YouTube 비디오를 한번에 변환하는 유틸 함수
export function convertYouTubeVideosToVideoInputs(
  youtubeVideos: YouTubeVideoDetails[],
  channelIds?: string[],
  sourceQuery?: string
): VideoCreateInput[] {
  return youtubeVideos.map(video => 
    convertYouTubeVideoToVideoInput(video, channelIds, sourceQuery)
  );
}