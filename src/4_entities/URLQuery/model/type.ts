export type CohortType = 'ALL' | 'Mystic' | 'Universe' | 'Cliche';
export type StellaType = 'ALL' | 'yuni' | 'lyn';
export type VideoSortType = 'Date';

export interface VideoSearchParameterType {
  cohort: CohortType;
  stella: StellaType;
  page: number;
  sort?: VideoSortType;
}
