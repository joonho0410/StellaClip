/**
 * Standardized Component API System
 * Based on Carbon Design System and Salt DS patterns
 * 
 * This file provides consistent prop interfaces and patterns
 * that all components should follow for API consistency
 */

import React, { type ReactNode, type CSSProperties } from 'react';

// =====================================================
// BASE COMPONENT INTERFACES
// =====================================================

/**
 * Base props that all components should extend
 * Following Carbon DS conventions
 */
export interface BaseComponentProps {
  /** Custom CSS class name */
  className?: string;
  /** Custom inline styles */
  style?: CSSProperties;
  /** Child elements */
  children?: ReactNode;
  /** Unique identifier */
  id?: string;
  /** Test identifier for automation */
  'data-testid'?: string;
}

/**
 * Props for components that support forwarding to different elements
 */
export interface PolymorphicComponentProps extends BaseComponentProps {
  /** Element type to render as */
  as?: React.ElementType;
}

/**
 * Props for interactive components
 */
export interface InteractiveComponentProps extends BaseComponentProps {
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Aria label for accessibility */
  'aria-label'?: string;
  /** Aria described by for accessibility */
  'aria-describedby'?: string;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
}

/**
 * Props for components with loading states
 */
export interface LoadingComponentProps extends BaseComponentProps {
  /** Whether component is in loading state */
  loading?: boolean;
  /** Loading text for screen readers */
  loadingText?: string;
}

/**
 * Props for components with selection states
 */
export interface SelectableComponentProps extends InteractiveComponentProps {
  /** Whether component is selected */
  selected?: boolean;
  /** Callback when selection changes */
  onSelectionChange?: (selected: boolean) => void;
}

// =====================================================
// SIZE SYSTEM INTERFACES
// =====================================================

/**
 * Standard size variants following Carbon DS patterns
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Dense size variants for compact layouts
 */
export type DenseComponentSize = 'compact' | 'normal' | 'spacious';

/**
 * Props for components with size variants
 */
export interface SizedComponentProps extends BaseComponentProps {
  /** Component size variant */
  size?: ComponentSize;
}

/**
 * Props for components with density variants
 */
export interface DenseComponentProps extends BaseComponentProps {
  /** Component density variant */
  density?: DenseComponentSize;
}

// =====================================================
// VARIANT SYSTEM INTERFACES
// =====================================================

/**
 * Standard semantic variants
 */
export type SemanticVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';

/**
 * Button-specific variants following Carbon DS patterns
 */
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';

/**
 * Input-specific variants
 */
export type InputVariant = 'default' | 'error' | 'success';

/**
 * Props for components with semantic variants
 */
export interface SemanticComponentProps extends BaseComponentProps {
  /** Semantic variant */
  variant?: SemanticVariant;
}

// =====================================================
// LAYOUT SYSTEM INTERFACES
// =====================================================

/**
 * Spacing tokens for consistent spacing
 */
export type SpacingValue = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/**
 * Alignment options
 */
export type AlignmentValue = 'start' | 'center' | 'end' | 'stretch';

/**
 * Justification options
 */
export type JustificationValue = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

/**
 * Props for layout components
 */
export interface LayoutComponentProps extends BaseComponentProps {
  /** Spacing between child elements */
  gap?: SpacingValue;
  /** Padding inside the component */
  padding?: SpacingValue;
  /** Margin outside the component */
  margin?: SpacingValue;
}

/**
 * Props for flex layout components
 */
export interface FlexLayoutProps extends LayoutComponentProps {
  /** Flex direction */
  direction?: 'row' | 'column';
  /** Cross-axis alignment */
  align?: AlignmentValue;
  /** Main-axis justification */
  justify?: JustificationValue;
  /** Whether to wrap flex items */
  wrap?: boolean;
}

/**
 * Props for grid layout components
 */
export interface GridLayoutProps extends LayoutComponentProps {
  /** Number of columns */
  cols?: number;
  /** Number of rows */
  rows?: number;
  /** Responsive column definitions */
  colsSmall?: number;
  colsMedium?: number;
  colsLarge?: number;
  colsXLarge?: number;
}

// =====================================================
// TYPOGRAPHY SYSTEM INTERFACES
// =====================================================

/**
 * Typography size variants
 */
export type TypographySize = 'micro' | 'tiny' | 'mini' | 'small' | 'regular' | 'large';

/**
 * Typography weight variants
 */
export type TypographyWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

/**
 * Typography color variants
 */
export type TypographyColor = 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'accent' | 'success' | 'warning' | 'danger' | 'inverse';

/**
 * Typography alignment variants
 */
export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

/**
 * Typography family variants
 */
export type TypographyFamily = 'primary' | 'monospace' | 'serif';

/**
 * Props for typography components
 */
export interface TypographyComponentProps extends PolymorphicComponentProps {
  /** Typography size */
  size?: TypographySize;
  /** Typography weight */
  weight?: TypographyWeight;
  /** Typography color */
  color?: TypographyColor;
  /** Text alignment */
  align?: TypographyAlign;
  /** Font family */
  family?: TypographyFamily;
  /** Whether to truncate text */
  truncate?: boolean;
}

// =====================================================
// FORM SYSTEM INTERFACES
// =====================================================

/**
 * Base props for form controls
 */
export interface FormControlProps extends InteractiveComponentProps {
  /** Form control name */
  name?: string;
  /** Form control value */
  value?: string | number | boolean;
  /** Default value for uncontrolled components */
  defaultValue?: string | number | boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is read-only */
  readOnly?: boolean;
  /** Error message */
  error?: string | boolean;
  /** Helper text */
  helperText?: string;
  /** Field size */
  size?: ComponentSize;
  /** Field variant */
  variant?: InputVariant;
}

/**
 * Props for text input components
 */
export interface TextInputProps extends FormControlProps {
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'url' | 'tel' | 'search';
  /** Placeholder text */
  placeholder?: string;
  /** Maximum length */
  maxLength?: number;
  /** Minimum length */
  minLength?: number;
  /** Input pattern for validation */
  pattern?: string;
  /** Autocomplete hint */
  autoComplete?: string;
  /** Left icon or adornment */
  leftIcon?: ReactNode;
  /** Right icon or adornment */
  rightIcon?: ReactNode;
  /** Change event handler */
  onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Blur event handler */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Focus event handler */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

/**
 * Props for select components
 */
export interface SelectProps extends FormControlProps {
  /** Select options */
  options: Array<{
    label: string;
    value: string | number;
    disabled?: boolean;
  }>;
  /** Placeholder text */
  placeholder?: string;
  /** Whether multiple selection is allowed */
  multiple?: boolean;
  /** Change event handler */
  onChange?: (value: string | number | Array<string | number>) => void;
}

// =====================================================
// BUTTON SYSTEM INTERFACES
// =====================================================

/**
 * Props for button components
 */
export interface ButtonComponentProps extends InteractiveComponentProps, LoadingComponentProps {
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ComponentSize;
  /** Whether button takes full width */
  fullWidth?: boolean;
  /** Left icon */
  leftIcon?: ReactNode;
  /** Right icon */
  rightIcon?: ReactNode;
  /** Button type for forms */
  type?: 'button' | 'submit' | 'reset';
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Whether to render as child element (for composition) */
  asChild?: boolean;
}

/**
 * Props for icon button components
 */
export interface IconButtonProps extends Omit<ButtonComponentProps, 'leftIcon' | 'rightIcon' | 'children'> {
  /** Icon to display */
  icon: ReactNode;
  /** Accessible label (required for icon-only buttons) */
  'aria-label': string;
}

// =====================================================
// FEEDBACK SYSTEM INTERFACES
// =====================================================

/**
 * Status types for feedback components
 */
export type StatusType = 'info' | 'success' | 'warning' | 'error';

/**
 * Props for status indicator components
 */
export interface StatusComponentProps extends BaseComponentProps {
  /** Status type */
  status?: StatusType;
  /** Status message */
  message?: string;
  /** Whether to show icon */
  showIcon?: boolean;
  /** Custom icon */
  icon?: ReactNode;
}

/**
 * Props for notification components
 */
export interface NotificationProps extends StatusComponentProps {
  /** Notification title */
  title?: string;
  /** Whether notification can be dismissed */
  dismissible?: boolean;
  /** Auto-dismiss timeout in milliseconds */
  timeout?: number;
  /** Dismiss callback */
  onDismiss?: () => void;
  /** Action buttons */
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: ButtonVariant;
  }>;
}

// =====================================================
// OVERLAY SYSTEM INTERFACES
// =====================================================

/**
 * Placement options for floating elements
 */
export type PlacementValue = 
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

/**
 * Props for floating/overlay components
 */
export interface FloatingComponentProps extends BaseComponentProps {
  /** Whether the overlay is open */
  open?: boolean;
  /** Default open state for uncontrolled components */
  defaultOpen?: boolean;
  /** Placement relative to trigger */
  placement?: PlacementValue;
  /** Offset from trigger */
  offset?: number;
  /** Whether to flip when overflowing */
  flip?: boolean;
  /** Whether overlay can be dismissed by clicking outside */
  dismissible?: boolean;
  /** Open state change callback */
  onOpenChange?: (open: boolean) => void;
  /** Trigger element */
  trigger?: ReactNode;
}

/**
 * Props for modal/dialog components
 */
export interface ModalComponentProps extends BaseComponentProps {
  /** Whether modal is open */
  open?: boolean;
  /** Modal title */
  title?: string;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Whether modal can be dismissed */
  dismissible?: boolean;
  /** Close callback */
  onClose?: () => void;
  /** Modal header content */
  header?: ReactNode;
  /** Modal footer content */
  footer?: ReactNode;
}

// =====================================================
// MEDIA SYSTEM INTERFACES
// =====================================================

/**
 * Aspect ratio options
 */
