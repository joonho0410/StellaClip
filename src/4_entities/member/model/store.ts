import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { GenType, AllMember } from '../types';

// Category 관련 타입들
export type CategoryGen = GenType | 'ALL';
export type CategoryStella = AllMember | 'ALL';

interface MemberState {
  // 선택된 기수
  selectedGeneration: CategoryGen;

  // 선택된 멤버
  selectedMember: CategoryStella;

  // Actions
  setSelectedGeneration: (gen: CategoryGen) => void;
  setSelectedMember: (member: CategoryStella) => void;
}

export const useMemberStore = create<MemberState>()(
  immer<MemberState>((set) => ({
    selectedGeneration: 'ALL',
    selectedMember: 'ALL',

    setSelectedGeneration: (gen: CategoryGen) => {
      set((state) => {
        state.selectedGeneration = gen;
        // gen이 변경되면 selectedMember를 'ALL'로 리셋
        state.selectedMember = 'ALL';
      });
    },

    setSelectedMember: (member: CategoryStella) => {
      set((state) => {
        state.selectedMember = member;
      });
    },
  }))
);

// 기존 API와 호환성을 위한 훅들
export const useSelectedGen = () => {
  const gen = useMemberStore((state) => state.selectedGeneration);
  return gen;
};

export const useSelectedStella = () => {
  const stella = useMemberStore((state) => state.selectedMember);
  return stella;
};

export const useCategoryActions = () => {
  const setGen = useMemberStore((state) => state.setSelectedGeneration);
  const setStella = useMemberStore((state) => state.setSelectedMember);
  const reset = () => {
    setGen('ALL');
    setStella('ALL');
  };

  return {
    setGen,
    setStella,
    reset,
  };
};
