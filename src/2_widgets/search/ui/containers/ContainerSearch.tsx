import { useSelectedGen, useSelectedStella } from '@/4_entities/member';
import { useSearchVideos } from '@/4_entities/video/queries';
import { SearchVideoGrid } from '../searchVideoGrid';
import { SearchSkeleton, SearchError } from './';
import { Card } from '@/5_shared/ui/card';
import { Container } from '@/5_shared/ui/container';
import { useCurrentVideo } from '@/4_entities';
import { SearchIcon } from '@/5_shared/svg';

interface ContainerSearchProps {
  className?: string;
}

const ContainerSearch = ({ className }: ContainerSearchProps) => {
  const gen = useSelectedGen();
  const stella = useSelectedStella();
  const { setCurrentVideo } = useCurrentVideo();
  const {
    videos,
    isLoading: loading,
    error,
    refetch,
  } = useSearchVideos({
    member: stella !== 'ALL' ? stella : undefined,
    generation: gen !== 'ALL' ? gen : undefined,
    isOfficial: true,
    maxResult: 20,
    enabled: true,
  });

  if (loading) {
    return <SearchSkeleton className={className} />;
  }

  if (error) {
    return (
      <SearchError className={className} error={error} onRetry={refetch} />
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
                  <SearchIcon />
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[var(--color-text-primary)] text-lg font-medium">
                  No search results found
                </div>
                <div className="text-[var(--color-text-tertiary)] text-sm">
                  Try different search criteria
                </div>
              </div>
            </div>
          </Card>
        </Container>
      </section>
    );
  }

  return (
    <section className={className}>
      <Container size="xl" className="sm:px-0 lg:px-0 px-0 @lg:px-4">
        <SearchVideoGrid videos={videos} onVideoClick={setCurrentVideo} />
      </Container>
    </section>
  );
};

export default ContainerSearch;
