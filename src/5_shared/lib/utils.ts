import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Type definitions for component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface VariantProps {
  variant?: string;
  size?: string;
}

// Common prop types
export interface SpacingProps {
  m?: string | number;
  mt?: string | number;
  mr?: string | number;
  mb?: string | number;
  ml?: string | number;
  mx?: string | number;
  my?: string | number;
  p?: string | number;
  pt?: string | number;
  pr?: string | number;
  pb?: string | number;
  pl?: string | number;
  px?: string | number;
  py?: string | number;
}

// Generate spacing classes
export const generateSpacingClasses = (props: SpacingProps): string => {
  const classes: string[] = [];
  
  Object.entries(props).forEach(([key, value]) => {
    if (value !== undefined) {
      switch (key) {
        case 'm':
          classes.push(`m-[${value}]`);
          break;
        case 'mt':
          classes.push(`mt-[${value}]`);
          break;
        case 'mr':
          classes.push(`mr-[${value}]`);
          break;
        case 'mb':
          classes.push(`mb-[${value}]`);
          break;
        case 'ml':
          classes.push(`ml-[${value}]`);
          break;
        case 'mx':
          classes.push(`mx-[${value}]`);
          break;
        case 'my':
          classes.push(`my-[${value}]`);
          break;
        case 'p':
          classes.push(`p-[${value}]`);
          break;
        case 'pt':
          classes.push(`pt-[${value}]`);
          break;
        case 'pr':
          classes.push(`pr-[${value}]`);
          break;
        case 'pb':
          classes.push(`pb-[${value}]`);
          break;
        case 'pl':
          classes.push(`pl-[${value}]`);
          break;
        case 'px':
          classes.push(`px-[${value}]`);
          break;
        case 'py':
          classes.push(`py-[${value}]`);
          break;
      }
    }
  });
  
  return classes.join(' ');
};

// Format utils
export const formatValue = (value: string | number): string => {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
};