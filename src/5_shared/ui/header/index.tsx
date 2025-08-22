import { ReactNode } from 'react';

export const Header = ({ children }: { children: ReactNode }) => {
  return (
    <header className="w-full sticky top-0 z-40 bg-[var(--color-bg-primary)]/95 border-b border-[var(--color-border-primary)] backdrop-blur-sm px-6">
      {children}
    </header>
  );
};
