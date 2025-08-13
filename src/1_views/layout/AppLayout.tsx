'use client';

import { useEffect, useState } from 'react';
import { useCurrentVideo } from '@/4_entities/video';
import { VideoSideBar } from '@/3_features/video-sidebar';
import { VideoCategoryBar } from '@/3_features/video-category';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const { currentVideo } = useCurrentVideo();
  const [isMobile, setIsMobile] = useState(false);
  const [panelWidth, setPanelWidth] = useState(600);
  const [isPanelFullScreen, setIsPanelFullScreen] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isPanelOpen = !!currentVideo;

  return (
    <div className="h-screen flex relative overflow-hidden">
      {/* VideoSideBar - Positioned on the left */}
      <VideoSideBar 
        onWidthChange={setPanelWidth}
        onFullScreenChange={setIsPanelFullScreen}
      />
      
      {/* Main Content Area */}
      <div 
        className={`@container transition-all duration-300 ease-out flex flex-col ${
          isPanelOpen ? 'flex-1' : 'w-full'
        }`}
        style={{
          marginLeft: isPanelOpen && !isMobile && !isPanelFullScreen ? `${panelWidth}px` : '0',
        }}
      >
        {/* Fixed Header with VideoCategoryBar */}
        <header className="sticky top-0 z-40 bg-[var(--color-bg-primary)] border-b border-[var(--color-border-primary)] backdrop-blur-sm bg-opacity-95">
          <VideoCategoryBar />
        </header>
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}