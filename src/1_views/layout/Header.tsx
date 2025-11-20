import { Suspense } from 'react';
import { MemberBar } from '@/3_features/selectMember';

export const Header = () => {
  return (
    <header className="w-full sticky top-0 z-40 bg-[var(--color-bg-primary)]/95 border-b border-[var(--color-border-primary)] backdrop-blur-sm">
      <Suspense fallback={<div className="h-14" />}>
        <MemberBar />
      </Suspense>
    </header>
  );
};
