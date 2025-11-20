'use client';

import React from 'react';
import { ContentSection } from '@/5_shared/ui/content-section';
import { ContainerHeroSection } from '@/2_widgets/heroSection';
import { SearchListGrid } from '@/2_widgets/search';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <ContainerHeroSection />
      <ContentSection title="Clip Videos" icon="🧷">
        <SearchListGrid />
      </ContentSection>
    </div>
  );
}
