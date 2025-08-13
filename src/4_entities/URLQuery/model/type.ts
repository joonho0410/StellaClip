import type { AllMember, CohortType } from '@/4_entities/stella';

export type CohortQueryType = 'ALL' | CohortType;
export type StellaQueryType = 'ALL' | AllMember;

export type VideoSortType = 'Date';

export interface VideoSearchParameterType {
  cohort: CohortQueryType;
  stella: StellaQueryType;
  page: number;
  sort?: VideoSortType;
  maxResult: number;
}
