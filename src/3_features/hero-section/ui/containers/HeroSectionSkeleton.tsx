import { cn } from '@/5_shared/lib/utils';
import { Skeleton } from '@/5_shared/ui/skeleton';
import { Card } from '@/5_shared/ui/card';

interface HeroSectionSkeletonProps {
  className?: string;
}

export function HeroSectionSkeleton({ className }: HeroSectionSkeletonProps) {
  return (
    <div
      className={cn(
        'w-full max-w-7xl mx-auto px-2 sm:px-4 py-2 sm:py-4 mb-4 sm:mb-8',
        className
      )}
    >
      <Card variant="elevated" padding="none" className="overflow-hidden">
        <div className="p-3 sm:p-4 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-8 xl:gap-12 items-start">
            {/* Left: Video Player Skeleton */}
            <div className="relative w-full order-1 lg:order-2">
              <div className="relative w-full max-w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] overflow-hidden rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl lg:shadow-2xl">
                <Skeleton className="w-full h-full" />

                {/* Navigation arrows skeleton */}
                <div className="absolute left-1 sm:left-2 lg:left-4 top-1/2 -translate-y-1/2 z-20">
                  <Skeleton
                    variant="circular"
                    width={28}
                    height={28}
                    className="sm:w-10 sm:h-10 lg:w-12 lg:h-12"
                  />
                </div>
                <div className="absolute right-1 sm:right-2 lg:right-4 top-1/2 -translate-y-1/2 z-20">
                  <Skeleton
                    variant="circular"
                    width={28}
                    height={28}
                    className="sm:w-10 sm:h-10 lg:w-12 lg:h-12"
                  />
                </div>
              </div>
            </div>

            {/* Right: Video Details Skeleton (hidden on mobile) */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <div className="space-y-4">
                {/* Badge skeleton */}
                <Skeleton width={120} height={28} className="rounded-full" />

                {/* Title skeleton */}
                <div className="space-y-3">
                  <Skeleton height={48} className="w-full" />
                  <Skeleton height={48} className="w-4/5" />
                </div>

                {/* Description skeleton */}
                <div className="space-y-2">
                  <Skeleton height={20} className="w-full" />
                  <Skeleton height={20} className="w-full" />
                  <Skeleton height={20} className="w-3/4" />
                </div>
              </div>

              {/* Channel Info Skeleton */}
              <div className="p-4 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border-primary)]">
                <div className="flex items-center gap-4">
                  <Skeleton variant="circular" width={48} height={48} />
                  <div className="flex-1 space-y-2">
                    <Skeleton height={20} width="60%" />
                    <Skeleton height={16} width="40%" />
                  </div>
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex gap-3 sm:gap-4">
                <Skeleton height={40} className="flex-1 rounded-lg sm:h-12" />
                <Skeleton height={40} className="flex-1 rounded-lg sm:h-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail navigation skeleton - positioned at bottom */}
        <div className="px-3 sm:px-4 lg:px-8 pb-3 sm:pb-4 lg:pb-8 hidden sm:block">
          <div className="mt-3 sm:mt-4 lg:mt-8 pt-3 sm:pt-4 lg:pt-8 border-t border-[var(--color-border-primary)]">
            <div className="bg-[var(--color-bg-tertiary)] backdrop-blur-sm rounded-lg p-2 sm:p-3 lg:p-4 w-full border border-[var(--color-border-primary)]">
              <div className="flex justify-center space-x-1 sm:space-x-2">
                {[...Array(5)].map((_, index) => (
                  <Skeleton
                    key={index}
                    width={75}
                    height={50}
                    className="rounded-md sm:rounded-lg sm:w-[90px] sm:h-[60px] lg:w-[120px] lg:h-[80px] flex-shrink-0"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
