/**
 * Centralized Design Token System
 * Based on Carbon Design System and Salt DS best practices
 * 
 * This file provides type-safe access to design tokens with semantic naming
 * following the Carbon DS pattern: role-based tokens that reference primitive values
 */

import { theme } from './theme';

// =====================================================
// TOKEN TYPES - Following Carbon DS naming conventions
// =====================================================

export type ColorToken = keyof typeof colorTokens;
export type SpacingToken = keyof typeof spacingTokens;
export type TypographyToken = keyof typeof typographyTokens;
export type SizeToken = keyof typeof sizeTokens;
export type BorderRadiusToken = keyof typeof borderRadiusTokens;
export type ShadowToken = keyof typeof shadowTokens;
export type TransitionToken = keyof typeof transitionTokens;

// =====================================================
// COLOR TOKENS - Semantic color system
// =====================================================

export const colorTokens = {
  // Background tokens
  'background': theme.colors.background.primary,
  'background-secondary': theme.colors.background.secondary,
  'background-tertiary': theme.colors.background.tertiary,
  'background-quaternary': theme.colors.background.quaternary,
  'background-hover': theme.colors.background.translucent,
  'background-selected': theme.colors.selection.background,
  'background-brand': theme.colors.brand.background,
  'background-inverse': theme.colors.overlay.primary,
  
  // Text tokens
  'text-primary': theme.colors.text.primary,
  'text-secondary': theme.colors.text.secondary,
  'text-tertiary': theme.colors.text.tertiary,
  'text-quaternary': theme.colors.text.quaternary,
  'text-inverse': theme.colors.brand.text,
  'text-on-color': theme.colors.brand.text,
  'text-helper': theme.colors.text.tertiary,
  'text-placeholder': theme.colors.text.quaternary,
  
  // Border tokens
  'border-subtle': theme.colors.border.primary,
  'border-subtle-selected': theme.colors.border.secondary,
  'border-strong': theme.colors.border.tertiary,
  
  // Interactive tokens (following Carbon DS pattern)
  'interactive': theme.colors.primary,
  'interactive-hover': theme.colors.primaryHover,
  'button-primary': '#E6E6E6', // Light button in dark theme
  'button-primary-hover': '#D4D4D4',
  'button-primary-active': '#C2C2C2',
  'button-secondary': theme.colors.background.secondary,
  'button-secondary-hover': theme.colors.background.tertiary,
  'button-tertiary': 'transparent',
  'button-tertiary-hover': theme.colors.background.translucent,
  'button-danger': theme.colors.semantic.red,
  
  // Semantic tokens
  'support-error': theme.colors.semantic.red,
  'support-success': theme.colors.semantic.green,
  'support-warning': theme.colors.semantic.orange,
  'support-info': theme.colors.semantic.blue,
  
  // Focus tokens
  'focus': theme.colors.primary,
  'focus-inset': theme.colors.brand.text,
  'focus-inverse': theme.colors.primary,
  
  // Link tokens
  'link-primary': theme.colors.link.primary,
  'link-primary-hover': theme.colors.link.hover,
  'link-secondary': theme.colors.text.secondary,
  
  // Layer tokens (following Carbon DS layer system)
  'layer': theme.colors.background.primary,
  'layer-01': theme.colors.background.secondary,
  'layer-02': theme.colors.background.tertiary,
  'layer-03': theme.colors.background.quaternary,
  'layer-hover': theme.colors.background.translucent,
  'layer-selected': theme.colors.selection.background,
  'layer-accent': theme.colors.accent,
  
  // Icon tokens
  'icon-primary': theme.colors.text.primary,
  'icon-secondary': theme.colors.text.secondary,
  'icon-tertiary': theme.colors.text.tertiary,
  'icon-inverse': theme.colors.brand.text,
  'icon-on-color': theme.colors.brand.text,
  
} as const;

// =====================================================
// SPACING TOKENS - Following 8px grid system
// =====================================================

