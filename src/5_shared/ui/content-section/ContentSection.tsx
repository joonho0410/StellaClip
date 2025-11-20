import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface ContentSectionProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  showLoadMoreButton?: boolean;
  loadMoreLabel?: string;
  onLoadMore?: () => void;
}

export function ContentSection({
  title,
  icon,
  children,
  className,
  containerClassName,
  showLoadMoreButton = false,
  loadMoreLabel = "더 많은 콘텐츠 보기",
  onLoadMore,
}: ContentSectionProps) {
  return (
    <section className={cn("pb-16", className)}>
      <div className={cn("container mx-auto px-4", containerClassName)}>
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8">
          {icon && <span className="text-2xl">{icon}</span>}
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
            {title}
          </h2>
          <div className="flex-1 h-px bg-[var(--color-border-primary)]" />
        </div>

        {/* Content */}
        {children}

        {/* Load More Button */}
        {showLoadMoreButton && (
          <div className="text-center mt-12">
            <button
              onClick={onLoadMore}
              className="inline-flex items-center px-6 py-3 bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] text-base font-medium rounded-lg transition-colors duration-200 border border-[var(--color-border-primary)]"
            >
              {loadMoreLabel}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}