import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: 'sm' | 'md' | 'lg';
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, spacing = 'md', children, ...props }, ref) => {
    const spacingClasses = {
      sm: 'mb-2',
      md: 'mb-4',
      lg: 'mb-6',
    };

    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5', spacingClasses[spacing], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export { CardHeader };