import { useState, useCallback } from 'react';

interface UseResizeWidthOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  initialWidth?: number;
  minWidth?: number;
  maxWidth?: number;
}

export function useResizeWidth({
  containerRef,
  initialWidth = 600,
  minWidth = 300,
  maxWidth = 800,
}: UseResizeWidthOptions) {
  const [width, setWidth] = useState(() => initialWidth);
  const [isResizing, setIsResizing] = useState(false);

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, position: 'left' | 'right' = 'right') => {
      e.preventDefault();
      setIsResizing(true);

      const startX = e.clientX;
      const startWidth = width;

      const handleMouseMove = (e: MouseEvent) => {
        let newWidth;
        if (position === 'left') {
          // Left panel: handle is on right edge
          // Moving mouse right = increase width, moving left = decrease width
          newWidth = startWidth + (e.clientX - startX);
        } else {
          // Right panel: handle is on left edge
          // Moving mouse left = increase width, moving right = decrease width
          newWidth = startWidth - (e.clientX - startX);
        }

        // Apply constraints
        newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
        setWidth(newWidth);
      };

      const handleMouseUp = () => {
        setIsResizing(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [width, minWidth, maxWidth]
  );

  return {
    width,
    setWidth,
    isResizing,
    handleResizeStart,
  };
}
