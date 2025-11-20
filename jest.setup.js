// Jest DOM matchers 추가 (toBeInTheDocument 등)
import '@testing-library/jest-dom';

// Global test setup
// 필요한 경우 전역 mocks나 polyfills를 여기에 추가할 수 있습니다

// Next.js router mock (기본 설정)
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));
