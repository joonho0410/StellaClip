import type { StellaQueryType, CohortQueryType, VideoSortType } from './type';

/**
 * URL에서 cohort 파라미터를 안전하게 가져오는 함수
 */
export function getCohortFromUrl(): CohortQueryType {
  if (typeof window === 'undefined') return 'ALL';

  const urlParams = new URLSearchParams(window.location.search);
  const cohort = urlParams.get('cohort');

  // 유효한 cohort 값인지 검증
  const validCohorts: CohortQueryType[] = [
    'ALL',
    'Mystic',
    'Universe',
    'Cliche',
  ];
  if (cohort && validCohorts.includes(cohort as CohortQueryType)) {
    return cohort as CohortQueryType;
  }

  return 'ALL';
}

/**
 * URL에서 stella 파라미터를 안전하게 가져오는 함수
 */
export function getStellaFromUrl(): StellaQueryType {
  if (typeof window === 'undefined') return 'ALL';

  const urlParams = new URLSearchParams(window.location.search);
  const stella = urlParams.get('stella');

  // 유효한 stella 값인지 검증
  const validStella: StellaQueryType[] = [
    'ALL',
    'yuni',
    'lyn',
    'member1',
    'member2',
    'member3',
    'member4',
  ];
  if (stella && validStella.includes(stella as StellaQueryType)) {
    return stella as StellaQueryType;
  }

  return 'ALL';
}

/**
 * URL에서 sort 파라미터를 안전하게 가져오는 함수
 */
export function getSortFromUrl(): VideoSortType | undefined {
  if (typeof window === 'undefined') return undefined;

  const urlParams = new URLSearchParams(window.location.search);
  const sort = urlParams.get('sort');

  // 유효한 sort 값인지 검증
  const validSorts: VideoSortType[] = ['Date'];
  if (sort && validSorts.includes(sort as VideoSortType)) {
    return sort as VideoSortType;
  }

  return undefined;
}

/**
 * URL 파라미터에서 초기 비디오 검색 상태를 가져오는 함수
 */
export function getInitialVideoSearchParams() {
  if (typeof window === 'undefined') {
    return {
      cohort: 'ALL' as CohortQueryType,
      stella: 'ALL' as StellaQueryType,
      page: 1,
      sort: undefined,
      maxResult: 5,
    };
  }

  const urlParams = new URLSearchParams(window.location.search);

  return {
    cohort: getCohortFromUrl(),
    stella: getStellaFromUrl(),
    page: Math.max(1, parseInt(urlParams.get('page') || '1')),
    sort: getSortFromUrl(),
    maxResult: Math.max(
      1,
      Math.min(50, parseInt(urlParams.get('maxResult') || '5'))
    ), // 1-50 사이로 제한
  };
}
