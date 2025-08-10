import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Container } from '../container';
import { Stack } from '../layout';
import { Heading } from '../typography';
import { Text } from '../typography';
import { Button } from '../button';

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  badge?: React.ReactNode;
  image?: React.ReactNode;
  variant?: 'default' | 'centered' | 'split';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const heroSizes = {
  sm: {
    container: 'py-12 md:py-16',
    title: 'title3' as const,
    spacing: 'md' as const,
  },
  md: {
    container: 'py-16 md:py-24',
    title: 'title2' as const,
    spacing: 'lg' as const,
  },
  lg: {
    container: 'py-20 md:py-32',
    title: 'title1' as const,
    spacing: 'xl' as const,
  },
};

export function HeroSection({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  badge,
  image,
  variant = 'default',
  size = 'md',
  className,
}: HeroSectionProps) {
  const sizeConfig = heroSizes[size];

  const renderContent = () => (
    <Stack direction="column" spacing={sizeConfig.spacing}>
      {badge && <div className="flex justify-start">{badge}</div>}
      
      <Stack direction="column" spacing="md">
        {subtitle && (
          <Text size="large" color="secondary" className="font-medium">
            {subtitle}
          </Text>
        )}
        
        <Heading as="h1" size={sizeConfig.title} className="leading-tight">
          {title}
        </Heading>
        
        {description && (
          <Text size="large" color="secondary" className="max-w-2xl">
            {description}
          </Text>
        )}
      </Stack>

      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-4">
          {primaryAction && (
            <Button
              variant="primary"
              size="lg"
              onClick={primaryAction.onClick}
              loading={primaryAction.loading}
            >
              {primaryAction.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              variant="secondary"
              size="lg"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </Stack>
  );

  if (variant === 'split' && image) {
    return (
      <section className={cn(sizeConfig.container, className)}>
        <Container size="xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              {renderContent()}
            </div>
            <div className="order-1 lg:order-2">
              {image}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={cn(sizeConfig.container, className)}>
      <Container size="xl">
        <div className={cn(
          'mx-auto',
          variant === 'centered' ? 'text-center max-w-4xl' : 'max-w-5xl'
        )}>
          {renderContent()}
          {image && variant !== 'split' && (
            <div className="mt-12 lg:mt-16">
              {image}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};