import React from 'react';
import { cn } from '@/shared/lib/utils';

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('text-[var(--color-text-secondary)]', className)} {...props} />
  )
);

CardContent.displayName = 'CardContent';

export { CardContent };