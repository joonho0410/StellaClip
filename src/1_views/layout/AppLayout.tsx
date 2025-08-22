'use client';

import { useEffect, useState } from 'react';
import { QueryProvider } from '@/5_shared/lib/react-query';
import { useCurrentVideo } from '@/4_entities/video';
import { VideoSideBar } from '@/3_features/video-sidebar';
import { VideoCategoryBar } from '@/3_features/video-category';
import { Header } from '@/5_shared/ui/header';

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
          <Header>
            <VideoCategoryBar />
          </Header>
          <div className="flex-1 overflow-y-auto overflow-x-auto w-full">
            {children}
          </div>
        </div>
      </div>
    </QueryProvider>
  );
}
