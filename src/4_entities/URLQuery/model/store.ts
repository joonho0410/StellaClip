import { create } from 'zustand';

import { updateUrlParams } from '@/shared/lib/query-params';
import type {
  StellaQueryType,
  GenQueryType,
} from '@/4_entities/URLQuery/model/type';
import type {
  VideoSearchParameterType,
  VideoSortType,
} from '@/4_entities/URLQuery/model/type';

interface VideoSearchState extends VideoSearchParameterType {
  setGen: (gen: GenQueryType) => void;
  setStella: (stella: StellaQueryType) => void;
  setPage: (page: number) => void;
  setSort: (sort?: VideoSortType) => void;
  setMaxResult: (maxResult: number) => void;
}

export const useVideoSearchStore = create<VideoSearchState>((set) => ({
  gen: 'ALL',
  stella: 'ALL',
  page: 1,
  sort: undefined,
  maxResult: 5,

  setGen: (gen) => {
    set({ gen });
    updateUrlParams({ gen });
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

// gen과 stella만 필요한 widget용
export const useGenStella = () => {
  const gen = useVideoSearchStore((state) => state.gen);
  const stella = useVideoSearchStore((state) => state.stella);
  const setGen = useVideoSearchStore((state) => state.setGen);
  const setStella = useVideoSearchStore((state) => state.setStella);

  return { gen, stella, setGen, setStella };
};

// 전체 state가 필요한 widget용
export const useFullVideoSearch = () => useVideoSearchStore((state) => state);
