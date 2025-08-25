import { networkService } from '@/5_shared/api/networkService';
import type { VideoItem } from '../types';
import type {
  SearchVideosParams,
  SearchVideosResponse,
  VideoDTO,
} from './types';
import { makeSearchVideoQuery } from './utils';

class VideoApiService {
  /**
   * 비디오 검색
   */
  async searchVideos(params: SearchVideosParams): Promise<VideoItem[]> {
    const query = makeSearchVideoQuery(params);
    const response = await networkService.getData<SearchVideosResponse>(
      `/api/videos/search?${query}`
    );

    const videos: VideoDTO[] = response.data || [];
    return videos;
  }
}

// Singleton instance
export const videoApi = new VideoApiService();
