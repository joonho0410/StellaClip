'use client';

import Image from 'next/image';
import { cn } from '@/5_shared/lib/utils';
import type { VideoWithDetails } from '@/4_entities/video/api';

interface DescriptionSectionProps {
  video: VideoWithDetails;
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
        <p className="text-md text-[var(--color-text-secondary)] leading-relaxed">
          {video.description}
        </p>
      </div>

      {/* Channel Information */}
      <div className="flex items-center gap-4 p-4 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border-primary)]">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-[var(--color-bg-tertiary)]">
          {video.user?.avatarUrl && (
            <Image
              src={video.user.avatarUrl}
              alt={video.user.username || 'Channel'}
              fill
              className="object-cover"
              sizes="48px"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[var(--color-text-primary)] truncate">
            {video.user?.username || video.user?.fullName}
          </h3>
          <p className="text-sm text-[var(--color-text-tertiary)]">
            {video.views?.toLocaleString()} views •{' '}
            {video.createdAt
              ? new Date(video.createdAt).toLocaleDateString()
              : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
