import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'code' | 'pre';
  size?: 'micro' | 'tiny' | 'mini' | 'small' | 'regular';
  variant?: 'inline' | 'block';
  color?: 'primary' | 'secondary' | 'tertiary' | 'accent';
}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({
    className,
    as: Component = 'code',
    size = 'small',
    variant = 'inline',
    color = 'primary',
    children,
    ...props
  }, ref) => {
    const sizeClasses = {
      micro: 'text-[0.6875rem]',   // 11px
      tiny: 'text-[0.625rem]',     // 10px
      mini: 'text-[0.75rem]',      // 12px
      small: 'text-[0.8125rem]',   // 13px
      regular: 'text-[0.9375rem]', // 15px
    };

    const colorClasses = {
      primary: 'text-[var(--color-text-primary)]',
      secondary: 'text-[var(--color-text-secondary)]',
      tertiary: 'text-[var(--color-text-tertiary)]',
      accent: 'text-[var(--color-accent)]',
    };

    const variantClasses = {
      inline: [
        'inline-flex items-center',
        'px-1.5 py-0.5',
        'bg-[var(--color-bg-tertiary)]',
        'border border-[var(--color-border-primary)]',
        'rounded-[4px]',
        'font-[var(--font-family-monospace)]',
      ],
      block: [
        'block',
        'p-4',
        'bg-[var(--color-bg-secondary)]',
        'border border-[var(--color-border-primary)]',
        'rounded-[8px]',
        'font-[var(--font-family-monospace)]',
        'overflow-x-auto',
        'whitespace-pre',
      ],
    };

    const baseClasses = [
      sizeClasses[size],
      colorClasses[color],
      variantClasses[variant],
    ];

    return (
      <Component
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={cn(baseClasses, className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Code.displayName = 'Code';

export { Code };