'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export interface QueryParams {
  search?: string;
  cohort?: string;
  member?: string;
  page?: string;
}

export type QueryParamKey = keyof QueryParams;

export function useQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // 현재 쿼리 파라미터 객체로 변환
  const queryParams = useMemo<QueryParams>(() => {
    return {
      search: searchParams.get('search') || undefined,
      cohort: searchParams.get('cohort') || 'ALL',
      member: searchParams.get('member') || undefined,
      page: searchParams.get('page') || '1',
    };
  }, [searchParams]);

  // 쿼리 파라미터 업데이트 함수
  const updateQueryParams = useCallback((
    updates: Partial<QueryParams>,
    options?: { replace?: boolean; scroll?: boolean }
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // 업데이트할 파라미터 적용
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // 새로운 URL 생성
    const newUrl = `${pathname}?${params.toString()}`;
    
    // 라우터 업데이트
    if (options?.replace) {
      router.replace(newUrl, { scroll: options.scroll ?? true });
    } else {
      router.push(newUrl, { scroll: options.scroll ?? true });
    }
  }, [searchParams, pathname, router]);

  // 특정 파라미터 설정
  const setQueryParam = useCallback((
    key: QueryParamKey, 
    value: string | undefined,
    options?: { replace?: boolean; scroll?: boolean }
  ) => {
    updateQueryParams({ [key]: value }, options);
  }, [updateQueryParams]);

  // 특정 파라미터 제거
  const removeQueryParam = useCallback((
    key: QueryParamKey,
    options?: { replace?: boolean; scroll?: boolean }
  ) => {
    updateQueryParams({ [key]: undefined }, options);
  }, [updateQueryParams]);

  // 모든 파라미터 초기화
  const clearQueryParams = useCallback((
    options?: { replace?: boolean; scroll?: boolean }
  ) => {
    if (options?.replace) {
      router.replace(pathname, { scroll: options.scroll ?? true });
    } else {
      router.push(pathname, { scroll: options.scroll ?? true });
    }
  }, [pathname, router]);

  // URL 쿼리 스트링 생성
  const buildQuery = useCallback((params: Partial<QueryParams>) => {
    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        urlParams.set(key, value);
      }
    });
    return urlParams.toString();
  }, []);

  return {
    queryParams,
    updateQueryParams,
    setQueryParam,
    removeQueryParam,
    clearQueryParams,
    buildQuery,
  };
}

// Cohort 타입 정의
export type CohortType = 'ALL' | '1기' | '2기' | '3기' | '4기' | '5기';

// Member 타입 정의 (예시)
export type MemberType = 
  | '김철수' | '이영희' | '박민수' | '정수영' 
  | '최진우' | '한소라' | '문대성' | '조은비';

// Query 파라미터 유틸리티 함수들
export const queryUtils = {
  // Cohort 유효성 검사
  isValidCohort: (cohort: string): cohort is CohortType => {
    return ['ALL', '1기', '2기', '3기', '4기', '5기'].includes(cohort);
  },

  // Member 유효성 검사
  isValidMember: (member: string): member is MemberType => {
    const validMembers = [
      '김철수', '이영희', '박민수', '정수영',
      '최진우', '한소라', '문대성', '조은비'
    ];
    return validMembers.includes(member);
  },

  // Page 번호 유효성 검사
  isValidPage: (page: string): boolean => {
    const pageNum = parseInt(page, 10);
    return !isNaN(pageNum) && pageNum > 0;
  },

  // 기본값 적용
  applyDefaults: (params: QueryParams): Required<QueryParams> => {
    return {
      search: params.search || '',
      cohort: queryUtils.isValidCohort(params.cohort || '') ? params.cohort || 'ALL' : 'ALL',
      member: params.member && queryUtils.isValidMember(params.member) ? params.member : '',
      page: queryUtils.isValidPage(params.page || '') ? params.page || '1' : '1',
    };
  },

  // URL에서 쿼리 파라미터 파싱
  parseFromUrl: (url: string): QueryParams => {
    const urlObj = new URL(url);
    return {
      search: urlObj.searchParams.get('search') || undefined,
      cohort: urlObj.searchParams.get('cohort') || 'ALL',
      member: urlObj.searchParams.get('member') || undefined,
      page: urlObj.searchParams.get('page') || '1',
    };
  },
};