import { VideoCategoryBar } from '@/3_features/video-category';

export const Header = () => {
  return (
    <header className="w-full sticky top-0 z-40 bg-[var(--color-bg-primary)]/95 border-b border-[var(--color-border-primary)] backdrop-blur-sm">
      <VideoCategoryBar />
    </header>
  );
};