export const spacingTokens = {
  // Base spacing scale (following Carbon DS naming)
  'spacing-01': theme.spacing['1'], // 4px
  'spacing-02': theme.spacing['2'], // 8px
  'spacing-03': theme.spacing['3'], // 12px
  'spacing-04': theme.spacing['4'], // 16px
  'spacing-05': theme.spacing['5'], // 20px
  'spacing-06': theme.spacing['6'], // 24px
  'spacing-07': theme.spacing['8'], // 32px
  'spacing-08': theme.spacing['10'], // 40px
  'spacing-09': theme.spacing['12'], // 48px
  'spacing-10': theme.spacing['16'], // 64px
  'spacing-11': theme.spacing['20'], // 80px
  
  // Semantic spacing tokens
  'layout-01': theme.spacing['4'], // 16px - small layout spacing
  'layout-02': theme.spacing['6'], // 24px - medium layout spacing
  'layout-03': theme.spacing['8'], // 32px - large layout spacing
  'layout-04': theme.spacing['12'], // 48px - x-large layout spacing
  'layout-05': theme.spacing['16'], // 64px - xx-large layout spacing
  
  // Container spacing
  'container-01': theme.spacing.page.paddingInline, // 24px
  'container-02': theme.spacing['12'], // 48px
  
  // Component-specific spacing
  'fluid-spacing-01': theme.spacing['2'], // 8px
  'fluid-spacing-02': theme.spacing['4'], // 16px
  'fluid-spacing-03': theme.spacing['6'], // 24px
  'fluid-spacing-04': theme.spacing['8'], // 32px
  
} as const;

// =====================================================
// TYPOGRAPHY TOKENS - Following Carbon DS type system
// =====================================================

export const typographyTokens = {
  // Font families
  'font-family-primary': theme.typography.fontFamily.primary,
  'font-family-mono': theme.typography.fontFamily.monospace,
  'font-family-serif': theme.typography.fontFamily.serif,
  
  // Font weights
  'font-weight-light': theme.typography.fontWeight.light,
  'font-weight-regular': theme.typography.fontWeight.normal,
  'font-weight-medium': theme.typography.fontWeight.medium,
  'font-weight-semibold': theme.typography.fontWeight.semibold,
  'font-weight-bold': theme.typography.fontWeight.bold,
  
  // Body styles (following Carbon DS naming)
  'body-compact-01': {
    fontSize: theme.typography.fontSize.small,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: theme.typography.lineHeight.small,
  },
  'body-compact-02': {
    fontSize: theme.typography.fontSize.regular,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: theme.typography.lineHeight.regular,
  },
  'body-01': {
    fontSize: theme.typography.fontSize.regular,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: theme.typography.lineHeight.regular,
  },
  'body-02': {
    fontSize: theme.typography.fontSize.large,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: theme.typography.lineHeight.large,
  },
  
  // Heading styles
  'heading-compact-01': {
    fontSize: theme.typography.fontSize.small,
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight: theme.typography.lineHeight.small,
  },
  'heading-compact-02': {
    fontSize: theme.typography.fontSize.regular,
    fontWeight: theme.typography.fontWeight.semibold,
    lineHeight: theme.typography.lineHeight.regular,
  },
  'heading-01': theme.typography.titles.title1,
  'heading-02': theme.typography.titles.title2,
  'heading-03': theme.typography.titles.title3,
  'heading-04': theme.typography.titles.title4,
  'heading-05': theme.typography.titles.title5,
  'heading-06': theme.typography.titles.title6,
  'heading-07': theme.typography.titles.title7,
  
  // Utility styles
  'label-01': {
    fontSize: theme.typography.fontSize.mini,
    fontWeight: theme.typography.fontWeight.medium,
    lineHeight: theme.typography.lineHeight.small,
  },
  'label-02': {
    fontSize: theme.typography.fontSize.small,
    fontWeight: theme.typography.fontWeight.medium,
    lineHeight: theme.typography.lineHeight.small,
  },
  'helper-text-01': {
    fontSize: theme.typography.fontSize.mini,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: theme.typography.lineHeight.small,
  },
  'helper-text-02': {
    fontSize: theme.typography.fontSize.small,
    fontWeight: theme.typography.fontWeight.normal,
    lineHeight: theme.typography.lineHeight.small,
  },
  'code-01': {
    fontSize: theme.typography.fontSize.mini,
    fontWeight: theme.typography.fontWeight.normal,
    fontFamily: theme.typography.fontFamily.monospace,
  },
  'code-02': {
    fontSize: theme.typography.fontSize.small,
    fontWeight: theme.typography.fontWeight.normal,
    fontFamily: theme.typography.fontFamily.monospace,
  },
  
} as const;

