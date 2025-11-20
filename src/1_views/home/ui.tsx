'use client';

import React, { Suspense } from 'react';
import { ContentSection } from '@/5_shared/ui/content-section';
import { ContainerHeroSection } from '@/2_widgets/heroSection';
import { SearchListGrid } from '@/2_widgets/search';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Suspense fallback={<div className="h-[400px]" />}>
        <ContainerHeroSection />
      </Suspense>
      <ContentSection title="Clip Videos" icon="🧷">
        <Suspense fallback={<div className="h-[300px]" />}>
          <SearchListGrid />
        </Suspense>
      </ContentSection>
    </div>
  );
}
