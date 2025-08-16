import type { AllMember, GenType } from '@/4_entities/stella';

export type GenQueryType = 'ALL' | GenType;
export type StellaQueryType = 'ALL' | AllMember;

export type VideoSortType = 'Date';

export interface VideoSearchParameterType {
  gen: GenQueryType;
  stella: StellaQueryType;
  page: number;
  sort?: VideoSortType;
  maxResult: number;
}
