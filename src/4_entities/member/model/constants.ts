import type { AllMember, GenType } from '../types';

/**
 * Stella 멤버 정의
 * gen별로 stella 멤버들을 그룹화
 */
export const stellaMembers = {
  Mystic: ['YUNI'],
  Universe: ['HINA', 'TABI', 'LIZE', 'MASHIRO'],
  Cliche: ['RIN', 'NANA', 'RICO', 'BUKI'],
} as const;

export const allMembers = Object.values(stellaMembers).flat() as AllMember[];
export const allGen = Object.keys(stellaMembers) as GenType[];
