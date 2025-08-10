import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  colsSmall?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  colsMedium?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  colsLarge?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  colsXLarge?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({
    className,
    cols = 1,
    colsSmall,
    colsMedium,
    colsLarge,
    colsXLarge,
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

    const colSmallClasses = colsSmall ? {
      1: 'sm:grid-cols-1',
      2: 'sm:grid-cols-2',
      3: 'sm:grid-cols-3',
      4: 'sm:grid-cols-4',
      5: 'sm:grid-cols-5',
      6: 'sm:grid-cols-6',
      7: 'sm:grid-cols-7',
      8: 'sm:grid-cols-8',
      9: 'sm:grid-cols-9',
      10: 'sm:grid-cols-10',
      11: 'sm:grid-cols-11',
      12: 'sm:grid-cols-12',
    }[colsSmall] : '';

    const colMediumClasses = colsMedium ? {
      1: 'md:grid-cols-1',
      2: 'md:grid-cols-2',
      3: 'md:grid-cols-3',
      4: 'md:grid-cols-4',
      5: 'md:grid-cols-5',
      6: 'md:grid-cols-6',
      7: 'md:grid-cols-7',
      8: 'md:grid-cols-8',
      9: 'md:grid-cols-9',
      10: 'md:grid-cols-10',
      11: 'md:grid-cols-11',
      12: 'md:grid-cols-12',
    }[colsMedium] : '';

    const colLargeClasses = colsLarge ? {
      1: 'lg:grid-cols-1',
      2: 'lg:grid-cols-2',
      3: 'lg:grid-cols-3',
      4: 'lg:grid-cols-4',
      5: 'lg:grid-cols-5',
      6: 'lg:grid-cols-6',
      7: 'lg:grid-cols-7',
      8: 'lg:grid-cols-8',
      9: 'lg:grid-cols-9',
      10: 'lg:grid-cols-10',
      11: 'lg:grid-cols-11',
      12: 'lg:grid-cols-12',
    }[colsLarge] : '';

    const colXLargeClasses = colsXLarge ? {
      1: 'xl:grid-cols-1',
      2: 'xl:grid-cols-2',
      3: 'xl:grid-cols-3',
      4: 'xl:grid-cols-4',
      5: 'xl:grid-cols-5',
      6: 'xl:grid-cols-6',
      7: 'xl:grid-cols-7',
      8: 'xl:grid-cols-8',
      9: 'xl:grid-cols-9',
      10: 'xl:grid-cols-10',
      11: 'xl:grid-cols-11',
      12: 'xl:grid-cols-12',
    }[colsXLarge] : '';

    const baseClasses = [
      'grid',
      colClasses[cols],
      colSmallClasses,
      colMediumClasses,
      colLargeClasses,
      colXLargeClasses,
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