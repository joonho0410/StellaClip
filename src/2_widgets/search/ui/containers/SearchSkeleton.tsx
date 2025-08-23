import { cn } from '@/5_shared/lib/utils';
import { Container } from '@/5_shared/ui/container';

interface SearchSkeletonProps {
  className?: string;
}

export function SearchSkeleton({ className }: SearchSkeletonProps) {
  return (
    <section className={cn('py-2 sm:py-4 mb-4 sm:mb-8', className)}>
      <Container size="xl" className="px-2 sm:px-4">
        <div className="grid grid-cols-1 @2xl:grid-cols-3 @5xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="bg-[var(--color-bg-secondary)] rounded-lg overflow-hidden animate-pulse">
              {/* Thumbnail skeleton */}
              <div className="aspect-video bg-[var(--color-bg-tertiary)]" />
              
              {/* Content skeleton */}
              <div className="p-4 space-y-3">
                <div className="flex gap-3">
                  {/* Avatar skeleton */}
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 bg-[var(--color-bg-tertiary)] rounded-full" />
                  </div>
                  
                  {/* Video info skeleton */}
                  <div className="flex-1 min-w-0 space-y-2">
                    {/* Title skeleton */}
                    <div className="space-y-1">
                      <div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-full" />
                      <div className="h-4 bg-[var(--color-bg-tertiary)] rounded w-3/4" />
                    </div>
                    
                    {/* Channel name skeleton */}
                    <div className="h-3 bg-[var(--color-bg-tertiary)] rounded w-1/2" />
                    
                    {/* Metadata skeleton */}
                    <div className="h-3 bg-[var(--color-bg-tertiary)] rounded w-2/3" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}