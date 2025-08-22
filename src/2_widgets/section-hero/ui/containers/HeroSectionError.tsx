import { cn } from '@/5_shared/lib/utils';
import { Container } from '@/5_shared/ui/container';

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
          <svg 
            className="w-8 h-8 text-red-500" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            <path d="M11 7h2v6h-2V7zm0 8h2v2h-2v-2z"/>
          </svg>
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
          <svg 
            className="w-4 h-4 mr-2" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
          </svg>
          다시 시도
        </button>
        </div>
      </Container>
    </section>
  );
}