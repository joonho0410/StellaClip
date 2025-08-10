import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'title1' | 'title2' | 'title3' | 'title4' | 'title5' | 'title6' | 'title7' | 'title8' | 'title9';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'accent';
  align?: 'left' | 'center' | 'right';
  family?: 'primary' | 'serif';
  truncate?: boolean;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({
    className,
    as: Component = 'h2',
    size = 'title2',
    weight = 'semibold',
    color = 'primary',
    align = 'left',
    family = 'primary',
    truncate = false,
    children,
    ...props
  }, ref) => {
    const sizeClasses = {
      title1: 'text-[1.0625rem] leading-[1.4] tracking-[-0.012em]',    // 17px
      title2: 'text-[1.3125rem] leading-[1.33] tracking-[-0.012em]',   // 21px
      title3: 'text-[1.5rem] leading-[1.33] tracking-[-0.012em]',      // 24px
      title4: 'text-[2rem] leading-[1.125] tracking-[-0.022em]',       // 32px
      title5: 'text-[2.5rem] leading-[1.1] tracking-[-0.022em]',       // 40px
      title6: 'text-[3rem] leading-[1.1] tracking-[-0.022em]',         // 48px
      title7: 'text-[3.5rem] leading-[1.1] tracking-[-0.022em]',       // 56px
      title8: 'text-[4rem] leading-[1.06] tracking-[-0.022em]',        // 64px
      title9: 'text-[4.5rem] leading-[1] tracking-[-0.022em]',         // 72px
    };

    const weightClasses = {
      light: 'font-light',     // 300
      normal: 'font-normal',   // 400
      medium: 'font-medium',   // 510
      semibold: 'font-semibold', // 590
      bold: 'font-bold',       // 680
    };

    const colorClasses = {
      primary: 'text-[var(--color-text-primary)]',
      secondary: 'text-[var(--color-text-secondary)]',
      tertiary: 'text-[var(--color-text-tertiary)]',
      quaternary: 'text-[var(--color-text-quaternary)]',
      accent: 'text-[var(--color-accent)]',
    };

    const alignClasses = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    };

    const familyClasses = {
      primary: 'font-[var(--font-family-primary)]',
      serif: 'font-[var(--font-family-serif)]',
    };

    const baseClasses = [
      sizeClasses[size],
      weightClasses[weight],
      colorClasses[color],
      alignClasses[align],
      familyClasses[family],
      truncate && 'truncate',
    ];

    return (
      <Component
        ref={ref}
        className={cn(baseClasses, className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

export { Heading };