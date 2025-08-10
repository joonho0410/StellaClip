/**
 * Centralized Component Class Generation Utilities
 * Based on Carbon Design System and Salt DS patterns
 * 
 * This file provides utilities for generating consistent component classes
 * using design tokens, reducing code duplication and ensuring consistency
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { 
  buttonVariantTokens,
  type SpacingToken
} from './tokens';

// Re-export cn utility
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

// =====================================================
// BASE COMPONENT CLASSES
// =====================================================

/**
 * Base classes for interactive components
 */
export const getInteractiveBaseClasses = () => [
  'outline-none',
  'focus-visible:outline-2',
  'focus-visible:outline-offset-2',
  'focus-visible:outline-[var(--salt-color-focus)]',
  'disabled:opacity-50',
  'disabled:cursor-not-allowed',
  'disabled:pointer-events-none',
  'transition-all',
  'duration-150',
  'ease-out',
];

/**
 * Base classes for layout components
 */
export const getLayoutBaseClasses = () => [
  'relative',
];

/**
 * Base classes for text components
 */
export const getTextBaseClasses = () => [
  'text-[var(--salt-color-text-primary)]',
  'font-[var(--font-family-primary)]',
];

// =====================================================
// BUTTON COMPONENT CLASSES
// =====================================================

export type ButtonVariant = keyof typeof buttonVariantTokens;
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Generate button classes based on variant and size
 */
export const getButtonClasses = (
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  fullWidth = false,
  loading = false
) => {
  const variantTokens = buttonVariantTokens[variant];
  
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'border',
    'border-solid',
    'cursor-pointer',
    'select-none',
    ...getInteractiveBaseClasses(),
  ];
  
  const sizeClasses = {
    xs: [
      'h-[var(--salt-size-height-xs)]', // 24px
      'px-[var(--salt-spacing-spacing-02)]', // 8px
      'text-xs',
      'gap-[var(--salt-spacing-fluid-spacing-01)]', // 8px
      'rounded-[var(--salt-radius-radius-sm)]', // 4px
    ],
    sm: [
      'h-[var(--salt-size-height-sm)]', // 32px
      'px-[var(--salt-spacing-spacing-03)]', // 12px
      'text-xs',
      'gap-[var(--salt-spacing-fluid-spacing-01)]', // 8px
      'rounded-[var(--salt-radius-radius-md)]', // 6px
    ],
    md: [
      'h-[var(--salt-size-height-md)]', // 36px
      'px-[var(--salt-spacing-spacing-03)]', // 12px
      'text-sm',
      'gap-[var(--salt-spacing-spacing-02)]', // 8px
      'rounded-[var(--salt-radius-radius-lg)]', // 8px
    ],
    lg: [
      'h-[var(--salt-size-height-lg)]', // 40px
      'px-[var(--salt-spacing-spacing-04)]', // 16px
      'text-sm',
      'gap-[var(--salt-spacing-spacing-02)]', // 8px
      'rounded-[var(--salt-radius-radius-lg)]', // 8px
    ],
    xl: [
      'h-[var(--salt-size-height-xl)]', // 48px
      'px-[var(--salt-spacing-spacing-05)]', // 20px
      'text-base',
      'gap-[var(--salt-spacing-spacing-03)]', // 12px
      'rounded-[var(--salt-radius-radius-lg)]', // 8px
    ],
  };
  
  const variantClasses = {
    primary: [
      `bg-[var(--salt-color-${variantTokens.background})]`,
      `text-[var(--salt-color-${variantTokens.color})]`,
      `border-[var(--salt-color-${variantTokens.border})]`,
      `hover:bg-[var(--salt-color-${variantTokens.backgroundHover})]`,
      `active:bg-[var(--salt-color-${variantTokens.backgroundActive})]`,
    ],
    secondary: [
      `bg-[var(--salt-color-${variantTokens.background})]`,
      `text-[var(--salt-color-${variantTokens.color})]`,
      `border-[var(--salt-color-${variantTokens.border})]`,
      `hover:bg-[var(--salt-color-${variantTokens.backgroundHover})]`,
      `active:bg-[var(--salt-color-${variantTokens.backgroundActive})]`,
    ],
    tertiary: [
      `bg-[var(--salt-color-${variantTokens.background})]`,
      `text-[var(--salt-color-${variantTokens.color})]`,
      `border-[var(--salt-color-${variantTokens.border})]`,
      `hover:bg-[var(--salt-color-${variantTokens.backgroundHover})]`,
      `active:bg-[var(--salt-color-${variantTokens.backgroundActive})]`,
    ],
    ghost: [
      `bg-[var(--salt-color-${variantTokens.background})]`,
      `text-[var(--salt-color-${variantTokens.color})]`,
      'border-transparent',
      `hover:bg-[var(--salt-color-${variantTokens.backgroundHover})]`,
      `active:bg-[var(--salt-color-${variantTokens.backgroundActive})]`,
    ],
    danger: [
      `bg-[var(--salt-color-${variantTokens.background})]`,
      `text-[var(--salt-color-${variantTokens.color})]`,
      `border-[var(--salt-color-${variantTokens.border})]`,
      `hover:bg-[var(--salt-color-${variantTokens.backgroundHover})]`,
      `active:bg-[var(--salt-color-${variantTokens.backgroundActive})]`,
    ],
  };
  
  const stateClasses = [
    fullWidth && 'w-full',
    loading && 'pointer-events-none opacity-75',
  ];
  
  return cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    stateClasses
  );
};

// =====================================================
// TEXT COMPONENT CLASSES
// =====================================================

export type TextSize = 'micro' | 'tiny' | 'mini' | 'small' | 'regular' | 'large';
export type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
export type TextColor = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'accent' | 'success' | 'warning' | 'danger' | 'inverse';
export type TextAlign = 'left' | 'center' | 'right' | 'justify';
export type TextFamily = 'primary' | 'monospace' | 'serif';

/**
 * Generate text classes based on various properties
 */
export const getTextClasses = (
  size: TextSize = 'regular',
  weight: TextWeight = 'normal',
  color: TextColor = 'primary',
  align: TextAlign = 'left',
  family: TextFamily = 'primary',
  truncate = false
) => {
  const baseClasses = getTextBaseClasses();
  
  const sizeClasses = {
    micro: ['text-[0.6875rem]', 'leading-[1.4]'], // 11px
    tiny: ['text-[0.625rem]', 'leading-[1.5]'], // 10px
    mini: ['text-[0.75rem]', 'leading-[1.5]'], // 12px
    small: ['text-[0.8125rem]', 'leading-[calc(21/14)]'], // 13px
    regular: ['text-[0.9375rem]', 'leading-[1.6]'], // 15px
    large: ['text-[1.125rem]', 'leading-[1.6]'], // 18px
  };
  
  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  const colorClasses = {
    primary: 'text-[var(--salt-color-text-primary)]',
    secondary: 'text-[var(--salt-color-text-secondary)]',
    tertiary: 'text-[var(--salt-color-text-tertiary)]',
    quaternary: 'text-[var(--salt-color-text-quaternary)]',
    accent: 'text-[var(--salt-color-interactive)]',
    success: 'text-[var(--salt-color-support-success)]',
    warning: 'text-[var(--salt-color-support-warning)]',
    danger: 'text-[var(--salt-color-support-error)]',
    inverse: 'text-[var(--salt-color-text-inverse)]',
  };
  
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };
  
  const familyClasses = {
    primary: 'font-[var(--font-family-primary)]',
    monospace: 'font-[var(--font-family-mono)]',
    serif: 'font-[var(--font-family-serif)]',
  };
  
  const stateClasses = [
    truncate && 'truncate',
  ];
  
  return cn(
    baseClasses,
    sizeClasses[size],
    weightClasses[weight],
    colorClasses[color],
    alignClasses[align],
    familyClasses[family],
    stateClasses
  );
};

// =====================================================
// INPUT COMPONENT CLASSES
// =====================================================

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'error' | 'success';

/**
 * Generate input classes based on size and variant
 */
