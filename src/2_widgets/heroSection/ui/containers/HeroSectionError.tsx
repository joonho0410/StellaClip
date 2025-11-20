import { cn } from '@/5_shared/lib/utils';
import { Container } from '@/5_shared/ui/container';
import { AlertCircleIcon, RefreshCwIcon } from '@/5_shared/svg';

interface HeroSectionErrorProps {
  className?: string;
  error: Error;
  onRetry: () => void;
}

export function HeroSectionError({ className, error, onRetry }: HeroSectionErrorProps) {
  return (
    <section className={cn('py-4 mb-8', className)}>
      <Container size="lg" className="px-4">
        <div className="rounded-lg overflow-hidden shadow-lg h-[400px] bg-red-50 border border-red-200 flex flex-col items-center justify-center space-y-4">
        {/* Error Icon */}
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 text-red-500">
            <AlertCircleIcon />
          </div>
        </div>
        
        {/* Error Message */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-red-800">
            영상을 불러올 수 없습니다
          </h3>
          <p className="text-sm text-red-600 max-w-md">
            {error.message || '네트워크 연결을 확인하고 다시 시도해주세요.'}
          </p>
        </div>

        {/* Retry Button */}
        <button
          onClick={onRetry}
          className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <RefreshCwIcon />
          다시 시도
        </button>
        </div>
      </Container>
    </section>
  );
}