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

    // VideoDTO and VideoItem are now identical, no transformation needed
    return videos;
  }

}

// Singleton instance
export const videoApi = new VideoApiService();
