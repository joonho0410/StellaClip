'use client';

import React, { useState, useEffect } from 'react';
import { Container } from '@/shared/ui/layout';
import { Heading, Text } from '@/shared/ui/typography';
import { VideoCard, SlidePanel, VideoDetailPanel, Button } from '@/shared/ui';

// Sample video data with extended properties
const sampleVideos = [
  {
    id: '1',
    title: 'Next.js 15 최신 기능 완벽 가이드',
    thumbnail: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=225&fit=crop',
    duration: '15:32',
    channelName: 'Tech Academy',
    channelAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    views: '127K views',
    uploadTime: '2 days ago',
    quality: 'HD' as const,
    youtubeId: 'dQw4w9WgXcQ', // Sample YouTube ID
    description: `이 영상에서는 Next.js 15의 최신 기능들을 자세히 살펴봅니다.

주요 내용:
• App Router의 새로운 기능들
• Server Components 최적화
• 성능 향상 기법
• 실제 프로젝트 적용 방법

React 개발자라면 꼭 알아야 할 Next.js 15의 핵심 기능들을 실무 예제와 함께 설명드립니다.`,
    tags: ['nextjs', 'react', 'javascript', 'webdev', 'tutorial'],
    likeCount: '2.1K',
  },
  {
    id: '2', 
    title: 'TypeScript 고급 패턴과 실전 활용법',
    thumbnail: 'https://images.unsplash.com/photo-nonexistent-image-12345.jpg', // Non-existent image for testing
    duration: '23:45',
    channelName: 'Code Masters',
    channelAvatar: 'https://images.unsplash.com/photo-nonexistent-avatar-12345.jpg', // Non-existent avatar for testing
    views: '89K views',
    uploadTime: '1 week ago',
    quality: '4K' as const,
    youtubeId: 'dQw4w9WgXcQ',
    description: `TypeScript의 고급 패턴들을 실전 프로젝트에 적용하는 방법을 배워봅시다.

다루는 내용:
• Generic 고급 활용법
• Conditional Types
• Template Literal Types
• Utility Types 커스터마이징
• 타입 가드와 타입 단언

실무에서 바로 사용할 수 있는 TypeScript 고급 기법들을 예제와 함께 설명합니다.`,
    tags: ['typescript', 'javascript', 'programming', 'advanced'],
    likeCount: '1.8K',
  },
  {
    id: '3',
    title: 'React 성능 최적화 완벽 가이드',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop',
    duration: '18:22',
    channelName: 'React Pro',
    channelAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
    views: '203K views',
    uploadTime: '3 days ago',
    isLive: true,
    description: `React 애플리케이션의 성능을 극대화하는 방법을 알아봅시다.

• React.memo와 useMemo 활용
• useCallback 최적화
• 컴포넌트 분할 전략
• 번들 크기 최적화
• 렌더링 성능 향상

실제 성능 측정 도구를 사용하여 최적화 전후를 비교해보겠습니다.`,
    tags: ['react', 'performance', 'optimization', 'memoization'],
    likeCount: '3.2K',
  },
  {
    id: '4',
    title: 'CSS Grid와 Flexbox 마스터하기',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop',
    duration: '12:18',
    channelName: 'Frontend Wizards',
    channelAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b332e234?w=40&h=40&fit=crop&crop=face',
    views: '156K views',
    uploadTime: '5 days ago',
    quality: 'HD' as const,
    description: `모던 CSS 레이아웃의 핵심인 Grid와 Flexbox를 완전히 마스터해봅시다.

학습 내용:
• CSS Grid 기본부터 고급까지
• Flexbox 완벽 활용법
• 실제 레이아웃 구현 실습
• 반응형 디자인 적용

실무에서 자주 사용되는 레이아웃 패턴들을 직접 구현해보면서 배워보겠습니다.`,
    tags: ['css', 'grid', 'flexbox', 'layout', 'responsive'],
    likeCount: '2.7K',
  },
  {
    id: '5',
    title: '플레이스홀더 테스트 - 이미지 없음',
    thumbnail: '', // Empty thumbnail for testing
    duration: '10:00',
    channelName: 'Test Channel',
    channelAvatar: '', // Empty avatar for testing  
    views: '1K views',
    uploadTime: '1 hour ago',
    description: '이 비디오는 플레이스홀더 이미지 기능을 테스트하기 위한 것입니다.',
    tags: ['test', 'placeholder'],
    likeCount: '100',
  },
];

