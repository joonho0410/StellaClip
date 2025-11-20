import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column';
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  fullWidth?: boolean;
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({
    className,
    direction = 'column',
    spacing = 'md',
    align = 'stretch',
    justify = 'start',
    wrap = false,
    fullWidth = false,
    children,
    ...props
  }, ref) => {
    const spacingClasses = {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-4',
      lg: 'gap-6',
      xl: 'gap-8',
    };

    const alignClasses = {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
    };

    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    };

    const baseClasses = [
      'flex',
      direction === 'row' ? 'flex-row' : 'flex-col',
      spacingClasses[spacing],
      alignClasses[align],
      justifyClasses[justify],
      wrap && 'flex-wrap',
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

Stack.displayName = 'Stack';

export { Stack };