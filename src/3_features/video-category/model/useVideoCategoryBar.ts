import { useTransition } from 'react';
import { useGenStella } from '@/4_entities/URLQuery/model/store';
import type { AllMember, GenType } from '@/4_entities/stella';

/**
 * VideoCategoryBar를 위한 비즈니스 로직을 관리하는 커스텀 훅
 * - URLQuery 상태 관리
 * - 탭/서브탭 전환 로직
 * - useTransition을 통한 성능 최적화
 */
export const useVideoCategoryBar = () => {
  const { gen, stella, setGen, setStella } = useGenStella();
  const [isPending, startTransition] = useTransition();

  // 메인 탭 변경 핸들러
  const handleTabChange = (tabId: string) => {
    startTransition(() => {
      if (tabId === 'ALL') {
        setGen('ALL');
        setStella('ALL');
      } else {
        setGen(tabId as GenType);
        setStella('ALL'); // 메인 탭 변경 시 서브탭은 ALL로 초기화
      }
    });
  };

  // 서브탭 변경 핸들러
  const handleSubTabChange = (tabId: string, subTabId: string) => {
    startTransition(() => {
      if (tabId === 'ALL') {
        setGen('ALL');
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
