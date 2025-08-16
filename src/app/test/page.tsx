'use client';

import { useState } from 'react';
import { Button } from '@/5_shared/ui';
import { Container, Stack } from '@/5_shared/ui';
import { Heading, Text } from '@/5_shared/ui';

interface VideoApiResponse {
  channelId: string;
  videosFound: number;
  videosProcessed: number;
  videos: Array<{
    id: string;
    youtubeVideoId: string;
    title: string;
    publishedAt: string;
    viewCount: number | null;
    likeCount: number | null;
    isOfficial: boolean;
    channelTitle: string;
    description: string | null;
  }>;
}

export default function TestPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VideoApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const testOfficialApi = async (channelName: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`/api/test/official/${channelName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-8">
      <Stack spacing="xl">
        <div>
          <Heading size="title2">API Test Page</Heading>
          <Text size="large" className="mt-2 text-gray-600">
            Test the official YouTube channel video fetching API
          </Text>
        </div>

        <Stack spacing="md">
          <Heading size="title4">Official Channel APIs</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              onClick={() => testOfficialApi('rin')}
              disabled={loading}
              variant="primary"
              className="w-full"
            >
              {loading ? 'Loading...' : 'Test Stella Channel'}
            </Button>

            <Button
              onClick={() => testOfficialApi('yuni')}
              disabled={loading}
              variant="secondary"
              className="w-full"
            >
              {loading ? 'Loading...' : 'Test Mystic Channel'}
            </Button>

            <Button
              onClick={() => testOfficialApi('nana')}
              disabled={loading}
              variant="secondary"
              className="w-full"
            >
              {loading ? 'Loading...' : 'Test Universe Channel'}
            </Button>
          </div>
        </Stack>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <Heading size="title6" className="text-red-800 mb-2">
              Error
            </Heading>
            <Text className="text-red-700">{error}</Text>
          </div>
        )}

        {result && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <Heading size="title6" className="text-green-800 mb-4">
              API Response
            </Heading>
            <Stack spacing="sm">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Text className="font-medium">Channel ID:</Text>
                  <Text className="text-gray-600">{result.channelId}</Text>
                </div>
                <div>
                  <Text className="font-medium">Videos Found:</Text>
                  <Text className="text-gray-600">{result.videosFound}</Text>
                </div>
                <div>
                  <Text className="font-medium">Videos Processed:</Text>
                  <Text className="text-gray-600">
                    {result.videosProcessed}
                  </Text>
                </div>
              </div>

              {result.videos.length > 0 && (
                <div className="mt-4">
                  <Heading size="title7" className="mb-2">
                    Videos:
                  </Heading>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {result.videos.map((video) => (
                      <div
                        key={video.id}
                        className="p-3 bg-white border border-gray-200 rounded"
                      >
                        <Text className="font-medium">{video.title}</Text>
                        <div className="mt-1 text-xs text-gray-500 grid grid-cols-2 gap-2">
                          <span>
                            Views: {video.viewCount?.toLocaleString() || 'N/A'}
                          </span>
                          <span>
                            Likes: {video.likeCount?.toLocaleString() || 'N/A'}
                          </span>
                          <span>
                            Official: {video.isOfficial ? 'Yes' : 'No'}
                          </span>
                          <span>
                            Published:{' '}
                            {new Date(video.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                        <Text className="mt-1 text-xs text-gray-600">
                          YouTube ID: {video.youtubeVideoId}
                        </Text>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Stack>
          </div>
        )}
      </Stack>
    </Container>
  );
}
