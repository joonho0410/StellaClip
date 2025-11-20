import React from 'react';
import NextLink from 'next/link';
import { cn } from '@/shared/lib/utils';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  size?: 'micro' | 'tiny' | 'mini' | 'small' | 'regular' | 'large';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'accent' | 'secondary' | 'tertiary';
  underline?: 'none' | 'hover' | 'always';
  external?: boolean;
  disabled?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({
    className,
    href,
    size = 'regular',
    weight = 'normal',
    color = 'accent',
    underline = 'hover',
    external = false,
    disabled = false,
    children,
    ...props
  }, ref) => {
    const sizeClasses = {
      micro: 'text-[0.6875rem]',
      tiny: 'text-[0.625rem]',
      mini: 'text-[0.75rem]',
      small: 'text-[0.8125rem]',
      regular: 'text-[0.9375rem]',
      large: 'text-[1.125rem]',
    };

    const weightClasses = {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    };

    const colorClasses = {
      primary: [
        'text-[var(--color-link-primary)]',
        'hover:text-[var(--color-link-hover)]',
      ],
      accent: [
        'text-[var(--color-accent)]',
        'hover:text-[var(--color-accent-hover)]',
      ],
      secondary: [
        'text-[var(--color-text-secondary)]',
        'hover:text-[var(--color-text-primary)]',
      ],
      tertiary: [
        'text-[var(--color-text-tertiary)]',
        'hover:text-[var(--color-text-secondary)]',
      ],
    };

    const underlineClasses = {
      none: 'no-underline',
      hover: 'no-underline hover:underline',
      always: 'underline',
    };

    const baseClasses = [
      'transition-colors duration-150 ease-out',
      'outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
      'cursor-pointer',
      sizeClasses[size],
      weightClasses[weight],
      colorClasses[color],
      underlineClasses[underline],
      disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    ];

    // Handle external links
    if (external || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a
          ref={ref}
          href={href}
          className={cn(baseClasses, className)}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    }

    // Handle internal Next.js links
    return (
      <NextLink
        ref={ref}
        href={href}
        className={cn(baseClasses, className)}
        {...props}
      >
        {children}
      </NextLink>
    );
  }
);

Link.displayName = 'Link';

export { Link };