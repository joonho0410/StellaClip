import React from 'react';
import { getTextClasses, cn } from '@/shared/lib/component-classes';
import { type TypographyComponentProps } from '@/shared/lib/component-api';

// Text component using centralized design system
export interface TextProps extends TypographyComponentProps {
  children?: React.ReactNode;
}

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({
    className,
    as = 'p',
    size = 'regular',
    weight = 'normal',
    color = 'primary',
    align = 'left',
    family = 'primary',
    truncate = false,
    children,
    ...props
  }, ref) => {
    // Generate classes using centralized system
    const textClassName = cn(
      getTextClasses(size, weight, color, align, family, truncate),
      className
    );

    const Component = as as React.ElementType;

    return (
      <Component
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={textClassName}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

export { Text };