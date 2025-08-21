import { useCallback } from 'react';
import { useCurrentVideo } from '@/4_entities/video';
import type { VideoItem } from '@/4_entities/video';

/**
 * Video Selection Mode
 * 비디오 선택 시 수행할 동작 유형
 */
export type VideoSelectMode = 
  | 'panel'          // 슬라이드 패널에서 보기 (currentVideo 설정)
  | 'swiper'         // swiper 인덱스 변경
  | 'custom'         // 커스텀 핸들러 사용
  | 'none';          // 아무 동작 안함

/**
 * Video Selection Context
 * 선택 시 필요한 컨텍스트 정보
 */
export interface VideoSelectContext {
  mode: VideoSelectMode;
  videos?: VideoItem[];           // swiper mode에서 인덱스 계산용
  onSwiperChange?: (index: number) => void;  // swiper 변경 콜백
  onCustomSelect?: (video: VideoItem) => void; // 커스텀 핸들러
}

/**
 * Video Selection Feature Hook
 * 
 * 다양한 선택 모드를 지원하는 비디오 선택 훅
 * - panel: currentVideo 설정하여 슬라이드 패널에서 보기
 * - swiper: swiper 인덱스 변경
 * - custom: 커스텀 로직 실행
 */
export const useVideoSelect = (context?: VideoSelectContext) => {
  const { currentVideo, setCurrentVideo } = useCurrentVideo();

  /**
   * 비디오 선택 핸들러 (다중 모드 지원)
   */
  const handleVideoSelect = useCallback((video: VideoItem) => {
    const mode = context?.mode || 'panel';

    switch (mode) {
      case 'panel':
        // 슬라이드 패널 모드: currentVideo 설정
        if (currentVideo?.id !== video.id) {
          setCurrentVideo(video);
        }
        break;

      case 'swiper':
        // Swiper 모드: 해당 비디오의 인덱스로 swiper 변경
        if (context?.videos && context?.onSwiperChange) {
          const videoIndex = context.videos.findIndex(v => v.id === video.id);
          if (videoIndex !== -1) {
            context.onSwiperChange(videoIndex);
          }
        }
        break;

      case 'custom':
        // 커스텀 모드: 사용자 정의 핸들러 실행
        if (context?.onCustomSelect) {
          context.onCustomSelect(video);
        }
        break;

      case 'none':
        // 아무것도 하지 않음
        break;

      default:
        console.warn(`Unknown video select mode: ${mode}`);
    }
  }, [currentVideo, setCurrentVideo, context]);

  /**
   * 현재 선택된 비디오인지 확인
   */
  const isVideoSelected = useCallback((videoId: string) => {
    return currentVideo?.id === videoId;
  }, [currentVideo?.id]);

  /**
   * 선택 모드에 따른 동작 설명 반환
   */
  const getSelectModeDescription = useCallback(() => {
    const mode = context?.mode || 'panel';
    switch (mode) {
      case 'panel':
        return '슬라이드 패널에서 보기';
      case 'swiper':
        return 'Swiper로 이동';
      case 'custom':
        return '커스텀 동작';
      case 'none':
        return '동작 없음';
      default:
        return '알 수 없는 모드';
    }
  }, [context?.mode]);

  return {
    // State
    currentVideo,
    
    // Actions
    handleVideoSelect,
    
    // Computed
    isVideoSelected,
    getSelectModeDescription,
    
    // Context
    selectMode: context?.mode || 'panel',
  };
};