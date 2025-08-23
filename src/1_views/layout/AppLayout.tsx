'use client';

import { QueryProvider } from '@/5_shared/lib/react-query';
import { VideoSideBar } from '@/2_widgets/video';
import { VideoCategoryBar } from '@/3_features/video-category';
import { Footer } from './Footer';
import { Header } from './Header';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <QueryProvider>
      <div className="h-screen flex relative overflow-hidden">
        <VideoSideBar />
        <div
          className={`@container transition-all duration-300 ease-out flex items-center flex-col w-full`}
        >
          <Header />
          <div className="flex-1 overflow-y-auto w-full">
            {children}
            <Footer />
          </div>
        </div>
      </div>
    </QueryProvider>
  );
}
