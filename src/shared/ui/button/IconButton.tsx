import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon: React.ReactNode;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({
    className,
    variant = 'ghost',
    size = 'md',
    loading = false,
    icon,
    disabled,
    ...props
  }, ref) => {
    const baseClasses = [
      // Base styles
      'inline-flex items-center justify-center',
      'font-medium text-sm leading-none',
      'transition-all duration-150 ease-out',
      'border border-solid',
      'cursor-pointer select-none',
      'outline-none focus-visible:outline-2 focus-visible:outline-offset-2',
      // Disabled state
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      // Loading state
      loading && 'pointer-events-none opacity-75',
    ];

    const variantClasses = {
      primary: [
        'bg-[#E6E6E6] text-[#08090A] border-[#E6E6E6]',
        'hover:bg-[#D4D4D4] hover:border-[#D4D4D4]',
        'active:bg-[#C2C2C2] active:border-[#C2C2C2]',
        'focus-visible:outline-[#5E6AD2]',
      ],
      secondary: [
        'bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] border-[var(--color-border-primary)]',
        'hover:bg-[var(--color-bg-tertiary)] hover:border-[var(--color-border-secondary)]',
        'active:bg-[var(--color-bg-quaternary)] active:border-[var(--color-border-tertiary)]',
        'focus-visible:outline-[var(--color-primary)]',
      ],
      tertiary: [
        'bg-transparent text-[var(--color-text-secondary)] border-[var(--color-border-primary)]',
        'hover:bg-[var(--color-bg-translucent)] hover:text-[var(--color-text-primary)]',
        'active:bg-[var(--color-bg-secondary)]',
        'focus-visible:outline-[var(--color-primary)]',
      ],
      ghost: [
        'bg-transparent text-[var(--color-text-tertiary)] border-transparent',
        'hover:bg-[var(--color-bg-translucent)] hover:text-[var(--color-text-secondary)]',
        'active:bg-[var(--color-bg-secondary)] active:text-[var(--color-text-primary)]',
        'focus-visible:outline-[var(--color-primary)]',
      ],
      danger: [
        'bg-[var(--color-red)] text-white border-[var(--color-red)]',
        'hover:bg-[#D93C3C] hover:border-[#D93C3C]',
        'active:bg-[#C73030] active:border-[#C73030]',
        'focus-visible:outline-[var(--color-red)]',
      ],
    };

    const sizeClasses = {
      xs: 'h-6 w-6 rounded-[4px]',
      sm: 'h-7 w-7 rounded-[6px]',
      md: 'h-8 w-8 rounded-[6px]',
      lg: 'h-9 w-9 rounded-[8px]',
      xl: 'h-10 w-10 rounded-[8px]',
    };

    const iconSizes = {
      xs: 'h-3 w-3',
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-4 w-4',
      xl: 'h-5 w-5',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className={cn("animate-spin rounded-full border-2 border-current border-t-transparent", iconSizes[size])} />
        ) : (
          <span className={cn("flex items-center justify-center", iconSizes[size])}>
            {icon}
          </span>
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export { IconButton };