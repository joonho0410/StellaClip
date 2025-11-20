const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // next.config.js와 .env 파일이 있는 디렉토리 경로
  dir: './',
});

// Jest에 전달할 커스텀 설정
const customJestConfig = {
  // 각 테스트 전에 실행할 setup 파일
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // 테스트 환경 설정 (jsdom: 브라우저 환경 시뮬레이션)
  testEnvironment: 'jest-environment-jsdom',

  // 모듈 경로 별칭 설정 (tsconfig.json과 동일하게)
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/views/(.*)$': '<rootDir>/src/1_views/$1',
    '^@/widgets/(.*)$': '<rootDir>/src/2_widgets/$1',
    '^@/features/(.*)$': '<rootDir>/src/3_features/$1',
    '^@/entities/(.*)$': '<rootDir>/src/4_entities/$1',
    '^@/shared/(.*)$': '<rootDir>/src/5_shared/$1',
  },

  // 테스트 파일 패턴
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],

  // 커버리지 수집 대상 (node_modules 제외)
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
  ],

  // 테스트에서 제외할 경로
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
  ],

  // 모듈 변환 설정
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};

// next/jest가 Next.js 설정을 로드하여 Jest 설정 생성
module.exports = createJestConfig(customJestConfig);
