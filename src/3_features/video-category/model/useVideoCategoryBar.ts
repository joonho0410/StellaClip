import { useTransition } from 'react';
import { useSelectedGen, useSelectedStella, useCategoryActions } from '@/4_entities/member';
import type { AllMember, GenType } from '@/4_entities/member';

/**
 * VideoCategoryBar를 위한 비즈니스 로직을 관리하는 커스텀 훅
 * - Category 상태 관리 (zustand)
 * - 탭/서브탭 전환 로직
 * - useTransition을 통한 성능 최적화
 */
export const useVideoCategoryBar = () => {
  const gen = useSelectedGen();
  const stella = useSelectedStella();
  const { setGen, setStella } = useCategoryActions();
  const [isPending, startTransition] = useTransition();

  // 메인 탭 변경 핸들러 - ALL만 예외로 전역 상태 변경
  const handleTabChange = (tabId: string) => {
    // ALL 탭만 전역 상태 변경 (전체 영상 보기)
    if (tabId === 'ALL') {
      startTransition(() => {
        setGen('ALL');
        setStella('ALL');
      });
    }
    // 다른 메인 탭(Mystic, Universe, Cliche)은 상태 변경하지 않음
  };

  // 서브탭 변경 핸들러
  const handleSubTabChange = (tabId: string, subTabId: string) => {
    startTransition(() => {
      if (subTabId === 'ALL') {
        setGen(tabId as GenType);
        setStella('ALL');
      } else {
        setGen(tabId as GenType);
        setStella(subTabId as AllMember);
      }
    });
  };

  // 현재 활성 메인 탭 결정
  const getActiveTabId = (): string => {
    return gen;
  };

  // 현재 활성 서브탭 결정
  const getActiveSubTabId = (): string => {
    if (gen === 'ALL' || stella === 'ALL') return 'ALL';
    return stella;
  };

  return {
    // 상태
    isPending,
    activeTabId: getActiveTabId(),
    activeSubTabId: getActiveSubTabId(),

    // 액션
    handleTabChange,
    handleSubTabChange,

    // 원본 상태 (필요시 직접 접근 가능)
    gen,
    stella,
  };
};
