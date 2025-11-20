'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export function useHandleURLQuery() {
  // TODO: Next.js의 useSearchParams, useRouter, usePathname를 사용하여 현재 URL 정보를 가져오세요
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  /**
   * 특정 쿼리 파라미터 값 읽기 (1개)
   *
   * 힌트: searchParams.get(key)를 사용하세요
   */
  const getQuery = useCallback(
    (key: string): string | null => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  /**
   * 모든 쿼리 파라미터를 객체로 반환
   *
   * 힌트: searchParams.forEach()를 사용하여 모든 파라미터를 순회하세요
   */
  const getAllQueries = useCallback((): Record<string, string> => {
    if (!searchParams) return {};

    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return params;
  }, [searchParams]);

  /**
   * URL을 업데이트하는 내부 헬퍼 함수
   *
   * 힌트: router.push()를 사용하여 새로운 URL로 이동하세요
   */
  const updateURL = useCallback(
    (newParams: URLSearchParams) => {
      const queryString = newParams.toString();
      let newURL = pathname;
      router.push(newURL + '?' + queryString);
    },
    [pathname, router]
  );

  /**
   * 단일 쿼리 파라미터 설정/업데이트
   * value가 null 또는 undefined이면 해당 파라미터 제거
   *
   * 힌트:
   * - new URLSearchParams(searchParams.toString())로 새로운 URLSearchParams 생성
   * - newParams.set(key, value) 또는 newParams.delete(key) 사용
   */
  const setQuery = useCallback(
    (key: string, value: string | number | boolean | null | undefined) => {
      if (!searchParams) return;

      // TODO: 현재 searchParams를 복사하여 새로운 URLSearchParams 객체를 만드세요
      const newParams = new URLSearchParams(searchParams);

      // TODO: value가 null, undefined, 또는 빈 문자열이면 key를 삭제하고
      //       그렇지 않으면 key-value를 설정하세요
      if (value === null || value === undefined || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }

      updateURL(newParams);
    },
    [searchParams, updateURL]
  );

  /**
   * 여러 쿼리 파라미터를 동시에 설정
   * null/undefined 값은 자동으로 제거됨
   *
   * 힌트: Object.entries(params).forEach()를 사용하여 모든 파라미터를 순회하세요
   */
  const setQueries = useCallback(
    (params: Record<string, string | number | boolean | null | undefined>) => {
      if (!searchParams) return;

      // TODO: 현재 searchParams를 복사하여 새로운 URLSearchParams 객체를 만드세요
      const newParams = new URLSearchParams(searchParams); // 여기를 구현하세요

      // TODO: params 객체의 모든 key-value 쌍을 순회하면서
      //       각 value가 null/undefined/빈 문자열이면 삭제하고
      //       그렇지 않으면 설정하세요
      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });

      updateURL(newParams);
    },
    [searchParams, updateURL]
  );

  /**
   * 특정 쿼리 파라미터 제거
   *
   * 힌트: newParams.delete(key)를 사용하세요
   */
  const removeQuery = useCallback(
    (key: string) => {
      if (!searchParams) return;

      // TODO: 현재 searchParams를 복사하여 새로운 URLSearchParams 객체를 만드세요
      const newParams = new URLSearchParams(searchParams); // 여기를 구현하세요

      // TODO: key에 해당하는 파라미터를 삭제하세요
      if (newParams.has(key)) newParams.delete(key);
      updateURL(newParams);
    },
    [searchParams, updateURL]
  );

  /**
   * 여러 쿼리 파라미터를 동시에 제거
   *
   * 힌트: keys.forEach()를 사용하여 각 key를 삭제하세요
   */
  const removeQueries = useCallback(
    (keys: string[]) => {
      if (!searchParams) return;

      // TODO: 현재 searchParams를 복사하여 새로운 URLSearchParams 객체를 만드세요
      const newParams = new URLSearchParams(searchParams); // 여기를 구현하세요

      // TODO: keys 배열의 모든 key를 순회하면서 삭제하세요
      keys.forEach((key) => newParams.delete(key));

      updateURL(newParams);
    },
    [searchParams, updateURL]
  );

  /**
   * 모든 쿼리 파라미터 제거
   *
   * 힌트: pathname만으로 router.push()를 호출하세요
   */
  const clearQueries = useCallback(() => {
    // TODO: 쿼리 파라미터 없이 pathname만으로 이동하세요
    router.push(pathname);
  }, [pathname, router]);

  /**
   * 특정 쿼리 파라미터가 존재하는지 확인
   *
   * 힌트: searchParams.has(key)를 사용하세요
   */
  const hasQuery = useCallback(
    (key: string): boolean => {
      if (!searchParams) return false;
      return searchParams.has(key);
    },
    [searchParams]
  );

  return {
    // Read operations
    getQuery,
    getAllQueries,
    hasQuery,

    // Write operations
    setQuery,
    setQueries,

    // Delete operations
    removeQuery,
    removeQueries,
    clearQueries,
  };
}

/**
 * 타입 안전한 쿼리 파라미터 관리를 위한 제네릭 버전
 *
 * @example
 * ```tsx
 * type SearchParams = {
 *   stella: string;
 *   isOfficial: 'true' | 'false';
 *   page: string;
 * };
 *
 * const query = useTypedURLQuery<SearchParams>();
 * const stella = query.getQuery('stella'); // string | null
 * query.setQuery('isOfficial', 'true'); // 타입 체크됨
 * ```
 */
export function useTypedURLQuery<T extends Record<string, string>>() {
  const hooks = useHandleURLQuery();

  return {
    getQuery: (key: keyof T) => hooks.getQuery(key as string),
    getAllQueries: hooks.getAllQueries as () => Partial<T>,
    hasQuery: (key: keyof T) => hooks.hasQuery(key as string),
    setQuery: <K extends keyof T>(key: K, value: T[K] | null | undefined) =>
      hooks.setQuery(key as string, value),
    setQueries: (params: Partial<T>) =>
      hooks.setQueries(params as Record<string, string>),
    removeQuery: (key: keyof T) => hooks.removeQuery(key as string),
    removeQueries: (keys: (keyof T)[]) => hooks.removeQueries(keys as string[]),
    clearQueries: hooks.clearQueries,
  };
}
