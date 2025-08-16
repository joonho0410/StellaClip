import type { StellaQueryType, GenQueryType, VideoSortType } from './type';

/**
 * URL에서 gen 파라미터를 안전하게 가져오는 함수
 */
export function getGenFromUrl(): GenQueryType {
  if (typeof window === 'undefined') return 'ALL';

  const urlParams = new URLSearchParams(window.location.search);
  const gen = urlParams.get('gen');

  // 유효한 gen 값인지 검증
  const validGens: GenQueryType[] = [
    'ALL',
    'Mystic',
    'Universe',
    'Cliche',
  ];
  if (gen && validGens.includes(gen as GenQueryType)) {
    return gen as GenQueryType;
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
      gen: 'ALL' as GenQueryType,
      stella: 'ALL' as StellaQueryType,
      page: 1,
      sort: undefined,
      maxResult: 5,
    };
  }

  const urlParams = new URLSearchParams(window.location.search);

  return {
    gen: getGenFromUrl(),
    stella: getStellaFromUrl(),
    page: Math.max(1, parseInt(urlParams.get('page') || '1')),
    sort: getSortFromUrl(),
    maxResult: Math.max(
      1,
      Math.min(50, parseInt(urlParams.get('maxResult') || '5'))
    ), // 1-50 사이로 제한
  };
}
