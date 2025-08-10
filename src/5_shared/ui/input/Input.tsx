import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'filled' | 'ghost';
  inputSize?: 'sm' | 'md' | 'lg';
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    variant = 'default',
    inputSize = 'md',
    error = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    ...props
  }, ref) => {
    const baseClasses = [
      // Base styles
      'flex items-center gap-2',
      'border border-solid',
      'transition-all duration-150 ease-out',
      'outline-none',
      // Focus styles
      'focus-within:ring-2 focus-within:ring-[var(--color-primary)] focus-within:ring-opacity-20',
      'focus-within:border-[var(--color-primary)]',
      // Disabled state
      disabled && 'opacity-50 cursor-not-allowed',
      // Error state
      error && 'border-[var(--color-red)] focus-within:border-[var(--color-red)] focus-within:ring-[var(--color-red)]',
    ];

    const variantClasses = {
      default: [
        'bg-[var(--color-bg-secondary)]',
        'border-[var(--color-border-primary)]',
        'hover:border-[var(--color-border-secondary)]',
      ],
      filled: [
        'bg-[var(--color-bg-tertiary)]',
        'border-[var(--color-border-secondary)]',
        'hover:bg-[var(--color-bg-quaternary)]',
        'hover:border-[var(--color-border-tertiary)]',
      ],
      ghost: [
        'bg-transparent',
        'border-transparent',
        'hover:bg-[var(--color-bg-translucent)]',
      ],
    };

    const sizeClasses = {
      sm: 'h-8 px-3 rounded-[6px] text-sm',
      md: 'h-9 px-3 rounded-[8px] text-sm',
      lg: 'h-10 px-4 rounded-[8px] text-base',
    };

    const inputClasses = [
      'flex-1 bg-transparent outline-none',
      'text-[var(--color-text-primary)]',
      'placeholder:text-[var(--color-text-quaternary)]',
      'disabled:cursor-not-allowed',
    ];

    const iconClasses = 'text-[var(--color-text-tertiary)] shrink-0';

    const widthClasses = fullWidth ? 'w-full' : '';

    return (
      <div
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[inputSize],
          widthClasses,
          className
        )}
      >
        {leftIcon && <span className={iconClasses}>{leftIcon}</span>}
        <input
          ref={ref}
          className={cn(inputClasses)}
          disabled={disabled}
          {...props}
        />
        {rightIcon && <span className={iconClasses}>{rightIcon}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };