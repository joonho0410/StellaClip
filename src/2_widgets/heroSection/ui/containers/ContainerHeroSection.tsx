import { useSelectedGen, useSelectedStella } from '@/4_entities';
import { useSearchVideos } from '@/4_entities/video/queries';
import { HeroSection } from '../HeroSection';
import { HeroSectionSkeleton, HeroSectionError } from './';
import { Card } from '@/5_shared/ui/card';
import { Container } from '@/5_shared/ui/container';
import { VideoIcon } from '@/5_shared/svg';

interface ContainerHeroSectionProps {
  className?: string;
}

const ContainerHeroSection = ({ className }: ContainerHeroSectionProps) => {
  const gen = useSelectedGen();
  const stella = useSelectedStella();
  const { videos, isLoading: loading, error, refetch } = useSearchVideos({
    member: stella !== 'ALL' ? stella : undefined,
    generation: gen !== 'ALL' ? gen : undefined, 
    isOfficial: true,
    maxResult: 20,
    enabled: true
  });

  if (loading) {
    return <HeroSectionSkeleton className={className} />;
  }

  if (error) {
    return (
      <HeroSectionError className={className} error={error} onRetry={refetch} />
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <section className="py-2 sm:py-4 mb-4 sm:mb-8">
        <Container size="xl" className="px-2 sm:px-4">
          <Card
            variant="elevated"
            padding="xl"
            className="h-[300px] sm:h-[350px] lg:h-[400px] flex items-center justify-center"
          >
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-[var(--color-bg-tertiary)] rounded-full flex items-center justify-center">
                <div className="w-8 h-8 text-[var(--color-text-tertiary)]">
                  <VideoIcon />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[var(--color-text-primary)] text-lg font-medium">
                  No videos available
                </div>
                <div className="text-[var(--color-text-tertiary)] text-sm">
                  Please check back later
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </section>
    );
  }

  return <HeroSection className={className} videos={videos} />;
};

export default ContainerHeroSection;
