'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // 기본 stale time: 5분
        staleTime: 1000 * 60 * 5,
        // 기본 gc time: 30분
        gcTime: 1000 * 60 * 30,
        // 윈도우 포커스 시 자동 refetch 비활성화
        refetchOnWindowFocus: false,
        // 마운트 시 자동 refetch 활성화
        refetchOnMount: true,
        // 재연결 시 자동 refetch 활성화
        refetchOnReconnect: true,
        // 에러 재시도 설정
        retry: (failureCount, error: unknown) => {
          // 404나 401같은 클라이언트 에러는 재시도하지 않음
          const httpError = error as { status?: number };
          if (httpError?.status && httpError.status >= 400 && httpError.status < 500) {
            return false;
          }
          // 최대 3번까지 재시도
          return failureCount < 3;
        },
        // 재시도 지연 시간 (지수적 백오프)
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
        // 기본 gc time: 5분
        gcTime: 1000 * 60 * 5,
        // 에러 재시도 설정
        retry: (failureCount, error: unknown) => {
          // 클라이언트 에러는 재시도하지 않음
          const httpError = error as { status?: number };
          if (httpError?.status && httpError.status >= 400 && httpError.status < 500) {
            return false;
          }
          // 최대 1번까지 재시도
          return failureCount < 1;
        },
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools 
        initialIsOpen={false}
        buttonPosition="bottom-right"
      />
    </QueryClientProvider>
  );
}

// Hydration을 위한 유틸리티 함수들
export function getQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
      },
    },
  });
  
  return queryClient;
}

// SSR/SSG용 prefetch 헬퍼
export async function prefetchQueries(
  queryClient: QueryClient,
  prefetchFunctions: (() => Promise<unknown>)[]
) {
  await Promise.allSettled(prefetchFunctions.map(fn => fn()));
  return queryClient;
}