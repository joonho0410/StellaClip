import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  spacing?: 'sm' | 'md' | 'lg';
}

const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  ({
    className,
    orientation = 'horizontal',
    decorative = true,
    spacing = 'md',
    ...props
  }, ref) => {
    const orientationClasses = {
      horizontal: 'h-px w-full',
      vertical: 'w-px h-full',
    };

    const spacingClasses = {
      sm: orientation === 'horizontal' ? 'my-2' : 'mx-2',
      md: orientation === 'horizontal' ? 'my-4' : 'mx-4',
      lg: orientation === 'horizontal' ? 'my-6' : 'mx-6',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'shrink-0 bg-[var(--color-border-primary)]',
          orientationClasses[orientation],
          spacingClasses[spacing],
          className
        )}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={decorative ? undefined : orientation}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';

export { Separator };