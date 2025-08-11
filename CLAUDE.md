# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Stella Clip**, a modern React component library built with Linear's design principles. It's a Next.js 15 project using TypeScript, Tailwind CSS v4, and a comprehensive design system based on Linear.app's aesthetic.

## Development Commands

```bash
# Development server (uses Turbopack for faster builds)
yarn dev

# Production build
yarn build

# Start production server
yarn start

# Lint code
yarn lint

# Install dependencies
yarn install

# Add new dependencies
yarn add <package-name>

# Add dev dependencies
yarn add -D <package-name>
```

## Architecture & Structure

### Design System Foundation
- **Theme Configuration**: `theme.json` contains the complete design system with colors, typography, spacing, shadows, and component definitions extracted from Linear.app
- **Theme Utilities**: `src/lib/theme.ts` provides TypeScript-safe access to theme values with utility functions like `getColor()`, `getSpacing()`, etc.
- **CSS Variables**: The theme system generates CSS variables (e.g., `--color-bg-primary`, `--color-text-secondary`) for consistent styling

### Component Architecture
- **Component Location**: All UI components in `src/components/ui/`
- **Barrel Exports**: Each component folder has an `index.ts` for clean imports
- **Component Structure**: Components follow a consistent pattern:
  - TypeScript interfaces for props
  - Variant-based styling using `cn()` utility (clsx + tailwind-merge)
  - Forwardable refs for proper composition
  - Support for `asChild` pattern where applicable

### Key Components
- **Layout**: `Container`, `Stack`, `Grid` for responsive layouts
- **Typography**: `Heading`, `Text`, `Code`, `Link` with semantic sizing (title1-title9, micro-large)
- **Form Elements**: `Input`, `Textarea`, `Label`, `FormField` with validation states
- **Interactive**: `Button`, `IconButton` with multiple variants and states
- **Display**: `Card`, `Badge`, `Avatar`, `Separator` for content organization
- **Video Components**: Specialized `VideoCard`, `VideoGrid` components

### Styling Approach
- **Tailwind CSS v4**: Uses `@tailwindcss/postcss` plugin
- **CSS Variables**: Extensive use of CSS custom properties for theming
- **Responsive Design**: Mobile-first approach with consistent breakpoints
- **Dark Theme**: Built-in dark theme support with Linear's color palette

### Import Patterns
- Use `@/components/ui` for component imports (barrel export)
- Theme utilities from `@/lib/theme` and `@/lib/utils`
- Components support both controlled and uncontrolled patterns

### Component Composition
- Components use `cn()` utility for className merging
- Many components support `asChild` prop for composition patterns
- Consistent prop naming: `variant`, `size`, `color`, `spacing`
- Form components integrate with validation patterns

## Pages Structure
- **Home Page** (`src/app/page.tsx`): Marketing landing page showcasing the design system
- **Demo Page** (`src/app/demo/page.tsx`): Comprehensive component showcase with all variants and states
- **Video Demo** (`src/app/video-demo/page.tsx`): Video-specific component demonstrations

## Development Guidelines

### Theme Usage
- Always use theme values through CSS variables or theme utilities
- Reference the `theme.json` for available tokens
- Use semantic color names (primary, secondary, tertiary) over specific hex values

### Component Development
- Follow existing component patterns for consistency
- Use TypeScript interfaces for all props
- Support common props: `className`, `children`, size/variant systems
- Implement proper focus and accessibility states

### Styling Conventions
- Use Tailwind utility classes with CSS variables
- Follow the established spacing scale (xs, sm, md, lg, xl, xxl)
- Maintain consistency with Linear's design language

The project demonstrates a production-ready component library with careful attention to design consistency, TypeScript safety, and developer experience.

---

## Claude Development Rules for Stella Clip

### 1. FSD Architecture Compliance (Feature-Sliced Design)

**MANDATORY:** Always follow the established FSD structure:

```
src/
├── app/           # Next.js App Router pages & API routes
├── entities/      # Business entities (user, video, playlist, comment, tag)
├── features/      # Isolated business features (empty - use for new features)
├── shared/        # Reusable code shared across the application
│   ├── api/       # API clients and configurations  
│   ├── config/    # Environment and configuration
│   ├── lib/       # Utilities, helpers, and core functions
│   └── ui/        # Design system components
├── views/         # Page compositions and layouts
└── widgets/       # Complex UI blocks (empty - use for new widgets)
```

