import { useTransition } from 'react';
import { useCohortStella } from '@/4_entities/URLQuery/model/store';
import type { AllMember, CohortType } from '@/4_entities/stella';

/**
 * VideoCategoryBar를 위한 비즈니스 로직을 관리하는 커스텀 훅
 * - URLQuery 상태 관리
 * - 탭/서브탭 전환 로직
 * - useTransition을 통한 성능 최적화
 */
export const useVideoCategoryBar = () => {
  const { cohort, stella, setCohort, setStella } = useCohortStella();
  const [isPending, startTransition] = useTransition();

  // 메인 탭 변경 핸들러
  const handleTabChange = (tabId: string) => {
    startTransition(() => {
      if (tabId === 'ALL') {
        setCohort('ALL');
        setStella('ALL');
      } else {
        setCohort(tabId as CohortType);
        setStella('ALL'); // 메인 탭 변경 시 서브탭은 ALL로 초기화
      }
    });
  };

  // 서브탭 변경 핸들러
  const handleSubTabChange = (tabId: string, subTabId: string) => {
    startTransition(() => {
      if (tabId === 'ALL') {
        setCohort('ALL');
        setStella('ALL');
      } else {
        setCohort(tabId as CohortType);
        setStella(subTabId as AllMember);
      }
    });
  };

  // 현재 활성 메인 탭 결정
  const getActiveTabId = (): string => {
    return cohort;
  };

  // 현재 활성 서브탭 결정
  const getActiveSubTabId = (): string => {
    if (cohort === 'ALL' || stella === 'ALL') return 'ALL';
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
    cohort,
    stella,
  };
};
