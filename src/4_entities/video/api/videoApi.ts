import { networkService } from '@/5_shared/api/networkService';
import type { VideoItem } from '../types';
import type {
  SearchVideosRequest,
  SearchVideosResponse,
  VideoDTO,
  GetVideoByIdRequest,
} from './types';

class VideoApiService {
  /**
   * 비디오 검색
   */
  async searchVideos(params: SearchVideosRequest): Promise<VideoItem[]> {
    const searchParams = new URLSearchParams();

    // Add search parameters
    if (params.isOfficial !== undefined) {
      searchParams.set('isOfficial', String(params.isOfficial));
    }

    if (params.maxResult) {
      searchParams.set('maxResult', String(params.maxResult));
    }

    if (params.page) {
      searchParams.set('page', String(params.page));
    }

    // Determine search type based on parameters
    if (params.member && params.member !== 'ALL') {
      // Search by specific member
      searchParams.set('stella', params.member);
    } else if (params.generation && params.generation !== 'ALL') {
      // Search by generation
      searchParams.set('gen', params.generation);
    } else {
      // Search all videos
      searchParams.set('stella', 'ALL');
    }

    const response = await networkService.getData<SearchVideosResponse>(
      `/api/videos/search?${searchParams}`
    );

    const videos: VideoDTO[] = response.data || [];

    // Transform VideoDTO to VideoItem
    return videos.map(this.transformVideoDTO);
  }

  /**
   * 공통 데이터 변환 메서드
   * VideoDTO -> VideoItem
   */
  private transformVideoDTO(video: VideoDTO): VideoItem {
    return {
      id: video.id,
      youtubeId: video.videoId,
      title: video.title,
      description: video.description || '',
      thumbnail:
        video.thumbnailHigh ||
        video.thumbnailMedium ||
        video.thumbnailDefault ||
        '',
      channelId: video.channelId,
      channelTitle: video.channelTitle,
      publishedAt: video.publishedAt,
      publishTime: video.publishedAt, // Use same value for both
      liveBroadcastContent: 'none', // Default value
      thumbnails: {
        default: {
          url: video.thumbnailDefault || '',
          width: 120,
          height: 90,
        },
        medium: {
          url: video.thumbnailMedium || '',
          width: 320,
          height: 180,
        },
        high: {
          url: video.thumbnailHigh || '',
          width: 480,
          height: 360,
        },
      },
    };
  }
}

// Singleton instance
export const videoApi = new VideoApiService();