**Component Creation Rules:**
- **shared/ui/**: Only pure, reusable UI components
- **entities/**: Domain-specific business logic and API calls
- **features/**: Complete feature implementations
- **views/**: Page-level compositions using shared/ui components
- **widgets/**: Complex reusable UI blocks

### 2. Library & Technology Stack (USE ONLY THESE)

**Core Framework:**
- Next.js 15.4.5 with App Router
- React 19.1.0 
- TypeScript 5

**Styling:**
- Tailwind CSS v4 (with @tailwindcss/postcss plugin)
- CSS Variables from theme.json (Linear design system)
- `clsx` + `tailwind-merge` via `cn()` utility

**State & Data:**
- Zustand (global state management)
- @tanstack/react-query (server state)
- Prisma (database ORM)
- Supabase (database & authentication)

**FORBIDDEN:** Do not install new libraries without explicit user permission.

### 3. Design System Usage (MANDATORY)

**Theme System:**
- **ALWAYS** use CSS variables from theme.json: `var(--color-bg-primary)`
- **NEVER** use hardcoded colors like `#ffffff` or `bg-white`
- Use theme utilities from `@/shared/lib/theme`

**Component Styling:**
- Use centralized class generators from `@/shared/lib/component-classes`
- Follow variant-based styling patterns
- Support size, color, and variant props consistently

**Typography Scale:**
```typescript
// Use semantic sizes from theme.json
size: 'micro' | 'tiny' | 'mini' | 'small' | 'regular' | 'large' 
     | 'title1' | 'title2' | 'title3' | 'title4' | 'title5' 
     | 'title6' | 'title7' | 'title8' | 'title9'
```

### 4. Component Development Guidelines

**PRIORITY ORDER for Implementation:**
1. **Check existing components** in `/src/shared/ui/` first
2. **Extend existing components** with new props/variants
3. **Create new components** only if absolutely necessary

**Available Components (USE THESE FIRST):**

**Layout & Structure:**
- `Container`, `Stack`, `Grid` - Layout primitives
- `Card`, `CardHeader`, `CardContent`, `CardFooter` - Content containers
- `Separator`, `Spacer` - Visual spacing

**Typography:**
- `Heading` (h1-h6 with semantic sizing)
- `Text` (paragraphs with size/weight variants)  
- `Code` (inline code display)
- `Link` (navigation links)

**Interactive Elements:**
- `Button` (primary, secondary, ghost, etc.)
- `IconButton` (compact button for icons)
- `Input`, `Textarea` - Form inputs
- `FormField`, `Label` - Form composition

**Display Components:**
- `Badge` - Status indicators
- `Avatar` - User profile images
- `Skeleton` - Loading states
- `ProgressBar` - Progress indication

**Video-Specific:**
- `VideoCard` - Video thumbnails with metadata
- `YouTubePlayer` - YouTube video playback
- `VideoGrid` - Grid layouts for videos
- `VideoCardWithPanel` - Cards with slide-out details
- `VideoDetailPanel` - Detailed video information

**Specialized:**
- `HeroSection` - Landing page hero sections
- `CategorySection` - Categorized content display
- `SearchBar` - Search functionality
- `URLInput` - URL input with validation
- `SlidePanel` - Sliding side panels
- `Playlist` - Playlist management

### 5. Component API Patterns

**Standard Props (include these in ALL components):**
```typescript
interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  variant?: string;      // Component style variants
  size?: string;         // Size variants (xs, sm, md, lg, xl)
  asChild?: boolean;     // Polymorphic component pattern
}
```

**Styling Props:**
```typescript
// Use centralized class generators
import { getButtonClasses, cn } from '@/shared/lib/component-classes';

const className = cn(
  getButtonClasses(variant, size, fullWidth, loading),
  className
);
```

### 6. Import Rules

**REQUIRED Import Patterns:**
```typescript
// Shared UI Components (barrel exports)
import { Button, Text, Stack } from '@/shared/ui';

// Utilities and helpers
import { cn } from '@/shared/lib/utils';
import { getColor, getSpacing } from '@/shared/lib/theme';

// Business entities
import { VideoAPI } from '@/entities/video';
import { UserAPI } from '@/entities/user';
```

**Path Aliases:**
- `@/shared/ui` - UI components
- `@/shared/lib` - Utilities and helpers  
- `@/entities` - Business entities
- `@/features` - Feature implementations
- `@/views` - Page compositions

### 7. Development Workflow

**Before Creating New Components:**
1. Check existing components in `/src/shared/ui/index.ts`
2. Review similar components for patterns
3. Use theme.json values for all styling
4. Follow TypeScript patterns from existing components

**Component Development Process:**
1. Create component file with proper TypeScript interfaces
2. Use forwardRef for DOM element access
3. Support barrel exports via index.ts
4. Test with existing pages (demo, slide-panel-demo, video-demo)

**Code Quality Requirements:**
- Run `yarn lint` and fix all issues
- Use semantic HTML elements
- Support keyboard navigation and accessibility
- Follow React 19 patterns and concurrent features

### 8. Database & API Integration

**Prisma Schema Usage:**
- Use existing entities: Video, User, Playlist, Comment, Tag
- Extend schema through migrations, don't modify directly
- Use centralized API calls from entities/

**Supabase Integration:**
- Authentication via `@/shared/lib/supabase/`
- Row Level Security policies
- Real-time subscriptions for live features

### 9. Forbidden Practices

**DO NOT:**
- Install new npm packages without permission
- Create duplicate components (check existing first)
- Use hardcoded colors or spacing values
- Modify theme.json without user approval
- Break FSD architecture patterns
- Create files outside the established structure
- Use non-TypeScript files for components

### 10. Testing & Quality Assurance

**Required Commands:**
```bash
yarn lint          # Fix ESLint issues
yarn build         # Ensure production builds
yarn dev           # Test in development
```

**Test Pages Available:**
- `/` - Home page with video grid
- `/demo` - Component showcase
- `/slide-panel-demo` - Panel interactions
- `/video-demo` - Video-specific features

**Performance Considerations:**
- Use Next.js Image component for images
- Implement proper loading states
- Support SSR and client-side rendering
- Optimize bundle size with proper imports

---

**SUMMARY:** Always use FSD architecture, existing components, theme.json variables, and established patterns. Extend before creating new. Follow TypeScript and accessibility best practices. Run linting and builds before completion.