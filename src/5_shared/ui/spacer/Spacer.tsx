import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  direction?: 'horizontal' | 'vertical' | 'both';
}

const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({
    className,
    size = 'md',
    direction = 'vertical',
    ...props
  }, ref) => {
    const sizeClasses = {
      xs: '1',     // 4px
      sm: '2',     // 8px
      md: '4',     // 16px
      lg: '6',     // 24px
      xl: '8',     // 32px
      '2xl': '12', // 48px
      '3xl': '16', // 64px
    };

    const directionClasses = {
      horizontal: `w-${sizeClasses[size]}`,
      vertical: `h-${sizeClasses[size]}`,
      both: `w-${sizeClasses[size]} h-${sizeClasses[size]}`,
    };

    return (
      <div
        ref={ref}
        className={cn(
          'shrink-0',
          directionClasses[direction],
          className
        )}
        aria-hidden="true"
        {...props}
      />
    );
  }
);

Spacer.displayName = 'Spacer';

export { Spacer };