// =====================================================
// SIZE TOKENS - Following Salt DS size system
// =====================================================

export const sizeTokens = {
  // Base size scale
  'size-base': '20px', // Base component height
  'size-selectable': '12px', // For checkboxes, radio buttons
  'size-icon': '16px', // Standard icon size
  'size-icon-small': '12px',
  'size-icon-large': '20px',
  'size-icon-xlarge': '24px',
  
  // Component heights
  'height-xs': '24px',
  'height-sm': '32px',
  'height-md': '36px', // Base height
  'height-lg': '40px',
  'height-xl': '48px',
  
  // Component widths
  'width-xs': '64px',
  'width-sm': '128px',
  'width-md': '256px',
  'width-lg': '512px',
  'width-xl': '768px',
  
  // Density variants
  'density-high': '28px',
  'density-medium': '32px',
  'density-low': '40px',
  'density-touch': '44px', // Minimum touch target
  
} as const;

// =====================================================
// BORDER RADIUS TOKENS
// =====================================================

export const borderRadiusTokens = {
  'radius-none': '0px',
  'radius-sm': theme.borderRadius['4'],
  'radius-md': theme.borderRadius['6'],
  'radius-lg': theme.borderRadius['8'],
  'radius-xl': theme.borderRadius['12'],
  'radius-2xl': theme.borderRadius['16'],
  'radius-3xl': theme.borderRadius['24'],
  'radius-full': theme.borderRadius.full,
  'radius-circle': theme.borderRadius.circle,
} as const;

// =====================================================
// SHADOW TOKENS
// =====================================================

export const shadowTokens = {
  'shadow-none': theme.shadows.none,
  'shadow-sm': theme.shadows.low,
  'shadow-md': theme.shadows.medium,
  'shadow-lg': theme.shadows.high,
  'shadow-xl': theme.shadows.stackLow,
} as const;

// =====================================================
// TRANSITION TOKENS
// =====================================================

export const transitionTokens = {
  // Duration
  'duration-fast-01': theme.transitions.duration.quick, // 0.1s
  'duration-fast-02': '0.15s',
  'duration-moderate-01': theme.transitions.duration.regular, // 0.25s
  'duration-moderate-02': '0.35s',
  'duration-slow-01': '0.5s',
  'duration-slow-02': '0.7s',
  
  // Easing
  'easing-standard': theme.transitions.easing.outQuad,
  'easing-entrance': theme.transitions.easing.outQuart,
  'easing-exit': theme.transitions.easing.inQuart,
  'easing-emphasized': theme.transitions.easing.inOutQuint,
  
  // Common combinations
  'motion-standard': `${theme.transitions.duration.regular} ${theme.transitions.easing.outQuad}`,
  'motion-entrance': `${theme.transitions.duration.regular} ${theme.transitions.easing.outQuart}`,
  'motion-exit': `${theme.transitions.duration.quick} ${theme.transitions.easing.inQuart}`,
  
} as const;

// =====================================================
// TOKEN ACCESS UTILITIES
// =====================================================

/**
 * Get a color token value
 * @param token - The color token name
 * @returns The color value
 */
