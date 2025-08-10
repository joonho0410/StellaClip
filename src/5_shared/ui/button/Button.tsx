import React from 'react';
import { getButtonClasses, cn } from '@/shared/lib/component-classes';
import { type ButtonComponentProps } from '@/shared/lib/component-api';

// Button component using centralized design system
export interface ButtonProps extends ButtonComponentProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'disabled' | 'onClick'> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled = false,
    asChild = false,
    type = 'button',
    onClick,
    ...props
  }, ref) => {
    // Generate classes using centralized system
    const buttonClassName = cn(
      getButtonClasses(variant, size, fullWidth, loading),
      className
    );

    const content = (
      <>
        {loading && (
          <div 
            className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" 
            aria-hidden="true"
          />
        )}
        {!loading && leftIcon && (
          <span className="shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}
        {children && <span className="truncate">{children}</span>}
        {!loading && rightIcon && (
          <span className="shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </>
    );

    // AsChild pattern for composition
    if (asChild && React.isValidElement(children)) {
      const childProps = children.props as Record<string, unknown>;
      return React.cloneElement(children, {
        className: cn(buttonClassName, childProps?.className as string),
        ref,
        disabled: disabled || loading,
        onClick,
        type,
        ...props,
      } as React.HTMLAttributes<HTMLElement>);
    }

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClassName}
        disabled={disabled || loading}
        onClick={onClick}
        aria-busy={loading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };