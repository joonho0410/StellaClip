import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size = 'md', required = false, children, ...props }, ref) => {
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    return (
      <label
        ref={ref}
        className={cn(
          'block font-medium text-[var(--color-text-primary)] mb-1.5',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
        {required && <span className="text-[var(--color-red)] ml-1">*</span>}
      </label>
    );
  }
);

Label.displayName = 'Label';

export { Label };