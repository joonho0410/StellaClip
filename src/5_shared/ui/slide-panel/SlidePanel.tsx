'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/shared/lib/utils';
import { IconButton } from '../button';

export interface SlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  width?: string;
  className?: string;
  overlay?: boolean;
  position?: 'right' | 'left';
  fullScreenOnMobile?: boolean;
  allowFullScreenToggle?: boolean;
  pushContent?: boolean; // New prop to control whether to push main content
  resizable?: boolean; // New prop to enable resizing
  onWidthChange?: (width: number) => void; // Callback for width changes
  onFullScreenChange?: (isFullScreen: boolean) => void; // Callback for fullscreen changes
  minWidth?: number;
  maxWidth?: number;
}

// Icons
const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m18 6-12 12M6 6l12 12" />
  </svg>
);

const ExpandIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
  </svg>
);

const ShrinkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
  </svg>
);

export function SlidePanel({
  isOpen,
  onClose,
  children,
  title,
  width = '600px',
  className,
  overlay = true,
  position = 'right',
  fullScreenOnMobile = true,
  allowFullScreenToggle = true,
  pushContent = false,
  resizable = false,
  onWidthChange,
  onFullScreenChange,
  minWidth = 300,
  maxWidth = 1200,
}: SlidePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [panelWidth, setPanelWidth] = React.useState(() => {
    return typeof width === 'string' ? parseInt(width) : 600;
  });
  const [isResizing, setIsResizing] = React.useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Only prevent body scroll on mobile fullscreen mode to allow background interaction on desktop
      if (fullScreenOnMobile && isMobile) {
        document.body.style.overflow = 'hidden';
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (fullScreenOnMobile && isMobile) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen, onClose, fullScreenOnMobile, isMobile]);

  // Handle click outside
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle fullscreen toggle
  const handleFullScreenToggle = () => {
    const newFullScreenState = !isFullScreen;
    setIsFullScreen(newFullScreenState);
    onFullScreenChange?.(newFullScreenState);
  };

  // Handle resize start
  const handleResizeStart = (e: React.MouseEvent) => {
    if (!resizable || isFullScreen || shouldFullScreen) return;
    
    e.preventDefault();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startWidth = panelWidth;
    
    const handleMouseMove = (e: MouseEvent) => {
      let newWidth;
      if (position === 'left') {
        newWidth = startWidth + (e.clientX - startX);
      } else {
        newWidth = startWidth - (e.clientX - startX);
      }
      
      // Apply min/max constraints
      newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
      
      setPanelWidth(newWidth);
      onWidthChange?.(newWidth);
    };
    
    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Reset fullscreen state when panel closes
  useEffect(() => {
    if (!isOpen) {
      setIsFullScreen(false);
      onFullScreenChange?.(false);
    }
  }, [isOpen, onFullScreenChange]);

  console.log('SlidePanel render - isOpen:', isOpen, 'isMobile:', isMobile); // Debug log

  if (!isOpen) {
    console.log('SlidePanel not rendering because isOpen is false'); // Debug log
    return null;
  }

  const shouldFullScreen = (fullScreenOnMobile && isMobile) || isFullScreen;
  console.log('SlidePanel rendering, shouldFullScreen:', shouldFullScreen, 'isFullScreen:', isFullScreen); // Debug log

  return (
    <div className={cn(
      "z-50 flex pointer-events-none",
      (pushContent && !shouldFullScreen) ? "fixed inset-y-0" : "fixed inset-0"
    )}
    style={{
      left: (pushContent && !shouldFullScreen) && position === 'left' ? '0' : undefined,
      right: (pushContent && !shouldFullScreen) && position === 'right' ? '0' : undefined,
      width: (pushContent && !shouldFullScreen) ? `${panelWidth}px` : undefined,
    }}>
      {/* Overlay - disabled to allow background interaction */}
      {false && overlay && !shouldFullScreen && (
        <div
          className="fixed inset-0 bg-black/10 transition-opacity duration-300"
          onClick={handleOverlayClick}
        />
      )}

      {/* Panel */}
      <div
        ref={panelRef}
        className={cn(
          'relative flex flex-col bg-[var(--color-bg-primary)] shadow-2xl pointer-events-auto',
          'transition-all duration-300 ease-out',
          'overflow-hidden',
          // Full screen on mobile
          shouldFullScreen 
            ? 'w-full h-full' 
            : cn(
                position === 'right' 
                  ? 'border-l border-[var(--color-border-primary)] ml-auto' 
                  : 'border-r border-[var(--color-border-primary)] mr-auto',
                'h-full'
              ),
          className
        )}
        style={{
          width: shouldFullScreen ? '100%' : (pushContent ? '100%' : `${panelWidth}px`),
          maxWidth: shouldFullScreen ? '100%' : (pushContent ? '100%' : `${panelWidth}px`),
          transform: shouldFullScreen 
            ? 'translateX(0)' 
            : isOpen 
              ? 'translateX(0)' 
              : pushContent 
                ? (position === 'right' ? 'translateX(100%)' : 'translateX(-100%)')
                : (position === 'right' ? 'translateX(100%)' : 'translateX(-100%)'),
        }}
      >
        {/* Resize Handle */}
        {resizable && !shouldFullScreen && (
          <div
            className={cn(
              "absolute top-0 bottom-0 w-1 cursor-col-resize z-10",
              "hover:bg-blue-500/20 transition-colors duration-200",
              position === 'left' ? 'right-0' : 'left-0',
              isResizing && "bg-blue-500/40"
            )}
            onMouseDown={handleResizeStart}
            style={{
              [position === 'left' ? 'right' : 'left']: '-2px',
              width: '4px',
            }}
          >
            {/* Visual indicator line */}
            <div 
              className={cn(
                "absolute top-0 bottom-0 w-px bg-[var(--color-border-primary)]",
                position === 'left' ? 'right-1' : 'left-1'
              )}
            />
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]">
          {position === 'left' ? (
            // Left panel layout: Close button on left, title in center, expand button on right
            <>
              <IconButton
                variant="ghost"
                size="sm"
                icon={<CloseIcon />}
                onClick={onClose}
              />
              {title && (
                <h2 className="flex-1 text-lg font-semibold text-[var(--color-text-primary)] truncate text-center mx-4">
                  {title}
                </h2>
              )}
              {allowFullScreenToggle && !isMobile ? (
                <IconButton
                  variant="ghost"
                  size="sm"
                  icon={isFullScreen ? <ShrinkIcon /> : <ExpandIcon />}
                  onClick={handleFullScreenToggle}
                  title={isFullScreen ? "축소" : "확장"}
                />
              ) : (
                <div className="w-8" /> // Spacer to maintain center alignment
              )}
            </>
          ) : (
            // Right panel layout: Expand button and title on left, close button on right
            <>
              <div className="flex items-center gap-2">
                {allowFullScreenToggle && !isMobile && (
                  <IconButton
                    variant="ghost"
                    size="sm"
                    icon={isFullScreen ? <ShrinkIcon /> : <ExpandIcon />}
                    onClick={handleFullScreenToggle}
                    title={isFullScreen ? "축소" : "확장"}
                  />
                )}
                {title && (
                  <h2 className="text-lg font-semibold text-[var(--color-text-primary)] truncate">
                    {title}
                  </h2>
                )}
              </div>
              <IconButton
                variant="ghost"
                size="sm"
                icon={<CloseIcon />}
                onClick={onClose}
              />
            </>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

// Hook for managing slide panel state
export function useSlidePanel() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [content, setContent] = React.useState<React.ReactNode>(null);
  const [title, setTitle] = React.useState<string>('');

  const openPanel = (content: React.ReactNode, title?: string) => {
    setContent(content);
    setTitle(title || '');
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
    // Clear content after animation
    setTimeout(() => {
      setContent(null);
      setTitle('');
    }, 300);
  };

  return {
    isOpen,
    content,
    title,
    openPanel,
    closePanel,
  };
}