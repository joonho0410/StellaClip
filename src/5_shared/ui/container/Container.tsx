import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
  padding?: boolean;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      size = 'lg',
      centered = true,
      padding = true,
      children,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'max-w-2xl', // 672px
      md: 'max-w-4xl', // 896px
      lg: 'max-w-6xl', // 1152px (matches theme page.maxWidth: 1024px + padding)
      xl: 'max-w-7xl', // 1280px
      full: 'max-w-full',
    };

    const baseClasses = [
      'w-full',
      centered && 'mx-auto',
      padding && 'px-6 sm:px-8 lg:px-12',
    ];

    return (
      <div
        ref={ref}
        className={cn(baseClasses, sizeClasses[size], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export { Container };
