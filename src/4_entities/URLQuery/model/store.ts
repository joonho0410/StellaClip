import { create } from 'zustand';

import { updateUrlParams } from '@/shared/lib/query-params';
import type {
  StellaQueryType,
  CohortQueryType,
} from '@/4_entities/URLQuery/model/type';
import type {
  VideoSearchParameterType,
  VideoSortType,
} from '@/4_entities/URLQuery/model/type';

interface VideoSearchState extends VideoSearchParameterType {
  setCohort: (cohort: CohortQueryType) => void;
  setStella: (stella: StellaQueryType) => void;
  setPage: (page: number) => void;
  setSort: (sort?: VideoSortType) => void;
  setMaxResult: (maxResult: number) => void;
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
  setMaxResult: (maxResult) => {
    set({ maxResult });
    updateUrlParams({ maxResult: maxResult.toString() });
  },
}));

// Widget별 선택적 구독을 위한 selector hooks

// cohort와 stella만 필요한 widget용
export const useCohortStella = () => {
  const cohort = useVideoSearchStore((state) => state.cohort);
  const stella = useVideoSearchStore((state) => state.stella);
  const setCohort = useVideoSearchStore((state) => state.setCohort);
  const setStella = useVideoSearchStore((state) => state.setStella);

  return { cohort, stella, setCohort, setStella };
};

// 전체 state가 필요한 widget용
export const useFullVideoSearch = () => useVideoSearchStore((state) => state);
