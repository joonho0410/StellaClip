import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'filled' | 'ghost';
  error?: boolean;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    variant = 'default',
    error = false,
    fullWidth = false,
    resize = 'vertical',
    disabled,
    ...props
  }, ref) => {
    const baseClasses = [
      // Base styles
      'px-3 py-2 rounded-[8px]',
      'border border-solid',
      'transition-all duration-150 ease-out',
      'outline-none',
      'text-[var(--color-text-primary)]',
      'placeholder:text-[var(--color-text-quaternary)]',
      'text-sm leading-relaxed',
      // Focus styles
      'focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-opacity-20',
      'focus:border-[var(--color-primary)]',
      // Disabled state
      'disabled:opacity-50 disabled:cursor-not-allowed',
      // Resize
      resize === 'none' && 'resize-none',
      resize === 'vertical' && 'resize-y',
      resize === 'horizontal' && 'resize-x',
      resize === 'both' && 'resize',
      // Error state
      error && 'border-[var(--color-red)] focus:border-[var(--color-red)] focus:ring-[var(--color-red)]',
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

    const widthClasses = fullWidth ? 'w-full' : '';

    return (
      <textarea
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          widthClasses,
          className
        )}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };