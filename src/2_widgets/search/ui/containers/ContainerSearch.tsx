import { useSelectedGen, useSelectedStella } from '@/4_entities/member';
import { useSearchVideos } from '@/4_entities/video/queries';
import { SearchVideoGrid } from '../searchVideoGrid';
import { SearchSkeleton, SearchError } from './';
import { Card } from '@/5_shared/ui/card';
import { Container } from '@/5_shared/ui/container';
import { useCurrentVideo } from '@/4_entities';

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
                <svg
                  className="w-8 h-8 text-[var(--color-text-tertiary)]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
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
      <Container size="xl" className="px-2 sm:px-4">
        <SearchVideoGrid videos={videos} onVideoClick={setCurrentVideo} />
      </Container>
    </section>
  );
};

export default ContainerSearch;
