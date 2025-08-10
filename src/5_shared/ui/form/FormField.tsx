import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface FormFieldProps {
  className?: string;
  children: React.ReactNode;
  error?: string;
  helperText?: string;
}

function FormField({
  className,
  children,
  error,
  helperText,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      {children}
      {(error || helperText) && (
        <div className="min-h-[1.25rem]">
          {error ? (
            <p className="text-xs text-[var(--color-red)] leading-tight">
              {error}
            </p>
          ) : helperText ? (
            <p className="text-xs text-[var(--color-text-tertiary)] leading-tight">
              {helperText}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
};

FormField.displayName = 'FormField';

export { FormField };