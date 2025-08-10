import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  fullWidth?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant = 'default',
    padding = 'md',
    interactive = false,
    fullWidth = false,
    children,
    ...props
  }, ref) => {
    const baseClasses = [
      'rounded-[12px]',
      'transition-all duration-150 ease-out',
      // Interactive states
      interactive && [
        'cursor-pointer',
        'hover:scale-[1.02]',
        'active:scale-[0.98]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
      ],
    ];

    const variantClasses = {
      default: [
        'bg-[var(--color-bg-secondary)]',
        'border border-[var(--color-border-primary)]',
        interactive && 'hover:border-[var(--color-border-secondary)]',
      ],
      outlined: [
        'bg-transparent',
        'border border-[var(--color-border-primary)]',
        interactive && 'hover:bg-[var(--color-bg-translucent)] hover:border-[var(--color-border-secondary)]',
      ],
      elevated: [
        'bg-[var(--color-bg-secondary)]',
        'border border-[var(--color-border-primary)]',
        'shadow-[var(--shadow-low)]',
        interactive && 'hover:shadow-[var(--shadow-medium)] hover:border-[var(--color-border-secondary)]',
      ],
      ghost: [
        'bg-transparent',
        'border-transparent',
        interactive && 'hover:bg-[var(--color-bg-translucent)]',
      ],
    };

    const paddingClasses = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    };

    const widthClasses = fullWidth ? 'w-full' : '';

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          paddingClasses[padding],
          widthClasses,
          className
        )}
        tabIndex={interactive ? 0 : undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };