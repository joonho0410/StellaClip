'use client';

import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Input,
  Textarea,
  Label,
  FormField,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Container,
  Stack,
  Grid,
  Text,
  Heading,
  Code,
  Link,
  Spacer,
  Separator,
  Badge,
  HeroSection,
} from '@/shared/ui';

// Simple icons for demo
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function ComponentDemo() {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoadingTest = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Hero Section */}
      <HeroSection
        badge={<Badge variant="success">New Components</Badge>}
        subtitle="Design System"
        title="Stella Clip Component Library"
        description="A comprehensive, reusable component system built with Linear's design principles. Create beautiful, consistent interfaces with our TypeScript-first component library."
        primaryAction={{
          label: "Explore Components",
          onClick: () => document.getElementById('components')?.scrollIntoView({ behavior: 'smooth' })
        }}
        secondaryAction={{
          label: "View GitHub",
          onClick: () => window.open('https://github.com', '_blank')
        }}
        variant="centered"
        size="lg"
      />

      {/* Demo Content */}
      <Container size="xl" className="py-12" id="components">
        <Stack spacing="xl">
          {/* Badge Section */}
          <Stack spacing="lg">
            <Heading as="h2" size="title3">Badges</Heading>
            
            <Card padding="lg">
              <Stack spacing="lg">
                <div>
                  <Text size="small" color="tertiary" weight="medium">BADGE VARIANTS</Text>
                  <Spacer size="sm" />
                  <Stack direction="row" spacing="md" wrap>
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="danger">Danger</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </Stack>
                </div>

                <div>
                  <Text size="small" color="tertiary" weight="medium">BADGE SIZES</Text>
                  <Spacer size="sm" />
                  <Stack direction="row" spacing="md" align="center" wrap>
                    <Badge size="sm" variant="default">Small</Badge>
                    <Badge size="md" variant="secondary">Medium</Badge>
                    <Badge size="lg" variant="success">Large</Badge>
                  </Stack>
                </div>

                <div>
                  <Text size="small" color="tertiary" weight="medium">USAGE EXAMPLES</Text>
                  <Spacer size="sm" />
                  <Stack spacing="md">
                    <div className="flex items-center gap-2">
                      <Text>Status:</Text>
                      <Badge variant="success" size="sm">Active</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Text>Version:</Text>
                      <Badge variant="outline" size="sm">v2.1.0</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Text>Priority:</Text>
                      <Badge variant="warning" size="sm">High</Badge>
                    </div>
                  </Stack>
                </div>
              </Stack>
            </Card>
          </Stack>

          <Separator />

          {/* Typography Section */}
          <Stack spacing="lg">
            <Heading as="h2" size="title3">Typography</Heading>
            
            <Card padding="lg">
              <Stack spacing="md">
                <div>
                  <Text size="small" color="tertiary" weight="medium">HEADINGS</Text>
                  <Spacer size="sm" />
                  <Stack spacing="sm">
                    <Heading as="h1" size="title9">Title 9 - Display</Heading>
                    <Heading as="h2" size="title6">Title 6 - Hero</Heading>
                    <Heading as="h3" size="title4">Title 4 - Section</Heading>
                    <Heading as="h4" size="title2">Title 2 - Subsection</Heading>
                    <Heading as="h5" size="title1">Title 1 - Heading</Heading>
                  </Stack>
                </div>

                <Separator />

                <div>
                  <Text size="small" color="tertiary" weight="medium">TEXT SIZES</Text>
                  <Spacer size="sm" />
                  <Stack spacing="sm">
                    <Text size="large">Large text - for emphasis and large UI elements</Text>
                    <Text size="regular">Regular text - the most common size for body text</Text>
                    <Text size="small">Small text - for secondary information and labels</Text>
                    <Text size="mini">Mini text - for captions and fine print</Text>
                    <Text size="tiny">Tiny text - for the smallest UI elements</Text>
                  </Stack>
                </div>

                <Separator />

                <div>
                  <Text size="small" color="tertiary" weight="medium">TEXT COLORS & WEIGHTS</Text>
                  <Spacer size="sm" />
                  <Stack spacing="sm">
                    <Text color="primary" weight="bold">Primary text - Bold</Text>
                    <Text color="secondary" weight="semibold">Secondary text - Semibold</Text>
                    <Text color="tertiary" weight="medium">Tertiary text - Medium</Text>
                    <Text color="quaternary" weight="normal">Quaternary text - Normal</Text>
                    <Text color="accent" weight="medium">Accent text - Medium</Text>
                    <Text color="success" weight="medium">Success text - Medium</Text>
                    <Text color="warning" weight="medium">Warning text - Medium</Text>
                    <Text color="danger" weight="medium">Danger text - Medium</Text>
                  </Stack>
                </div>

                <Separator />

                <div>
                  <Text size="small" color="tertiary" weight="medium">CODE & LINKS</Text>
                  <Spacer size="sm" />
                  <Stack spacing="sm">
                    <Text>
                      Here&apos;s some inline code: <Code variant="inline">npm install stella-clip</Code>
                    </Text>
                    <Code as="pre" variant="block">
{`// Block code example
const theme = {
  colors: {
    primary: '#5E6AD2',
    background: '#08090A'
  }
};`}
                    </Code>
                    <Text>
                      Visit our <Link href="#" color="primary">documentation</Link> or check out the{' '}
                      <Link href="https://github.com" external>GitHub repository</Link>
                    </Text>
                  </Stack>
                </div>
              </Stack>
            </Card>
          </Stack>

          {/* Buttons Section */}
          <Stack spacing="lg">
            <Heading as="h2" size="title3">Buttons</Heading>
            
            <Card padding="lg">
              <Stack spacing="lg">
                <div>
                  <Text size="small" color="tertiary" weight="medium">BUTTON VARIANTS</Text>
                  <Spacer size="sm" />
                  <Stack direction="row" spacing="md" wrap>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="tertiary">Tertiary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                  </Stack>
                </div>

                <div>
                  <Text size="small" color="tertiary" weight="medium">BUTTON SIZES</Text>
                  <Spacer size="sm" />
                  <Stack direction="row" spacing="md" align="center" wrap>
                    <Button size="xs">Extra Small</Button>
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                  </Stack>
                </div>

                <div>
                  <Text size="small" color="tertiary" weight="medium">BUTTON STATES</Text>
                  <Spacer size="sm" />
                  <Stack direction="row" spacing="md" wrap>
                    <Button variant="primary" leftIcon={<PlusIcon />}>
                      With Left Icon
                    </Button>
                    <Button variant="secondary" rightIcon={<SearchIcon />}>
                      With Right Icon
                    </Button>
                    <Button variant="primary" loading={loading} onClick={handleLoadingTest}>
                      {loading ? 'Loading...' : 'Test Loading'}
                    </Button>
                    <Button variant="tertiary" disabled>
                      Disabled
                    </Button>
                  </Stack>
                </div>

                <div>
                  <Text size="small" color="tertiary" weight="medium">ICON BUTTONS</Text>
                  <Spacer size="sm" />
                  <Stack direction="row" spacing="md" align="center" wrap>
                    <IconButton variant="primary" icon={<PlusIcon />} size="xs" />
                    <IconButton variant="secondary" icon={<SearchIcon />} size="sm" />
                    <IconButton variant="tertiary" icon={<HeartIcon />} size="md" />
                    <IconButton variant="ghost" icon={<GithubIcon />} size="lg" />
                    <IconButton variant="danger" icon={<PlusIcon />} size="xl" />
                  </Stack>
                </div>

                <div>
                  <Text size="small" color="tertiary" weight="medium">FULL WIDTH</Text>
                  <Spacer size="sm" />
                  <Button variant="primary" fullWidth>
                    Full Width Button
                  </Button>
                </div>
              </Stack>
            </Card>
          </Stack>

          {/* Form Elements Section */}
          <Stack spacing="lg">
            <Heading as="h2" size="title3">Form Elements</Heading>
            
            <Card padding="lg">
              <Stack spacing="lg">
                <div>
                  <Text size="small" color="tertiary" weight="medium">INPUT VARIANTS</Text>
                  <Spacer size="sm" />
                  <Stack spacing="md">
                    <FormField>
                      <Label>Default Input</Label>
                      <Input 
                        placeholder="Enter your text here..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                    </FormField>
                    
                    <FormField>
                      <Label>Filled Input</Label>
                      <Input variant="filled" placeholder="Filled variant" />
                    </FormField>
                    
                    <FormField>
                      <Label>Ghost Input</Label>
                      <Input variant="ghost" placeholder="Ghost variant" />
                    </FormField>
                  </Stack>
                </div>

                <div>
                  <Text size="small" color="tertiary" weight="medium">INPUT SIZES</Text>
                  <Spacer size="sm" />
                  <Stack spacing="md">
                    <Input inputSize="sm" placeholder="Small input" />
                    <Input inputSize="md" placeholder="Medium input" />
                    <Input inputSize="lg" placeholder="Large input" />
                  </Stack>
                </div>

                <div>
                  <Text size="small" color="tertiary" weight="medium">INPUT STATES</Text>
                  <Spacer size="sm" />
                  <Stack spacing="md">
                    <FormField>
                      <Label>With Icons</Label>
                      <Input 
                        leftIcon={<SearchIcon />}
                        rightIcon={<HeartIcon />}
                        placeholder="Search with icons..."
                      />
                    </FormField>
                    
                    <FormField error="This field is required">
                      <Label required>Error State</Label>
                      <Input error placeholder="This input has an error" />
                    </FormField>
                    
                    <FormField helperText="This is a helpful message">
                      <Label>With Helper Text</Label>
                      <Input placeholder="Input with helper text" />
                    </FormField>
                    
                    <FormField>
                      <Label>Disabled Input</Label>
                      <Input disabled placeholder="This input is disabled" />
                    </FormField>
                  </Stack>
                </div>

                <div>
                  <Text size="small" color="tertiary" weight="medium">TEXTAREA</Text>
                  <Spacer size="sm" />
                  <Stack spacing="md">
                    <FormField>
                      <Label>Default Textarea</Label>
                      <Textarea 
                        placeholder="Enter your message here..."
                        rows={4}
                        value={textareaValue}
                        onChange={(e) => setTextareaValue(e.target.value)}
                      />
                    </FormField>
                    
                    <FormField>
                      <Label>Filled Textarea</Label>
                      <Textarea 
                        variant="filled"
                        placeholder="Filled textarea variant"
                        rows={3}
                      />
                    </FormField>
                  </Stack>
                </div>
              </Stack>
            </Card>
          </Stack>

          {/* Cards Section */}
          <Stack spacing="lg">
            <Heading as="h2" size="title3">Cards</Heading>
            
            <Grid cols={1} colsMedium={2} colsLarge={3} gap="lg">
              <Card variant="default">
                <CardHeader>
                  <Heading as="h3" size="title1">Default Card</Heading>
                  <Text color="secondary">This is a default card variant with primary styling.</Text>
                </CardHeader>
                <CardContent>
                  <Text>
                    Cards are versatile containers that can hold various types of content. 
                    They provide a clean way to group related information.
                  </Text>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm">Cancel</Button>
                  <Button variant="primary" size="sm">Action</Button>
                </CardFooter>
              </Card>

              <Card variant="outlined">
                <CardHeader>
                  <Heading as="h3" size="title1">Outlined Card</Heading>
                  <Text color="secondary">Transparent background with visible border.</Text>
                </CardHeader>
                <CardContent>
                  <Text>
                    Perfect for cards that need to blend with the background while maintaining 
                    clear boundaries.
                  </Text>
                </CardContent>
                <CardFooter justify="center">
                  <Button variant="secondary" size="sm" fullWidth>
                    Full Width Action
                  </Button>
                </CardFooter>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <Heading as="h3" size="title1">Elevated Card</Heading>
                  <Text color="secondary">Card with shadow for more prominence.</Text>
                </CardHeader>
                <CardContent>
                  <Text>
                    Elevated cards use shadows to create depth and hierarchy in your interface.
                  </Text>
                </CardContent>
                <CardFooter justify="between">
                  <IconButton variant="ghost" icon={<HeartIcon />} />
                  <Button variant="primary" size="sm">Save</Button>
                </CardFooter>
              </Card>

              <Card variant="ghost">
                <CardHeader>
                  <Heading as="h3" size="title1">Ghost Card</Heading>
                  <Text color="secondary">Minimal card with no background or border.</Text>
                </CardHeader>
                <CardContent>
                  <Text>
                    Ghost cards are perfect for subtle grouping without visual weight.
                  </Text>
                </CardContent>
              </Card>

              <Card variant="default" interactive>
                <CardHeader>
                  <Heading as="h3" size="title1">Interactive Card</Heading>
                  <Text color="secondary">Click me! This card has hover and focus states.</Text>
                </CardHeader>
                <CardContent>
                  <Text>
                    Interactive cards can be clicked and will show appropriate feedback states.
                  </Text>
                </CardContent>
              </Card>

              <Card variant="elevated" padding="xl">
                <CardHeader spacing="lg">
                  <Heading as="h3" size="title1">Custom Spacing</Heading>
                  <Text color="secondary">This card uses extra large padding and spacing.</Text>
                </CardHeader>
                <CardContent>
                  <Text>
                    You can customize padding and spacing to match your design needs.
                  </Text>
                </CardContent>
              </Card>
            </Grid>
          </Stack>

          {/* Layout Section */}
          <Stack spacing="lg">
            <Heading as="h2" size="title3">Layout Components</Heading>
            
            <Card padding="lg">
              <Stack spacing="lg">
                <div>
                  <Text size="small" color="tertiary" weight="medium">STACK LAYOUTS</Text>
                  <Spacer size="sm" />
                  <Stack spacing="md">
                    <Card variant="outlined" padding="md">
                      <Text size="small" weight="medium" color="secondary">Vertical Stack (default)</Text>
                      <Spacer size="xs" />
                      <Stack spacing="sm">
                        <div className="h-8 bg-[var(--color-accent)] rounded-md opacity-20"></div>
                        <div className="h-8 bg-[var(--color-accent)] rounded-md opacity-40"></div>
                        <div className="h-8 bg-[var(--color-accent)] rounded-md opacity-60"></div>
                      </Stack>
                    </Card>
                    
                    <Card variant="outlined" padding="md">
                      <Text size="small" weight="medium" color="secondary">Horizontal Stack</Text>
                      <Spacer size="xs" />
                      <Stack direction="row" spacing="sm">
                        <div className="w-16 h-8 bg-[var(--color-green)] rounded-md opacity-20"></div>
                        <div className="w-16 h-8 bg-[var(--color-green)] rounded-md opacity-40"></div>
                        <div className="w-16 h-8 bg-[var(--color-green)] rounded-md opacity-60"></div>
                      </Stack>
                    </Card>
                  </Stack>
                </div>

                <div>
                  <Text size="small" color="tertiary" weight="medium">GRID LAYOUTS</Text>
                  <Spacer size="sm" />
                  <Stack spacing="md">
                    <Card variant="outlined" padding="md">
                      <Text size="small" weight="medium" color="secondary">2 Column Grid</Text>
                      <Spacer size="xs" />
                      <Grid cols={2} gap="sm">
                        <div className="h-12 bg-[var(--color-blue)] rounded-md opacity-20"></div>
                        <div className="h-12 bg-[var(--color-blue)] rounded-md opacity-40"></div>
                        <div className="h-12 bg-[var(--color-blue)] rounded-md opacity-60"></div>
                        <div className="h-12 bg-[var(--color-blue)] rounded-md opacity-80"></div>
                      </Grid>
                    </Card>
                    
                    <Card variant="outlined" padding="md">
                      <Text size="small" weight="medium" color="secondary">Responsive Grid (1 → 2 → 4 columns)</Text>
                      <Spacer size="xs" />
                      <Grid cols={1} colsSmall={2} colsLarge={4} gap="sm">
                        <div className="h-12 bg-[var(--color-orange)] rounded-md opacity-20"></div>
                        <div className="h-12 bg-[var(--color-orange)] rounded-md opacity-40"></div>
                        <div className="h-12 bg-[var(--color-orange)] rounded-md opacity-60"></div>
                        <div className="h-12 bg-[var(--color-orange)] rounded-md opacity-80"></div>
                      </Grid>
                    </Card>
                  </Stack>
                </div>
              </Stack>
            </Card>
          </Stack>

          {/* Utility Components */}
          <Stack spacing="lg">
            <Heading as="h2" size="title3">Utility Components</Heading>
            
            <Card padding="lg">
              <Stack spacing="lg">
                <div>
                  <Text size="small" color="tertiary" weight="medium">SPACERS</Text>
                  <Spacer size="sm" />
                  <Card variant="outlined" padding="md">
                    <Text size="small">Item 1</Text>
                    <Spacer size="md" />
                    <Text size="small">Item 2 (with medium spacer above)</Text>
                    <Spacer size="xl" />
                    <Text size="small">Item 3 (with extra large spacer above)</Text>
                  </Card>
                </div>

                <div>
                  <Text size="small" color="tertiary" weight="medium">SEPARATORS</Text>
                  <Spacer size="sm" />
                  <Card variant="outlined" padding="md">
                    <Text size="small">Section 1</Text>
                    <Separator spacing="sm" />
                    <Text size="small">Section 2</Text>
                    <Separator spacing="lg" />
                    <Text size="small">Section 3</Text>
                  </Card>
                </div>
              </Stack>
            </Card>
          </Stack>

          {/* Color Palette */}
          <Stack spacing="lg">
            <Heading as="h2" size="title3">Color Palette</Heading>
            
            <Card padding="lg">
              <Stack spacing="lg">
                <div>
                  <Text size="small" color="tertiary" weight="medium">PRIMARY COLORS</Text>
                  <Spacer size="sm" />
                  <Grid cols={2} colsSmall={3} colsLarge={6} gap="sm">
                    <div className="text-center">
                      <div className="h-16 w-full bg-[var(--color-primary)] rounded-md mb-2"></div>
                      <Text size="tiny" color="secondary">Primary</Text>
                    </div>
                    <div className="text-center">
                      <div className="h-16 w-full bg-[var(--color-accent)] rounded-md mb-2"></div>
                      <Text size="tiny" color="secondary">Accent</Text>
                    </div>
                    <div className="text-center">
                      <div className="h-16 w-full bg-[var(--color-green)] rounded-md mb-2"></div>
                      <Text size="tiny" color="secondary">Success</Text>
                    </div>
                    <div className="text-center">
                      <div className="h-16 w-full bg-[var(--color-yellow)] rounded-md mb-2"></div>
                      <Text size="tiny" color="secondary">Warning</Text>
                    </div>
                    <div className="text-center">
                      <div className="h-16 w-full bg-[var(--color-red)] rounded-md mb-2"></div>
                      <Text size="tiny" color="secondary">Danger</Text>
                    </div>
                    <div className="text-center">
                      <div className="h-16 w-full bg-[var(--color-blue)] rounded-md mb-2"></div>
                      <Text size="tiny" color="secondary">Info</Text>
                    </div>
                  </Grid>
                </div>

                <div>
                  <Text size="small" color="tertiary" weight="medium">BACKGROUND COLORS</Text>
                  <Spacer size="sm" />
                  <Grid cols={2} colsSmall={3} colsLarge={5} gap="sm">
                    <div className="text-center">
                      <div className="h-16 w-full bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] rounded-md mb-2"></div>
                      <Text size="tiny" color="secondary">Primary</Text>
                    </div>
                    <div className="text-center">
                      <div className="h-16 w-full bg-[var(--color-bg-secondary)] rounded-md mb-2"></div>
                      <Text size="tiny" color="secondary">Secondary</Text>
                    </div>
                    <div className="text-center">
                      <div className="h-16 w-full bg-[var(--color-bg-tertiary)] rounded-md mb-2"></div>
                      <Text size="tiny" color="secondary">Tertiary</Text>
                    </div>
                    <div className="text-center">
                      <div className="h-16 w-full bg-[var(--color-bg-quaternary)] rounded-md mb-2"></div>
                      <Text size="tiny" color="secondary">Quaternary</Text>
                    </div>
                    <div className="text-center">
                      <div className="h-16 w-full bg-[var(--color-bg-quinary)] rounded-md mb-2"></div>
                      <Text size="tiny" color="secondary">Quinary</Text>
                    </div>
                  </Grid>
                </div>
              </Stack>
            </Card>
          </Stack>

          {/* Footer */}
          <Separator spacing="lg" />
          
          <Stack spacing="md" align="center">
            <Text color="tertiary" align="center">
              Built with Next.js, TypeScript, and Tailwind CSS
            </Text>
            <Text size="small" color="quaternary" align="center">
              Design system inspired by Linear.app
            </Text>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}