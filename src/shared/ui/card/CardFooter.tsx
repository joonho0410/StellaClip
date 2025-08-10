import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: 'sm' | 'md' | 'lg';
  justify?: 'start' | 'center' | 'end' | 'between';
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, spacing = 'md', justify = 'end', children, ...props }, ref) => {
    const spacingClasses = {
      sm: 'mt-2',
      md: 'mt-4',
      lg: 'mt-6',
    };

    const justifyClasses = {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-2',
          spacingClasses[spacing],
          justifyClasses[justify],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export { CardFooter };