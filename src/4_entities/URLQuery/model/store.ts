import { create } from 'zustand';

import { updateUrlParams } from '@/shared/lib/query-params';
import type {
  VideoSearchParameterType,
  CohortType,
  StellaType,
  VideoSortType,
} from '@/4_entities/URLQuery/model/type';

interface VideoSearchState extends VideoSearchParameterType {
  setCohort: (cohort: CohortType) => void;
  setStella: (stella: StellaType) => void;
  setPage: (page: number) => void;
  setSort: (sort?: VideoSortType) => void;
}

export const useVideoSearchStore = create<VideoSearchState>((set) => ({
  cohort: 'ALL',
  stella: 'ALL',
  page: 1,
  sort: undefined,
  maxResult: 5,

  setCohort: (cohort) => {
    set({ cohort });
    updateUrlParams({ cohort });
  },
  setStella: (stella) => {
    set({ stella });
    updateUrlParams({ stella });
  },
  setPage: (page) => {
    set({ page });
    updateUrlParams({ page: page.toString() });
  },
  setSort: (sort) => {
    set({ sort });
    updateUrlParams({ sort });
  },
}));

// Widget별 선택적 구독을 위한 selector hooks

// cohort와 stella만 필요한 widget용
export const useCohortStella = () =>
  useVideoSearchStore((state) => ({
    cohort: state.cohort,
    stella: state.stella,
    setCohort: state.setCohort,
    setStella: state.setStella,
  }));

// 전체 state가 필요한 widget용
export const useFullVideoSearch = () => useVideoSearchStore((state) => state);