export const getInputClasses = (
  size: InputSize = 'md',
  variant: InputVariant = 'default',
  disabled = false,
  error = false
) => {
  const baseClasses = [
    'w-full',
    'border',
    'border-solid',
    'bg-[var(--salt-color-background)]',
    'text-[var(--salt-color-text-primary)]',
    'placeholder:text-[var(--salt-color-text-placeholder)]',
    ...getInteractiveBaseClasses(),
  ];
  
  const sizeClasses = {
    sm: [
      'h-[var(--salt-size-height-sm)]', // 32px
      'px-[var(--salt-spacing-spacing-03)]', // 12px
      'text-sm',
      'rounded-[var(--salt-radius-radius-md)]', // 6px
    ],
    md: [
      'h-[var(--salt-size-height-md)]', // 36px
      'px-[var(--salt-spacing-spacing-03)]', // 12px
      'text-sm',
      'rounded-[var(--salt-radius-radius-lg)]', // 8px
    ],
    lg: [
      'h-[var(--salt-size-height-lg)]', // 40px
      'px-[var(--salt-spacing-spacing-04)]', // 16px
      'text-base',
      'rounded-[var(--salt-radius-radius-lg)]', // 8px
    ],
  };
  
  const variantClasses = {
    default: [
      'border-[var(--salt-color-border-subtle)]',
      'hover:border-[var(--salt-color-border-subtle-selected)]',
      'focus:border-[var(--salt-color-interactive)]',
      'focus:ring-2',
      'focus:ring-[var(--salt-color-focus)]',
      'focus:ring-opacity-20',
    ],
    error: [
      'border-[var(--salt-color-support-error)]',
      'focus:border-[var(--salt-color-support-error)]',
      'focus:ring-2',
      'focus:ring-[var(--salt-color-support-error)]',
      'focus:ring-opacity-20',
    ],
    success: [
      'border-[var(--salt-color-support-success)]',
      'focus:border-[var(--salt-color-support-success)]',
      'focus:ring-2',
      'focus:ring-[var(--salt-color-support-success)]',
      'focus:ring-opacity-20',
    ],
  };
  
  const stateClasses = [
    disabled && 'opacity-50 cursor-not-allowed',
    error && 'border-[var(--salt-color-support-error)]',
  ];
  
  return cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    stateClasses
  );
};

// =====================================================
// CARD COMPONENT CLASSES
// =====================================================

export type CardVariant = 'default' | 'elevated' | 'outlined';

/**
 * Generate card classes based on variant
 */
export const getCardClasses = (
  variant: CardVariant = 'default',
  interactive = false
) => {
  const baseClasses = [
    'rounded-[var(--salt-radius-radius-lg)]', // 8px
    'overflow-hidden',
    ...getLayoutBaseClasses(),
  ];
  
  const variantClasses = {
    default: [
      'bg-[var(--salt-color-layer-01)]',
      'border',
      'border-[var(--salt-color-border-subtle)]',
    ],
    elevated: [
      'bg-[var(--salt-color-layer-01)]',
      'shadow-[var(--salt-shadow-shadow-md)]',
    ],
    outlined: [
      'bg-[var(--salt-color-background)]',
      'border-2',
      'border-[var(--salt-color-border-subtle)]',
    ],
  };
  
  const interactiveClasses = interactive ? [
    'cursor-pointer',
    'transition-all',
    'duration-150',
    'ease-out',
    'hover:shadow-[var(--salt-shadow-shadow-lg)]',
    'hover:border-[var(--salt-color-border-subtle-selected)]',
    'focus-visible:outline-2',
    'focus-visible:outline-offset-2',
    'focus-visible:outline-[var(--salt-color-focus)]',
  ] : [];
  
  return cn(
    baseClasses,
    variantClasses[variant],
    interactiveClasses
  );
};

/**
 * Generate card content classes
 */
export const getCardContentClasses = (padding: SpacingToken = 'spacing-04') => {
  return cn([
    `p-[var(--salt-spacing-${padding})]`,
    'text-[var(--salt-color-text-secondary)]',
  ]);
};

// =====================================================
// BADGE COMPONENT CLASSES
// =====================================================

