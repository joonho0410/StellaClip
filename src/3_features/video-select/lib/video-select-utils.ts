import type { VideoItem } from '@/4_entities/video';

/**
 * Video Selection Utilities
 * 비디오 선택 관련 헬퍼 함수들
 */

/**
 * 비디오 목록에서 특정 비디오가 선택되었는지 확인
 */
export function isVideoInSelection(
  video: VideoItem,
  selectedVideos: VideoItem[]
): boolean {
  return selectedVideos.some(selected => selected.id === video.id);
}

/**
 * 비디오 선택/해제 토글
 */
export function toggleVideoSelection(
  video: VideoItem,
  selectedVideos: VideoItem[]
): VideoItem[] {
  const isSelected = isVideoInSelection(video, selectedVideos);
  
  if (isSelected) {
    return selectedVideos.filter(selected => selected.id !== video.id);
  } else {
    return [...selectedVideos, video];
  }
}

/**
 * 비디오 선택 상태에 따른 액션 텍스트 반환
 */
export function getSelectionActionText(
  video: VideoItem,
  currentVideo: VideoItem | null
): string {
  const isSelected = currentVideo?.id === video.id;
  return isSelected ? '선택 해제' : '선택';
}

/**
 * 비디오 선택 시 로그 메시지 생성
 */
export function createSelectionLogMessage(
  video: VideoItem,
  action: 'select' | 'deselect'
): string {
  const actionText = action === 'select' ? '선택됨' : '선택 해제됨';
  return `비디오 ${actionText}: ${video.title} (${video.id})`;
}

/**
 * 비디오 선택 가능 여부 확인
 */
export function canSelectVideo(
  video: VideoItem,
  options?: {
    maxSelections?: number;
    currentSelections?: VideoItem[];
    disabled?: boolean;
  }
): boolean {
  if (options?.disabled) return false;
  
  if (options?.maxSelections && options?.currentSelections) {
    const isAlreadySelected = isVideoInSelection(video, options.currentSelections);
    if (!isAlreadySelected && options.currentSelections.length >= options.maxSelections) {
      return false;
    }
  }
  
  return true;
}

/**
 * 선택된 비디오 목록을 정렬
 */
export function sortSelectedVideos(
  videos: VideoItem[],
  sortBy: 'title' | 'publishedAt' | 'duration' = 'title'
): VideoItem[] {
  return [...videos].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'publishedAt':
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      case 'duration':
        // duration이 없는 경우를 처리
        return 0;
      default:
        return 0;
    }
  });
}