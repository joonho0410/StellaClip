'use client';

import React from 'react';
import { ContentSection } from '@/5_shared/ui/content-section';
import { ContainerHeroSection } from '@/2_widgets/heroSection';
import { ContainerSearch } from '@/2_widgets/search';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <ContainerHeroSection />

      <ContentSection
        title="Clip Videos"
        icon="🧷"
        showLoadMoreButton={true}
        loadMoreLabel="더 많은 콘텐츠 보기"
        onLoadMore={() => {
          // TODO: Implement load more functionality
          console.log('Load more clicked');
        }}
      >
        <ContainerSearch />
      </ContentSection>
    </div>
  );
}