export type AspectRatio = '1:1' | '4:3' | '16:9' | '21:9';

/**
 * Props for media components
 */
export interface MediaComponentProps extends BaseComponentProps {
  /** Media source URL */
  src: string;
  /** Alternative text */
  alt?: string;
  /** Aspect ratio */
  aspectRatio?: AspectRatio;
  /** Loading state */
  loading?: 'lazy' | 'eager';
  /** Placeholder content */
  placeholder?: ReactNode;
  /** Error fallback content */
  fallback?: ReactNode;
}


// =====================================================
// DATA DISPLAY INTERFACES
// =====================================================

/**
 * Props for card components
 */
export interface CardComponentProps extends BaseComponentProps {
  /** Card variant */
  variant?: 'default' | 'elevated' | 'outlined';
  /** Whether card is interactive */
  interactive?: boolean;
  /** Card header content */
  header?: ReactNode;
  /** Card footer content */
  footer?: ReactNode;
  /** Card media content */
  media?: ReactNode;
  /** Click handler for interactive cards */
  onClick?: (event: React.MouseEvent) => void;
}

/**
 * Props for badge components
 */
export interface BadgeComponentProps extends BaseComponentProps {
  /** Badge variant */
  variant?: SemanticVariant;
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Badge content */
  content?: ReactNode;
  /** Whether badge has dot style */
  dot?: boolean;
  /** Badge count (for numeric badges) */
  count?: number;
  /** Maximum count to display */
  max?: number;
}

/**
 * Props for avatar components
 */
export interface AvatarComponentProps extends BaseComponentProps {
  /** Avatar image source */
  src?: string;
  /** Avatar alt text */
  alt?: string;
  /** Avatar size */
  size?: ComponentSize;
  /** Avatar shape */
  shape?: 'circle' | 'square';
  /** Fallback initials */
  initials?: string;
  /** Fallback icon */
  icon?: ReactNode;
  /** Whether avatar is clickable */
  clickable?: boolean;
  /** Click handler */
  onClick?: (event: React.MouseEvent) => void;
}

// =====================================================
// NAVIGATION INTERFACES
// =====================================================

/**
 * Props for navigation item components
 */
export interface NavigationItemProps extends InteractiveComponentProps {
  /** Navigation item href */
  href?: string;
  /** Whether item is active */
  active?: boolean;
  /** Navigation item icon */
  icon?: ReactNode;
  /** Badge or count indicator */
  badge?: ReactNode;
  /** Click handler */
  onClick?: (event: React.MouseEvent) => void;
}

/**
 * Props for breadcrumb components
 */
export interface BreadcrumbProps extends BaseComponentProps {
  /** Breadcrumb items */
  items: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: ReactNode;
  }>;
  /** Separator between items */
  separator?: ReactNode;
  /** Maximum items to show */
  maxItems?: number;
}

// =====================================================
// UTILITY TYPES
// =====================================================

/**
 * Event handler types
 */
export type EventHandler<T = Element, E = Event> = (event: E & { currentTarget: T }) => void;

/**
 * Ref types for forwarded components
 */
export type ComponentRef<T = HTMLElement> = React.Ref<T>;

/**
 * Props with ref forwarding
 */
export type ForwardedProps<T = HTMLElement, P = Record<string, unknown>> = P & {
  ref?: ComponentRef<T>;
};

/**
 * Component factory type
 */
export type ComponentFactory<P = Record<string, unknown>> = React.ForwardRefExoticComponent<P & React.RefAttributes<HTMLElement>>;

// =====================================================
// VALIDATION HELPERS
// =====================================================

/**
 * Validate component props at runtime (development only)
 */
export const validateComponentProps = <T extends BaseComponentProps>(
  props: T,
  componentName: string,
  requiredProps: Array<keyof T> = []
): void => {
  if (process.env.NODE_ENV !== 'development') return;
  
  // Check required props
  for (const prop of requiredProps) {
    if (props[prop] === undefined) {
      console.warn(`[${componentName}] Missing required prop: ${String(prop)}`);
    }
  }
  
  // Validate className is string
  if (props.className && typeof props.className !== 'string') {
    console.warn(`[${componentName}] className must be a string`);
  }
  
  // Validate children
  if (props.children !== undefined && props.children !== null && 
      typeof props.children !== 'string' && typeof props.children !== 'number' &&
      !React.isValidElement(props.children) && !Array.isArray(props.children)) {
    console.warn(`[${componentName}] Invalid children prop`);
  }
};

/**
 * Create component with standardized props validation
 */
export const createComponent = <T extends BaseComponentProps>(
  componentName: string,
  component: React.ComponentType<T>,
  requiredProps: Array<keyof T> = []
): React.ComponentType<T> => {
  const Component = (props: T) => {
    validateComponentProps(props, componentName, requiredProps);
    return React.createElement(component, props);
  };
  
  Component.displayName = componentName;
  return Component;
};

// Type interfaces cannot be exported as values, only as types
// Components using these interfaces should import them directly as types