export const getColorToken = (token: ColorToken): string => {
  return colorTokens[token];
};

/**
 * Get a spacing token value
 * @param token - The spacing token name
 * @returns The spacing value
 */
export const getSpacingToken = (token: SpacingToken): string => {
  return spacingTokens[token];
};

/**
 * Get a typography token value
 * @param token - The typography token name
 * @returns The typography configuration
 */
export const getTypographyToken = (token: TypographyToken) => {
  return typographyTokens[token];
};

/**
 * Get a size token value
 * @param token - The size token name
 * @returns The size value
 */
export const getSizeToken = (token: SizeToken): string => {
  return sizeTokens[token];
};

/**
 * Generate CSS custom properties from tokens
 * @returns Object with CSS custom properties
 */
export const generateTokenCSS = () => ({
  // Color tokens
  ...Object.fromEntries(
    Object.entries(colorTokens).map(([key, value]) => [`--salt-color-${key}`, value])
  ),
  // Spacing tokens
  ...Object.fromEntries(
    Object.entries(spacingTokens).map(([key, value]) => [`--salt-spacing-${key}`, value])
  ),
  // Size tokens
  ...Object.fromEntries(
    Object.entries(sizeTokens).map(([key, value]) => [`--salt-size-${key}`, value])
  ),
  // Border radius tokens
  ...Object.fromEntries(
    Object.entries(borderRadiusTokens).map(([key, value]) => [`--salt-radius-${key}`, value])
  ),
  // Shadow tokens
  ...Object.fromEntries(
    Object.entries(shadowTokens).map(([key, value]) => [`--salt-shadow-${key}`, value])
  ),
  // Transition tokens
  ...Object.fromEntries(
    Object.entries(transitionTokens).map(([key, value]) => [`--salt-motion-${key}`, value])
  ),
});

// =====================================================
// COMPONENT VARIANT TOKENS
// =====================================================

/**
 * Button variant token mapping following Carbon DS patterns
 */
export const buttonVariantTokens = {
  primary: {
    background: 'button-primary',
    color: 'text-inverse',
    border: 'button-primary',
    backgroundHover: 'button-primary-hover',
    backgroundActive: 'button-primary-active',
  },
  secondary: {
    background: 'button-secondary',
    color: 'text-primary',
    border: 'border-subtle',
    backgroundHover: 'button-secondary-hover',
    backgroundActive: 'layer-02',
  },
  tertiary: {
    background: 'button-tertiary',
    color: 'text-secondary',
    border: 'border-subtle',
    backgroundHover: 'button-tertiary-hover',
    backgroundActive: 'layer-01',
  },
  ghost: {
    background: 'button-tertiary',
    color: 'text-tertiary',
    border: 'transparent',
    backgroundHover: 'button-tertiary-hover',
    backgroundActive: 'layer-01',
  },
  danger: {
    background: 'button-danger',
    color: 'text-inverse',
    border: 'button-danger',
    backgroundHover: 'support-error',
    backgroundActive: 'support-error',
  },
} as const;

/**
 * Typography variant token mapping
 */
export const textVariantTokens = {
  'body-01': 'body-01',
  'body-02': 'body-02',
  'body-compact-01': 'body-compact-01',
  'body-compact-02': 'body-compact-02',
  'label-01': 'label-01',
  'label-02': 'label-02',
  'helper-text-01': 'helper-text-01',
  'helper-text-02': 'helper-text-02',
  'code-01': 'code-01',
  'code-02': 'code-02',
} as const;

// Export all tokens as a single object for convenience
export const tokens = {
  color: colorTokens,
  spacing: spacingTokens,
  typography: typographyTokens,
  size: sizeTokens,
  borderRadius: borderRadiusTokens,
  shadow: shadowTokens,
  transition: transitionTokens,
  buttonVariant: buttonVariantTokens,
  textVariant: textVariantTokens,
} as const;

export default tokens;