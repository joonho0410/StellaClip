/**
 * URL 쿼리 파라미터 조작을 위한 간단한 유틸리티 함수들
 */

// URL 쿼리 파라미터 업데이트 (클라이언트 사이드 전용)
export function updateUrlParams(params: Record<string, string | number | undefined>) {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  const searchParams = url.searchParams;

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === 'ALL' || value === '') {
      searchParams.delete(key);
    } else {
      searchParams.set(key, value.toString());
    }
  });

  const newUrl = `${url.pathname}?${searchParams.toString()}`;
  window.history.replaceState({}, '', newUrl);
}