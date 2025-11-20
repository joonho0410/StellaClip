import { cn } from '@/5_shared/lib/utils';
import { Container } from '@/5_shared/ui/container';
import { Button } from '@/5_shared/ui/button';
import { Text } from '@/5_shared/ui/typography';
import { AlertCircleIcon, RefreshCwIcon } from '@/5_shared/svg';

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
            <div className="w-8 h-8 text-[var(--color-text-tertiary)]">
              <AlertCircleIcon />
            </div>
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
            <RefreshCwIcon />
            다시 시도
          </Button>
        </div>
      </Container>
    </section>
  );
}