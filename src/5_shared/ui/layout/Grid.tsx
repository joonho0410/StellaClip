import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  colsDesktop?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({
    className,
    cols = 1,
    colsDesktop,
    gap = 'md',
    fullWidth = false,
    children,
    ...props
  }, ref) => {
    const gapClasses = {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    };

    const colClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
      9: 'grid-cols-9',
      10: 'grid-cols-10',
      11: 'grid-cols-11',
      12: 'grid-cols-12',
    };

    const colDesktopClasses = colsDesktop ? {
      1: '@2xl:grid-cols-1',
      2: '@2xl:grid-cols-2',
      3: '@2xl:grid-cols-3',
      4: '@2xl:grid-cols-4',
      5: '@2xl:grid-cols-5',
      6: '@2xl:grid-cols-6',
      7: '@2xl:grid-cols-7',
      8: '@2xl:grid-cols-8',
      9: '@2xl:grid-cols-9',
      10: '@2xl:grid-cols-10',
      11: '@2xl:grid-cols-11',
      12: '@2xl:grid-cols-12',
    }[colsDesktop] : '';

    const baseClasses = [
      'grid',
      colClasses[cols],
      colDesktopClasses,
      gapClasses[gap],
      fullWidth && 'w-full',
    ];

    return (
      <div
        ref={ref}
        className={cn(baseClasses, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

export { Grid };