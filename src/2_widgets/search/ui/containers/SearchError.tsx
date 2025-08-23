import { cn } from '@/5_shared/lib/utils';
import { Container } from '@/5_shared/ui/container';
import { Button } from '@/5_shared/ui/button';
import { Text } from '@/5_shared/ui/typography';

interface SearchErrorProps {
  className?: string;
  error: Error;
  onRetry: () => void;
}

export function SearchError({ className, error, onRetry }: SearchErrorProps) {
  return (
    <section className={cn('py-2 sm:py-4 mb-4 sm:mb-8', className)}>
      <Container size="xl" className="px-2 sm:px-4">
        <div className="rounded-lg overflow-hidden shadow-lg h-[400px] bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] flex flex-col items-center justify-center space-y-4">
          {/* Error Icon */}
          <div className="w-16 h-16 bg-[var(--color-bg-tertiary)] rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-[var(--color-text-tertiary)]" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v-2h-2v2zm0-4h2V7h-2v6z"/>
            </svg>
          </div>
          
          {/* Error Message */}
          <div className="text-center space-y-2">
            <Text size="large" className="font-semibold text-[var(--color-text-primary)]">
              검색 결과를 불러올 수 없습니다
            </Text>
            <Text size="small" color="tertiary" className="max-w-md">
              {error.message || '네트워크 연결을 확인하고 다시 시도해주세요.'}
            </Text>
          </div>

          {/* Retry Button */}
          <Button
            variant="secondary"
            onClick={onRetry}
            className="inline-flex items-center gap-2"
          >
            <svg 
              className="w-4 h-4" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
            다시 시도
          </Button>
        </div>
      </Container>
    </section>
  );
}