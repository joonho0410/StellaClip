'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Container,
  Stack,
  Heading,
  Text,
  VideoCard,
  SearchBar,
  Avatar,
  Badge,
  Button,
  Separator,
  YouTubePlayer,
  URLInput,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Playlist,
} from '@/shared/ui';
import { 
  generateMockYouTubeVideo, 
  sampleYouTubeVideoIds, 
  getVideoDataFromUrl,
  type YouTubeVideoData 
} from '@/shared/lib/youtube';

// Generate mock YouTube videos from sample IDs
const mockYouTubeVideos = sampleYouTubeVideoIds.slice(0, 6).map((videoId, index) => 
  generateMockYouTubeVideo(videoId, {
    title: [
      'Next.js 15 Complete Tutorial - Build Modern Web Apps',
      'React Server Components Deep Dive',
      'TypeScript Best Practices for 2024',
      'Building Design Systems from Scratch',
      'Modern CSS Grid and Flexbox Techniques',
      'JavaScript Performance Optimization Guide'
    ][index]
  })
);

export default function VideoDemo() {
  const [currentVideo, setCurrentVideo] = useState<YouTubeVideoData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentVideos, setRecentVideos] = useState<YouTubeVideoData[]>([]);
  const [featuredVideoId, setFeaturedVideoId] = useState<string>(sampleYouTubeVideoIds[0]);

  const handleUrlSubmit = (url: string) => {
    const videoData = getVideoDataFromUrl(url);
    if (videoData) {
      setCurrentVideo(videoData);
      // Add to recent videos if not already there
      setRecentVideos(prev => {
        const exists = prev.find(v => v.id === videoData.id);
        if (exists) return prev;
        return [videoData, ...prev].slice(0, 10); // Keep last 10
      });
    }
  };

  const handleVideoSelect = (video: YouTubeVideoData) => {
    setCurrentVideo(video);
    setRecentVideos(prev => {
      const filtered = prev.filter(v => v.id !== video.id);
      return [video, ...filtered].slice(0, 10);
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would search YouTube API
    console.log('Searching for:', query);
  };

  const loadSampleVideo = (videoId: string) => {
    const videoData = generateMockYouTubeVideo(videoId);
    setCurrentVideo(videoData);
    setRecentVideos(prev => {
      const filtered = prev.filter(v => v.id !== videoData.id);
      return [videoData, ...filtered].slice(0, 10);
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Container size="xl" className="py-8">
        <Stack spacing="xl">
          {/* Header */}
          <Stack spacing="md" align="center">
            <Heading as="h1" size="title4" align="center">
              YouTube Video Demo
            </Heading>
            <Text size="large" color="secondary" align="center" className="max-w-2xl">
              Paste any YouTube URL to watch videos with our custom player, 
              or explore sample videos using our design system components.
            </Text>
          </Stack>

          <Separator />

          {/* URL Input Section */}
          <Stack spacing="lg">
            <Heading as="h2" size="title2" align="center">Add YouTube Video</Heading>
            <div className="flex justify-center">
              <URLInput
                placeholder="Paste YouTube URL (e.g., https://www.youtube.com/watch?v=...)"
                onUrlSubmit={handleUrlSubmit}
                size="lg"
                showValidation
              />
            </div>
          </Stack>

          <Separator />

          {/* Current Video Player */}
          {currentVideo && (
            <>
              <Stack spacing="lg">
                <Heading as="h2" size="title2">Now Playing</Heading>
                <div className="max-w-4xl mx-auto">
                  <Stack spacing="md">
                    <YouTubePlayer
                      videoId={currentVideo.id}
                      title={currentVideo.title}
                      className="shadow-xl"
                    />
                    <Stack spacing="sm">
                      <Heading as="h3" size="title1">{currentVideo.title}</Heading>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={currentVideo.channelAvatar}
                          alt={currentVideo.channelName}
                          size="md"
                        />
                        <div>
                          <Text weight="medium">{currentVideo.channelName}</Text>
                          <Text size="small" color="secondary">
                            {currentVideo.views} • {currentVideo.uploadTime}
                          </Text>
                        </div>
                      </div>
                    </Stack>
                  </Stack>
                </div>
              </Stack>
              <Separator />
            </>
          )}

          {/* Quick Sample Videos */}
          <Stack spacing="lg">
            <div className="flex items-center justify-between">
              <Heading as="h2" size="title2">Sample Videos</Heading>
              <Badge variant="outline">Click to load</Badge>
            </div>
            
            <div className="grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-3 gap-6">
              {mockYouTubeVideos.slice(0, 6).map((video) => (
                <Card 
                  key={video.id} 
                  variant="elevated"
                  className="cursor-pointer hover:scale-[1.02] transition-transform duration-200"
                  onClick={() => handleVideoSelect(video)}
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-200" />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs">
                      {video.duration}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-red-600 text-white rounded-full p-3 shadow-lg">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Text className="font-medium line-clamp-2 mb-2">{video.title}</Text>
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar src={video.channelAvatar} size="xs" />
                      <Text size="small" color="secondary">{video.channelName}</Text>
                    </div>
                    <Text size="small" color="tertiary">
                      {video.views} • {video.uploadTime}
                    </Text>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Stack>

          {/* Recent Videos */}
          {recentVideos.length > 0 && (
            <>
              <Separator />
              <Stack spacing="lg">
                <div className="flex items-center justify-between">
                  <Heading as="h2" size="title2">Recently Watched</Heading>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setRecentVideos([])}
                  >
                    Clear All
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-5 gap-4">
                  {recentVideos.map((video) => (
                    <div
                      key={video.id}
                      className="cursor-pointer hover:scale-105 transition-transform duration-200"
                      onClick={() => setCurrentVideo(video)}
                    >
                      <div className="relative aspect-video mb-2 overflow-hidden rounded-lg">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 200px"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white px-1 py-0.5 rounded text-xs">
                          {video.duration}
                        </div>
                      </div>
                      <Text size="small" className="line-clamp-2 font-medium">
                        {video.title}
                      </Text>
                      <Text size="tiny" color="secondary">
                        {video.channelName}
                      </Text>
                    </div>
                  ))}
                </div>
              </Stack>
            </>
          )}

          {/* Featured Video Player */}
          <Separator />
          <Stack spacing="lg">
            <div className="flex items-center justify-between">
              <Heading as="h2" size="title2">Featured Video</Heading>
              <div className="flex gap-2">
                {sampleYouTubeVideoIds.slice(0, 3).map((videoId, index) => (
                  <Button
                    key={videoId}
                    variant={featuredVideoId === videoId ? "primary" : "secondary"}
                    size="sm"
                    onClick={() => {
                      setFeaturedVideoId(videoId);
                      loadSampleVideo(videoId);
                    }}
                  >
                    Sample {index + 1}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <YouTubePlayer
                videoId={featuredVideoId}
                title="Featured Sample Video"
              />
            </div>
          </Stack>

          {/* Search Demo */}
          <Separator />
          <Stack spacing="lg">
            <Heading as="h2" size="title2">Search Videos</Heading>
            <div className="max-w-2xl mx-auto">
              <SearchBar
                placeholder="Search for videos, channels, or playlists..."
                onSearch={handleSearch}
                size="lg"
              />
            </div>
            {searchQuery && (
              <Text color="secondary" align="center">
                Search results for: &quot;{searchQuery}&quot; (Demo - no real search implemented)
              </Text>
            )}
          </Stack>

          {/* Playlist Demo */}
          <Separator />
          <Stack spacing="lg">
            <Heading as="h2" size="title2">Playlist Component</Heading>
            
            <Grid cols={1} colsLarge={2} gap="lg">
              <Card variant="outlined" padding="lg">
                <CardHeader>
                  <Heading as="h3" size="title1">My Playlist</Heading>
                  <Text color="secondary">Interactive playlist with play controls</Text>
                </CardHeader>
                <CardContent>
                  <Playlist
                    title="Learning Web Development"
                    items={mockYouTubeVideos.slice(0, 4).map((video, index) => ({
                      id: video.id,
                      title: video.title,
                      thumbnail: video.thumbnail,
                      duration: video.duration,
                      channelName: video.channelName,
                      views: video.views,
                      isActive: index === 0,
                    }))}
                    currentIndex={0}
                    onItemClick={(item) => {
                      const video = mockYouTubeVideos.find(v => v.id === item.id);
                      if (video) handleVideoSelect(video);
                    }}
                    onPlayAll={() => console.log('Playing all videos')}
                    onShuffle={() => console.log('Shuffling playlist')}
                    maxHeight="300px"
                  />
                </CardContent>
              </Card>

              <Card variant="outlined" padding="lg">
                <CardHeader>
                  <Heading as="h3" size="title1">Compact Playlist</Heading>
                  <Text color="secondary">Space-efficient playlist variant</Text>
                </CardHeader>
                <CardContent>
                  <Playlist
                    title="Quick Watch"
                    items={mockYouTubeVideos.slice(2, 6).map((video) => ({
                      id: video.id,
                      title: video.title,
                      thumbnail: video.thumbnail,
                      duration: video.duration,
                      channelName: video.channelName,
                      views: video.views,
                    }))}
                    onItemClick={(item) => {
                      const video = mockYouTubeVideos.find(v => v.id === item.id);
                      if (video) handleVideoSelect(video);
                    }}
                    compact
                    showControls={false}
                    maxHeight="250px"
                  />
                </CardContent>
              </Card>
            </Grid>
          </Stack>

          {/* Component Showcase */}
          <Separator />
          <Stack spacing="lg">
            <Heading as="h2" size="title2">Design System Components</Heading>
            
            <Grid cols={1} colsMedium={2} gap="lg">
              <Card variant="outlined" padding="lg">
                <CardHeader>
                  <Heading as="h3" size="title1">YouTube Player</Heading>
                  <Text color="secondary">Embedded YouTube player with custom thumbnail</Text>
                </CardHeader>
                <CardContent>
                  <YouTubePlayer
                    videoId={sampleYouTubeVideoIds[1]}
                    aspectRatio="16:9"
                  />
                </CardContent>
              </Card>

              <Card variant="outlined" padding="lg">
                <CardHeader>
                  <Heading as="h3" size="title1">Video Cards</Heading>
                  <Text color="secondary">Reusable video card components</Text>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockYouTubeVideos.slice(0, 2).map((video) => (
                      <VideoCard
                        key={video.id}
                        title={video.title}
                        thumbnail={video.thumbnail}
                        duration={video.duration}
                        channelName={video.channelName}
                        channelAvatar={video.channelAvatar}
                        views={video.views}
                        uploadTime={video.uploadTime}
                        size="sm"
                        onClick={() => handleVideoSelect(video)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Stack>

          {/* Footer */}
          <Separator spacing="lg" />
          <Stack spacing="md" align="center">
            <Text color="tertiary" align="center">
              A YouTube video platform demo built with Stella Clip components
            </Text>
            <Text size="small" color="quaternary" align="center">
              Paste YouTube URLs to test the player, or use sample videos to explore the UI
            </Text>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}