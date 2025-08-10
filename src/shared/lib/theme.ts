import themeConfig from '../../../theme.json';

export const theme = themeConfig;

// Type definitions
export interface ThemeColors {
  primary: string;
  primaryHover: string;
  accent: string;
  accentHover: string;
  accentTint: string;
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    quinary: string;
    level0: string;
    level1: string;
    level2: string;
    level3: string;
    marketing: string;
    translucent: string;
    tint: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
  };
  border: {
    primary: string;
    secondary: string;
    tertiary: string;
    translucent: string;
  };
  semantic: {
    red: string;
    orange: string;
    yellow: string;
    green: string;
    blue: string;
    indigo: string;
    white: string;
    black: string;
  };
}

// Utility functions
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let result: Record<string, unknown> = theme.colors;
  
  for (const key of keys) {
    result = result?.[key] as Record<string, unknown>;
  }
  
  return (result as unknown as string) || '';
};

export const getSpacing = (key: string): string => {
  const value = theme.spacing[key as keyof typeof theme.spacing];
  return typeof value === 'string' ? value : '';
};

export const getBorderRadius = (key: string): string => {
  return theme.borderRadius[key as keyof typeof theme.borderRadius] || '';
};

export const getFontSize = (key: string): string => {
  return theme.typography.fontSize[key as keyof typeof theme.typography.fontSize] || '';
};

export const getFontWeight = (key: string): string => {
  return theme.typography.fontWeight[key as keyof typeof theme.typography.fontWeight] || '';
};

export const getShadow = (key: string): string => {
  return theme.shadows[key as keyof typeof theme.shadows] || '';
};

export const getTransition = (type: 'duration' | 'easing', key: string): string => {
  return theme.transitions[type][key as keyof typeof theme.transitions[typeof type]] || '';
};

// CSS Variable generator
export const generateCSSVars = () => {
  return theme.cssVariables;
};

// Commonly used theme tokens
export const tokens = {
  colors: {
    primary: theme.colors.primary,
    accent: theme.colors.accent,
    bg: {
      primary: theme.colors.background.primary,
      secondary: theme.colors.background.secondary,
      tertiary: theme.colors.background.tertiary,
    },
    text: {
      primary: theme.colors.text.primary,
      secondary: theme.colors.text.secondary,
      tertiary: theme.colors.text.tertiary,
      quaternary: theme.colors.text.quaternary,
    },
    border: {
      primary: theme.colors.border.primary,
      secondary: theme.colors.border.secondary,
      tertiary: theme.colors.border.tertiary,
    },
    semantic: theme.colors.semantic,
  },
  spacing: theme.spacing,
  typography: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
    fontWeight: theme.typography.fontWeight,
    titles: theme.typography.titles,
  },
  borderRadius: theme.borderRadius,
  shadows: theme.shadows,
  transitions: theme.transitions,
  components: theme.components,
} as const;

export type Tokens = typeof tokens;