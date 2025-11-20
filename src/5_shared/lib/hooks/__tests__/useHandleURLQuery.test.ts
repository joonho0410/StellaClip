/**
 * useHandleURLQuery Hook 테스트
 *
 * 이 파일은 URL Query Parameter를 관리하는 useHandleURLQuery hook의
 * 모든 기능을 테스트합니다.
 */

import { renderHook, act } from '@testing-library/react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useHandleURLQuery } from '../useHandleURLQuery';

// Next.js navigation hooks를 mock
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('useHandleURLQuery', () => {
  // Mock 함수들
  const mockPush = jest.fn();
  const mockPathname = '/test-page';

  // 각 테스트 전에 mock을 리셋
  beforeEach(() => {
    jest.clearAllMocks();

    // useRouter mock 설정
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    // usePathname mock 설정
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
  });

  /**
   * Helper: URLSearchParams를 mock하는 함수
   */
  const mockSearchParams = (params: Record<string, string>) => {
    const searchParams = new URLSearchParams(params);
    (useSearchParams as jest.Mock).mockReturnValue(searchParams);
  };

  describe('Read Operations', () => {
    describe('getQuery', () => {
      it('should return query parameter value when it exists', () => {
        // Given: URL에 stella=장원영 쿼리가 있음
        mockSearchParams({ stella: '장원영' });

        // When: hook을 렌더링하고 getQuery를 호출
        const { result } = renderHook(() => useHandleURLQuery());

        // Then: 올바른 값을 반환해야 함
        expect(result.current.getQuery('stella')).toBe('장원영');
      });

      it('should return null when query parameter does not exist', () => {
        // Given: 빈 쿼리 파라미터
        mockSearchParams({});

        // When: hook을 렌더링하고 존재하지 않는 쿼리 조회
        const { result } = renderHook(() => useHandleURLQuery());

        // Then: null을 반환해야 함
        expect(result.current.getQuery('nonexistent')).toBeNull();
      });

      it('should handle multiple query parameters', () => {
        // Given: 여러 쿼리 파라미터가 있음
        mockSearchParams({
          stella: '장원영',
          page: '1',
          isOfficial: 'true',
        });

        // When: 각 쿼리를 조회
        const { result } = renderHook(() => useHandleURLQuery());

        // Then: 모든 값이 올바르게 반환되어야 함
        expect(result.current.getQuery('stella')).toBe('장원영');
        expect(result.current.getQuery('page')).toBe('1');
        expect(result.current.getQuery('isOfficial')).toBe('true');
      });
    });

    describe('getAllQueries', () => {
      it('should return all query parameters as an object', () => {
        // Given: 여러 쿼리 파라미터가 있음
        mockSearchParams({
          stella: '장원영',
          page: '1',
          isOfficial: 'true',
        });

        // When: getAllQueries를 호출
        const { result } = renderHook(() => useHandleURLQuery());

        // Then: 모든 쿼리를 객체로 반환해야 함
        expect(result.current.getAllQueries()).toEqual({
          stella: '장원영',
          page: '1',
          isOfficial: 'true',
        });
      });

      it('should return empty object when no query parameters exist', () => {
        // Given: 빈 쿼리 파라미터
        mockSearchParams({});

        // When: getAllQueries를 호출
        const { result } = renderHook(() => useHandleURLQuery());

        // Then: 빈 객체를 반환해야 함
        expect(result.current.getAllQueries()).toEqual({});
      });
    });

    describe('hasQuery', () => {
      it('should return true when query parameter exists', () => {
        // Given: stella 쿼리가 있음
        mockSearchParams({ stella: '장원영' });

        // When: hasQuery를 호출
        const { result } = renderHook(() => useHandleURLQuery());

        // Then: true를 반환해야 함
        expect(result.current.hasQuery('stella')).toBe(true);
      });

      it('should return false when query parameter does not exist', () => {
        // Given: 빈 쿼리 파라미터
        mockSearchParams({});

        // When: hasQuery를 호출
        const { result } = renderHook(() => useHandleURLQuery());

        // Then: false를 반환해야 함
        expect(result.current.hasQuery('stella')).toBe(false);
      });
    });
  });

  describe('Write Operations', () => {
    describe('setQuery', () => {
      it('should add a new query parameter', () => {
        // Given: 빈 쿼리 파라미터
        mockSearchParams({});

        // When: 새로운 쿼리를 추가
        const { result } = renderHook(() => useHandleURLQuery());
        act(() => {
          result.current.setQuery('stella', '장원영');
        });

        // Then: router.push가 올바른 URL로 호출되어야 함
        expect(mockPush).toHaveBeenCalledWith('/test-page?stella=%EC%9E%A5%EC%9B%90%EC%98%81');
      });

      it('should update existing query parameter', () => {
        // Given: 기존 쿼리가 있음
        mockSearchParams({ stella: '안유진' });

        // When: 쿼리를 업데이트
        const { result } = renderHook(() => useHandleURLQuery());
        act(() => {
          result.current.setQuery('stella', '장원영');
        });

        // Then: 업데이트된 URL로 router.push가 호출되어야 함
        expect(mockPush).toHaveBeenCalledWith('/test-page?stella=%EC%9E%A5%EC%9B%90%EC%98%81');
      });

      it('should remove query parameter when value is null', () => {
        // Given: 기존 쿼리가 있음
        mockSearchParams({ stella: '장원영', page: '1' });

        // When: null 값으로 setQuery 호출
        const { result } = renderHook(() => useHandleURLQuery());
        act(() => {
          result.current.setQuery('stella', null);
        });

        // Then: stella가 제거된 URL로 router.push가 호출되어야 함
        expect(mockPush).toHaveBeenCalledWith('/test-page?page=1');
      });

      it('should remove query parameter when value is undefined', () => {
        // Given: 기존 쿼리가 있음
        mockSearchParams({ stella: '장원영', page: '1' });

        // When: undefined 값으로 setQuery 호출
        const { result } = renderHook(() => useHandleURLQuery());
        act(() => {
          result.current.setQuery('stella', undefined);
        });

        // Then: stella가 제거된 URL로 router.push가 호출되어야 함
        expect(mockPush).toHaveBeenCalledWith('/test-page?page=1');
      });

      it('should remove query parameter when value is empty string', () => {
        // Given: 기존 쿼리가 있음
        mockSearchParams({ stella: '장원영', page: '1' });

        // When: 빈 문자열로 setQuery 호출
        const { result } = renderHook(() => useHandleURLQuery());
        act(() => {
          result.current.setQuery('stella', '');
        });

        // Then: stella가 제거된 URL로 router.push가 호출되어야 함
        expect(mockPush).toHaveBeenCalledWith('/test-page?page=1');
      });

      it('should handle number values', () => {
        // Given: 빈 쿼리 파라미터
        mockSearchParams({});

        // When: 숫자 값으로 setQuery 호출
        const { result } = renderHook(() => useHandleURLQuery());
        act(() => {
          result.current.setQuery('page', 1);
        });

        // Then: 숫자가 문자열로 변환되어 URL에 추가되어야 함
        expect(mockPush).toHaveBeenCalledWith('/test-page?page=1');
      });

      it('should handle boolean values', () => {
        // Given: 빈 쿼리 파라미터
        mockSearchParams({});

        // When: boolean 값으로 setQuery 호출
        const { result } = renderHook(() => useHandleURLQuery());
        act(() => {
          result.current.setQuery('isOfficial', true);
        });

        // Then: boolean이 문자열로 변환되어 URL에 추가되어야 함
        expect(mockPush).toHaveBeenCalledWith('/test-page?isOfficial=true');
      });
    });

    describe('setQueries', () => {
      it('should set multiple query parameters at once', () => {
        // Given: 빈 쿼리 파라미터
        mockSearchParams({});

        // When: 여러 쿼리를 동시에 설정
        const { result } = renderHook(() => useHandleURLQuery());
        act(() => {
          result.current.setQueries({
            stella: '장원영',
            page: '1',
            isOfficial: 'true',
          });
        });

        // Then: 모든 쿼리가 포함된 URL로 router.push가 호출되어야 함
        expect(mockPush).toHaveBeenCalledWith(
          expect.stringContaining('stella=%EC%9E%A5%EC%9B%90%EC%98%81')
        );
        expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('page=1'));
        expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('isOfficial=true'));
      });

      it('should handle null values by removing those parameters', () => {
        // Given: 기존 쿼리가 있음
        mockSearchParams({
          stella: '장원영',
          page: '1',
          isOfficial: 'true',
        });

        // When: 일부 값을 null로 설정
        const { result } = renderHook(() => useHandleURLQuery());
        act(() => {
          result.current.setQueries({
            stella: null,
            page: '2',
          });
        });

        // Then: null 값은 제거되고 나머지는 유지되어야 함
        const url = mockPush.mock.calls[0][0];
        expect(url).toContain('page=2');
        expect(url).toContain('isOfficial=true');
        expect(url).not.toContain('stella');
      });
    });
  });

  describe('Delete Operations', () => {
    describe('removeQuery', () => {
      it('should remove a single query parameter', () => {
        // Given: 여러 쿼리가 있음
        mockSearchParams({
          stella: '장원영',
          page: '1',
        });

        // When: 하나의 쿼리를 제거
        const { result } = renderHook(() => useHandleURLQuery());
        act(() => {
          result.current.removeQuery('stella');
        });

        // Then: stella가 제거된 URL로 router.push가 호출되어야 함
        expect(mockPush).toHaveBeenCalledWith('/test-page?page=1');
      });

      it('should not fail when removing non-existent query', () => {
        // Given: 쿼리가 있음
        mockSearchParams({ stella: '장원영' });

        // When: 존재하지 않는 쿼리를 제거 시도
        const { result } = renderHook(() => useHandleURLQuery());
        act(() => {
          result.current.removeQuery('nonexistent');
        });

        // Then: 기존 쿼리는 유지되어야 함
        expect(mockPush).toHaveBeenCalledWith('/test-page?stella=%EC%9E%A5%EC%9B%90%EC%98%81');
      });
    });

    describe('removeQueries', () => {
      it('should remove multiple query parameters at once', () => {
        // Given: 여러 쿼리가 있음
        mockSearchParams({
          stella: '장원영',
          page: '1',
          isOfficial: 'true',
        });

        // When: 여러 쿼리를 동시에 제거
        const { result } = renderHook(() => useHandleURLQuery());
        act(() => {
          result.current.removeQueries(['stella', 'page']);
        });

        // Then: 지정된 쿼리들이 제거된 URL로 router.push가 호출되어야 함
        expect(mockPush).toHaveBeenCalledWith('/test-page?isOfficial=true');
      });

      it('should handle empty array', () => {
        // Given: 쿼리가 있음
        mockSearchParams({ stella: '장원영' });

        // When: 빈 배열로 removeQueries 호출
        const { result } = renderHook(() => useHandleURLQuery());
        act(() => {
          result.current.removeQueries([]);
        });

        // Then: 기존 쿼리는 유지되어야 함
        expect(mockPush).toHaveBeenCalledWith('/test-page?stella=%EC%9E%A5%EC%9B%90%EC%98%81');
      });
    });

    describe('clearQueries', () => {
      it('should remove all query parameters', () => {
        // Given: 여러 쿼리가 있음
        mockSearchParams({
          stella: '장원영',
          page: '1',
          isOfficial: 'true',
        });

        // When: 모든 쿼리를 제거
        const { result } = renderHook(() => useHandleURLQuery());
        act(() => {
          result.current.clearQueries();
        });

        // Then: 쿼리 없이 pathname만 있는 URL로 router.push가 호출되어야 함
        expect(mockPush).toHaveBeenCalledWith('/test-page');
      });

      it('should work when no query parameters exist', () => {
        // Given: 빈 쿼리 파라미터
        mockSearchParams({});

        // When: clearQueries 호출
        const { result } = renderHook(() => useHandleURLQuery());
        act(() => {
          result.current.clearQueries();
        });

        // Then: pathname만 있는 URL로 router.push가 호출되어야 함
        expect(mockPush).toHaveBeenCalledWith('/test-page');
      });
    });
  });

  describe('Integration Tests', () => {
    it('should handle complex query parameter operations', () => {
      // Given: 초기 쿼리가 있음
      mockSearchParams({ stella: '안유진', page: '1' });

      // When: 복잡한 연속 작업 수행
      const { result } = renderHook(() => useHandleURLQuery());

      // 1. 쿼리 추가
      act(() => {
        result.current.setQuery('isOfficial', 'true');
      });

      // 2. 쿼리 업데이트
      act(() => {
        result.current.setQuery('stella', '장원영');
      });

      // 3. 쿼리 제거
      act(() => {
        result.current.removeQuery('page');
      });

      // Then: 각 작업마다 router.push가 호출되어야 함
      expect(mockPush).toHaveBeenCalledTimes(3);
    });

    it('should preserve other query parameters when updating one', () => {
      // Given: 여러 쿼리가 있음
      mockSearchParams({
        stella: '장원영',
        page: '1',
        sort: 'latest',
      });

      // When: 하나의 쿼리만 업데이트
      const { result } = renderHook(() => useHandleURLQuery());
      act(() => {
        result.current.setQuery('page', '2');
      });

      // Then: 다른 쿼리들은 유지되어야 함
      const url = mockPush.mock.calls[0][0];
      expect(url).toContain('stella=%EC%9E%A5%EC%9B%90%EC%98%81');
      expect(url).toContain('page=2');
      expect(url).toContain('sort=latest');
    });
  });

  describe('Single Value Guarantee (No Multi-Value Support)', () => {
    it('should replace existing value when setting same key multiple times', () => {
      // Given: q1=value1 쿼리가 있음
      const searchParams = new URLSearchParams();
      searchParams.append('q1', 'value1');
      (useSearchParams as jest.Mock).mockReturnValue(searchParams);

      // When: 같은 key로 다시 setQuery 호출
      const { result } = renderHook(() => useHandleURLQuery());
      act(() => {
        result.current.setQuery('q1', 'value2');
      });

      // Then: 마지막 값으로 덮어씌워져야 함 (multi-value가 아님)
      const url = mockPush.mock.calls[0][0];
      expect(url).toBe('/test-page?q1=value2');
      expect(url).not.toContain('value1');
    });

    it('should only return first value when multiple values exist for same key', () => {
      // Given: URLSearchParams에 같은 key로 여러 값이 있음 (수동으로 생성)
      const searchParams = new URLSearchParams();
      searchParams.append('q1', 'first');
      searchParams.append('q1', 'second');
      searchParams.append('q1', 'third');
      (useSearchParams as jest.Mock).mockReturnValue(searchParams);

      // When: getQuery로 값 조회
      const { result } = renderHook(() => useHandleURLQuery());

      // Then: 첫 번째 값만 반환되어야 함 (URLSearchParams.get의 기본 동작)
      expect(result.current.getQuery('q1')).toBe('first');
    });

    it('should handle getAllQueries with duplicate keys by keeping last value', () => {
      // Given: 같은 key로 여러 값이 있는 URLSearchParams
      const searchParams = new URLSearchParams();
      searchParams.append('q1', 'first');
      searchParams.append('q1', 'second');
      searchParams.append('other', 'value');
      (useSearchParams as jest.Mock).mockReturnValue(searchParams);

      // When: getAllQueries 호출
      const { result } = renderHook(() => useHandleURLQuery());
      const allQueries = result.current.getAllQueries();

      // Then: forEach는 마지막 값을 유지함
      // URLSearchParams.forEach는 모든 항목을 순회하므로 마지막 값으로 덮어씌워짐
      expect(allQueries.q1).toBe('second');
      expect(allQueries.other).toBe('value');
    });

    it('should prevent multi-value by using set instead of append', () => {
      // Given: 빈 쿼리
      mockSearchParams({});

      // When: setQuery를 여러 번 호출 (같은 key)
      const { result } = renderHook(() => useHandleURLQuery());

      act(() => {
        result.current.setQuery('filter', 'value1');
      });

      // 다시 mockSearchParams 업데이트 (첫 번째 setQuery 결과 반영)
      const updatedParams = new URLSearchParams();
      updatedParams.set('filter', 'value1');
      (useSearchParams as jest.Mock).mockReturnValue(updatedParams);

      act(() => {
        result.current.setQuery('filter', 'value2');
      });

      // Then: 마지막 호출의 URL에는 value2만 있어야 함
      const lastCallUrl = mockPush.mock.calls[mockPush.mock.calls.length - 1][0];
      expect(lastCallUrl).toBe('/test-page?filter=value2');

      // URL에 filter가 한 번만 나타나야 함
      const filterCount = (lastCallUrl.match(/filter=/g) || []).length;
      expect(filterCount).toBe(1);
    });

    it('should not create duplicate keys when using setQueries', () => {
      // Given: 기존 쿼리가 있음
      mockSearchParams({ filter: 'old' });

      // When: setQueries로 같은 key를 업데이트
      const { result } = renderHook(() => useHandleURLQuery());
      act(() => {
        result.current.setQueries({
          filter: 'new',
          page: '1',
        });
      });

      // Then: filter는 한 번만 나타나야 함
      const url = mockPush.mock.calls[0][0];
      const filterCount = (url.match(/filter=/g) || []).length;
      expect(filterCount).toBe(1);
      expect(url).toContain('filter=new');
      expect(url).not.toContain('filter=old');
    });
  });
});
