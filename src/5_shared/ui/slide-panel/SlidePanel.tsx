'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/shared/lib/utils';
import { useResizeWidth } from './hooks';
import { SlidePanelHeader } from './blocks/SlidePanelHeader';
import { SlidePanelResizeBar } from './blocks/SlidePanelResizeBar';
export interface SlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  width?: string;
  className?: string;
  position?: 'right' | 'left';
}

export function SlidePanel({
  isOpen,
  onClose,
  children,
  title,
  width = '600px',
  className,
  position = 'right',
}: SlidePanelProps) {
  const slideRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isFullScreen, setIsFullScreen] = React.useState(false);

  // Use resize width hook
  const initialWidth = typeof width === 'string' ? parseInt(width) : 600;
  const {
    width: panelWidth,
    isResizing,
    handleResizeStart,
  } = useResizeWidth({
    containerRef: slideRef,
    initialWidth,
    minWidth: 300,
    maxWidth: 800,
  });

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle fullscreen toggle
  const handleFullScreenToggle = () => {
    const newFullScreenState = !isFullScreen;
    setIsFullScreen(newFullScreenState);
  };

  const shouldFullScreen = isMobile || isFullScreen;

  return (
    <div className={cn('z-50 inset-0 flex pointer-events-none')}>
      <div
        ref={slideRef}
        style={{
          width: shouldFullScreen ? '100vw' : `${panelWidth}px`,
        }}
        className={cn(
          'relative flex flex-col bg-[var(--color-bg-primary)] shadow-2xl pointer-events-auto',
          'transition-all duration-300 ease-out border-[var(--color-border-primary)]',
          'overflow-hidden',
          {
            // 위치별 변환
            'translate-x-0': isOpen,
            'translate-x-full': position === 'right' && !isOpen,
            '-translate-x-full': position === 'left' && !isOpen,

            // 위치별 border
            'border-l ml-auto right-0': position === 'right',
            'border-r mr-auto left-0': position === 'left',
          },
          className
        )}
      >
        {/* Resize Bar */}
        {!shouldFullScreen && (
          <SlidePanelResizeBar
            position={position}
            isFullScreen={isFullScreen}
            isResizing={isResizing}
            handleResizeStart={handleResizeStart}
          />
        )}
        {/* Header */}
        <SlidePanelHeader
          position={position}
          title={title || ''}
          isMobile={isMobile}
          isFullScreen={isFullScreen}
          onClose={onClose}
          handleFullScreenToggle={handleFullScreenToggle}
        />
        {/* Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