export type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Generate badge classes based on variant and size
 */
export const getBadgeClasses = (
  variant: BadgeVariant = 'default',
  size: BadgeSize = 'md'
) => {
  const baseClasses = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'rounded-[var(--salt-radius-radius-full)]',
    'border',
    'border-solid',
  ];
  
  const sizeClasses = {
    sm: [
      'h-5',
      'px-[var(--salt-spacing-spacing-02)]', // 8px
      'text-xs',
      'gap-1',
    ],
    md: [
      'h-6',
      'px-[var(--salt-spacing-spacing-03)]', // 12px
      'text-xs',
      'gap-1',
    ],
    lg: [
      'h-7',
      'px-[var(--salt-spacing-spacing-03)]', // 12px
      'text-sm',
      'gap-1.5',
    ],
  };
  
  const variantClasses = {
    default: [
      'bg-[var(--salt-color-background-secondary)]',
      'text-[var(--salt-color-text-primary)]',
      'border-[var(--salt-color-border-subtle)]',
    ],
    secondary: [
      'bg-[var(--salt-color-layer-01)]',
      'text-[var(--salt-color-text-secondary)]',
      'border-[var(--salt-color-border-subtle)]',
    ],
    success: [
      'bg-[var(--salt-color-support-success)]',
      'text-[var(--salt-color-text-inverse)]',
      'border-[var(--salt-color-support-success)]',
    ],
    warning: [
      'bg-[var(--salt-color-support-warning)]',
      'text-[var(--salt-color-text-inverse)]',
      'border-[var(--salt-color-support-warning)]',
    ],
    danger: [
      'bg-[var(--salt-color-support-error)]',
      'text-[var(--salt-color-text-inverse)]',
      'border-[var(--salt-color-support-error)]',
    ],
  };
  
  return cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant]
  );
};

// =====================================================
// LAYOUT COMPONENT CLASSES
// =====================================================

export type FlexDirection = 'row' | 'column';
export type FlexAlign = 'start' | 'center' | 'end' | 'stretch';
export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

/**
 * Generate flex layout classes
 */
export const getFlexClasses = (
  direction: FlexDirection = 'row',
  align: FlexAlign = 'start',
  justify: FlexJustify = 'start',
  wrap: FlexWrap = 'nowrap',
  gap: SpacingToken = 'spacing-02'
) => {
  const baseClasses = ['flex'];
  
  const directionClasses = {
    row: 'flex-row',
    column: 'flex-col',
  };
  
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };
  
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };
  
  const wrapClasses = {
    nowrap: 'flex-nowrap',
    wrap: 'flex-wrap',
    'wrap-reverse': 'flex-wrap-reverse',
  };
  
  return cn(
    baseClasses,
    directionClasses[direction],
    alignClasses[align],
    justifyClasses[justify],
    wrapClasses[wrap],
    `gap-[var(--salt-spacing-${gap})]`
  );
};

/**
 * Generate grid layout classes
 */
export const getGridClasses = (
  cols: number = 1,
  gap: SpacingToken = 'spacing-04'
) => {
  const baseClasses = [
    'grid',
    `grid-cols-${cols}`,
    `gap-[var(--salt-spacing-${gap})]`,
  ];
  
  return cn(baseClasses);
};

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

/**
 * Generate responsive classes
 */
export const getResponsiveClasses = (
  baseClass: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string
) => {
  return cn([
    baseClass,
    sm && `sm:${sm}`,
    md && `md:${md}`,
    lg && `lg:${lg}`,
    xl && `xl:${xl}`,
  ]);
};

/**
 * Generate state-based classes
 */
export const getStateClasses = (
  isActive = false,
  isDisabled = false,
  isLoading = false,
  isSelected = false
) => {
  return cn([
    isActive && 'active',
    isDisabled && 'disabled:opacity-50 disabled:cursor-not-allowed',
    isLoading && 'animate-pulse pointer-events-none',
    isSelected && 'bg-[var(--salt-color-background-selected)]',
  ]);
};

// Re-export commonly used utilities from tokens
export { getColorToken, getSpacingToken, getSizeToken } from './tokens';