export default function SlidePanelDemoPage() {
  const [testPanelOpen, setTestPanelOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<typeof sampleVideos[0] | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [panelWidth, setPanelWidth] = useState(600);
  const [isPanelFullScreen, setIsPanelFullScreen] = useState(false);

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleChannelClick = (channelName: string) => {
    console.log('Channel clicked:', channelName);
    // Navigate to channel page or show channel info
  };

  const handleTagClick = (tag: string) => {
    console.log('Tag clicked:', tag);
    // Search for videos with this tag
  };

  const handleShare = () => {
    console.log('Share clicked');
    // Implement share functionality
  };

  const handleSave = () => {
    console.log('Save clicked');
    // Implement save functionality
  };

  const handleVideoClick = (video: typeof sampleVideos[0]) => {
    setSelectedVideo(video);
    setPanelOpen(true);
  };

  const handleClosePanel = () => {
    setPanelOpen(false);
    // Clear selected video after animation
    setTimeout(() => setSelectedVideo(null), 300);
  };

  const handlePanelWidthChange = (width: number) => {
    setPanelWidth(width);
  };

  const handlePanelFullScreenChange = (isFullScreen: boolean) => {
    setIsPanelFullScreen(isFullScreen);
  };

  return (
    <div className="h-screen flex relative overflow-hidden">
      {/* Main Content Area */}
      <div 
        className={`transition-all duration-300 ease-out flex flex-col ${
          panelOpen ? 'flex-1' : 'w-full'
        }`}
        style={{
          marginLeft: panelOpen && !isMobile && !isPanelFullScreen ? `${panelWidth}px` : '0',
        }}
      >
        <div className="flex-1 overflow-y-auto">
          <Container className="py-8">
            <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-4">
              <Heading size="title2">
                슬라이딩 패널 데모
              </Heading>
              <Text size="large" color="secondary" className="max-w-2xl mx-auto">
                동영상 카드를 클릭하면 Notion 스타일의 우측 슬라이딩 패널이 나타납니다. 
                모바일에서는 전체 화면으로 표시됩니다.
              </Text>
              
              {/* Test Button */}
              <div className="mt-6">
                <Button onClick={() => setTestPanelOpen(true)} variant="primary">
                  테스트 패널 열기
                </Button>
              </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sampleVideos.map((video, index) => (
                <VideoCard
                  key={video.id}
                  {...video}
                  priority={index < 4} // Only prioritize first 4 images
                  onClick={() => handleVideoClick(video)}
                />
              ))}
            </div>

            {/* Additional Content for Scroll Testing */}
            <div className="space-y-8">
              <Heading size="title2">더 많은 비디오</Heading>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(12)].map((_, index) => {
                  // Fixed values to prevent SSR hydration mismatch
                  const durations = ['8:32', '12:45', '6:18', '15:22', '9:17', '11:35', '7:48', '13:12', '10:29', '14:55', '5:43', '16:08'];
                  const viewCounts = ['125K', '67K', '234K', '89K', '156K', '203K', '78K', '312K', '145K', '98K', '267K', '189K'];
                  const uploadTimes = ['2 days ago', '5 days ago', '1 week ago', '3 days ago', '4 days ago', '6 days ago', '1 day ago', '2 weeks ago', '5 days ago', '3 days ago', '1 week ago', '4 days ago'];
                  
                  return (
                    <VideoCard
                      key={`extra-${index}`}
                      id={`extra-${index}`}
                      title={`추가 비디오 ${index + 1}: 웹 개발 심화 과정`}
                      thumbnail={`https://images.unsplash.com/photo-${1517180102446 + index}?w=400&h=225&fit=crop`}
                      duration={durations[index]}
                      channelName={['Tech Academy', 'Code Masters', 'Web Pros', 'Dev Channel'][index % 4]}
                      channelAvatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                      views={`${viewCounts[index]} views`}
                      uploadTime={uploadTimes[index]}
                      onClick={() => handleVideoClick(sampleVideos[index % sampleVideos.length])}
                    />
                  );
                })}
              </div>
            </div>

            <div className="space-y-8">
              <Heading size="title2">인기 튜토리얼</Heading>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => {
                  // Fixed values to prevent SSR hydration mismatch
                  const durations = ['25:18', '18:42', '32:15', '21:33', '28:07', '19:45', '35:22', '24:58'];
                  const viewCounts = ['456K', '789K', '234K', '567K', '891K', '345K', '678K', '123K'];
                  const uploadTimes = ['1 week ago', '3 days ago', '2 weeks ago', '5 days ago', '1 month ago', '4 days ago', '3 weeks ago', '6 days ago'];
                  
                  return (
                    <VideoCard
                      key={`popular-${index}`}
                      id={`popular-${index}`}
                      title={`인기 튜토리얼 ${index + 1}: 프론트엔드 마스터클래스`}
                      thumbnail={`https://images.unsplash.com/photo-${1555066931000 + index * 1000}?w=400&h=225&fit=crop`}
                      duration={durations[index]}
                      channelName={['Frontend Masters', 'React Pros', 'JS Academy', 'CSS Wizards'][index % 4]}
                      channelAvatar="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face"
                      views={`${viewCounts[index]} views`}
                      uploadTime={uploadTimes[index]}
                      onClick={() => handleVideoClick(sampleVideos[index % sampleVideos.length])}
                    />
                  );
                })}
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-12 p-6 bg-[var(--color-bg-secondary)] rounded-lg">
              <Heading size="title6" className="mb-4">
                사용 방법
              </Heading>
              <div className="space-y-2 text-sm">
                <Text color="secondary">
                  • 동영상 카드를 클릭하면 우측에 슬라이딩 패널이 나타납니다
                </Text>
                <Text color="secondary">
                  • 패널에서 동영상을 재생하고 상세 정보를 확인할 수 있습니다
                </Text>
                <Text color="secondary">
                  • 좁은 화면(768px 미만)에서는 전체 화면 모드로 표시됩니다
                </Text>
                <Text color="secondary">
                  • ESC 키나 X 버튼으로 패널을 닫을 수 있습니다
                </Text>
                <Text color="secondary">
                  • 패널 외부를 클릭해도 패널이 닫힙니다
                </Text>
              </div>
            </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Test Slide Panel */}
      <SlidePanel
        isOpen={testPanelOpen}
        onClose={() => setTestPanelOpen(false)}
        title="테스트 패널"
        fullScreenOnMobile={true}
      >
        <VideoDetailPanel
          video={sampleVideos[0]}
          onChannelClick={handleChannelClick}
          onTagClick={handleTagClick}
          onShare={handleShare}
          onSave={handleSave}
        />
      </SlidePanel>

      {/* Main Video Slide Panel */}
      {selectedVideo && (
        <SlidePanel
          isOpen={panelOpen}
          onClose={handleClosePanel}
          title={selectedVideo.title}
          fullScreenOnMobile={true}
          allowFullScreenToggle={true}
          position="left"
          pushContent={!isMobile}
          resizable={!isMobile}
          onWidthChange={handlePanelWidthChange}
          onFullScreenChange={handlePanelFullScreenChange}
          minWidth={300}
          maxWidth={800}
        >
          <VideoDetailPanel
            video={selectedVideo}
            onChannelClick={handleChannelClick}
            onTagClick={handleTagClick}
            onShare={handleShare}
            onSave={handleSave}
          />
        </SlidePanel>
      )}
    </div>
  );
}