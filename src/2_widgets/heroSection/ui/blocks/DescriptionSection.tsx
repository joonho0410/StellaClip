'use client';

import { cn } from '@/5_shared/lib/utils';
import type { VideoItem } from '@/4_entities/video/types';

interface DescriptionSectionProps {
  video: VideoItem;
  className?: string;
}

export function DescriptionSection({
  video,
  className,
}: DescriptionSectionProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="space-y-4">
        {/* Brand Badge */}
        <div className="inline-flex items-center px-3 py-1 bg-[var(--color-accent-tint)] text-[var(--color-accent)] text-sm font-medium rounded-full">
          🎬 공식 채널
        </div>

        {/* Video Title */}
        <h1 className="text-xl lg:text-4xl font-bold text-[var(--color-text-primary)] leading-tight">
          {video.title}
        </h1>

        {/* Video Description */}
        <div className="hidden @lg:block">
          <p className="text-md text-[var(--color-text-secondary)] leading-relaxed line-clamp-2">
            {video.description}
          </p>
        </div>
      </div>

      {/* Channel Information */}
      <div className="flex items-center gap-4 p-4 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border-primary)]">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-[var(--color-bg-tertiary)]">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {video.channelTitle?.charAt(0) || 'C'}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[var(--color-text-primary)] truncate">
            {video.channelTitle}
          </h3>
          <p className="text-sm text-[var(--color-text-tertiary)]">
            {new Date(video.publishedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
