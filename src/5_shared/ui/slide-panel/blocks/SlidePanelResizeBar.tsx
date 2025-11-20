import React from 'react';
import { cn } from '@/shared/lib/utils';

type Props = {
  position: 'left' | 'right';
  isFullScreen: boolean;
  isResizing: boolean;
  handleResizeStart: (e: React.MouseEvent, position: 'left' | 'right') => void;
};

export const SlidePanelResizeBar = ({
  position,
  isFullScreen,
  isResizing,
  handleResizeStart,
}: Props) => {
  return (
    <div
      className={cn(
        'absolute top-0 bottom-0 cursor-col-resize z-20 pointer-events-auto',
        position === 'left' ? 'right-0' : 'left-0'
      )}
      onMouseDown={(e) => {
        if (isFullScreen || isResizing) return;
        handleResizeStart(e, position);
      }}
      style={{
        [position === 'left' ? 'right' : 'left']: '0px',
        width: '6px',
      }}
    >
      {/* Invisible wider hit area for easier grabbing */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ width: '3px' }}
      />
    </div>
  );
};
