import { useTransition } from 'react';
import { useHandleURLQuery } from '@/shared/lib/hooks';
import type { AllMember, GenType } from '@/4_entities/member';

/**
 * MemberBar를 위한 비즈니스 로직을 관리하는 커스텀 훅
 * - URL Query Parameter 기반 상태 관리
 * - 탭/서브탭 전환 로직
 * - useTransition을 통한 성능 최적화
 *
 * @example
 * ```tsx
 * const { activeTabId, activeSubTabId, handleTabChange, handleSubTabChange } = useMemberBar();
 * ```
 *
 * Query Parameters:
 * - gen: 'ALL' | 'Mystic' | 'Universe' | 'Cliche'
 * - stella: 'ALL' | AllMember
 */
export const useMemberBar = () => {
  const { getQuery, setQueries } = useHandleURLQuery();
  const [isPending, startTransition] = useTransition();

  // URL Query에서 현재 상태 읽기
  const gen = (getQuery('gen') || 'ALL') as GenType | 'ALL';
  const stella = (getQuery('stella') || 'ALL') as AllMember | 'ALL';

  // 메인 탭 변경 핸들러 - ALL만 예외로 쿼리 변경
  const handleTabChange = (tabId: string) => {
    // ALL 탭만 쿼리 변경 (전체 영상 보기)
    if (tabId === 'ALL') {
      startTransition(() => {
        setQueries({
          gen: 'ALL',
          stella: 'ALL',
        });
      });
    }
    // 다른 메인 탭(Mystic, Universe, Cliche)은 상태 변경하지 않음
  };

  // 서브탭 변경 핸들러
  const handleSubTabChange = (tabId: string, subTabId: string) => {
    startTransition(() => {
      if (subTabId === 'ALL') {
        setQueries({
          gen: tabId,
          stella: 'ALL',
        });
      } else {
        setQueries({
          gen: tabId,
          stella: subTabId,
        });
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
