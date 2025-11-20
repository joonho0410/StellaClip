'use client';

import { useState } from 'react';

export const dynamic = 'force-dynamic';
import { Button } from '@/5_shared/ui';
import { Container, Stack } from '@/5_shared/ui';
import { Heading, Text } from '@/5_shared/ui';
import { allMembers } from '@/4_entities';

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
  const [batchLoading, setBatchLoading] = useState(false);
  const [batchResult, setBatchResult] = useState<any>(null);

  const testOfficialApi = async (channelName: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/youtube/official', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stella: channelName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setResult(data.data || data); // Handle new response structure
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const testBatchApi = async () => {
    setBatchLoading(true);
    setError(null);
    setBatchResult(null);

    try {
      const response = await fetch('/api/youtube/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stellas: allMembers }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      setBatchResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setBatchLoading(false);
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
          <Heading size="title4">Single Channel APIs</Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              onClick={() => testOfficialApi('rin')}
              disabled={loading || batchLoading}
              variant="primary"
              className="w-full"
            >
              {loading ? 'Loading...' : 'Test Rin (Stella)'}
            </Button>

            <Button
              onClick={() => testOfficialApi('yuni')}
              disabled={loading || batchLoading}
              variant="secondary"
              className="w-full"
            >
              {loading ? 'Loading...' : 'Test Yuni (Mystic)'}
            </Button>

            <Button
              onClick={() => testOfficialApi('nana')}
              disabled={loading || batchLoading}
              variant="secondary"
              className="w-full"
            >
              {loading ? 'Loading...' : 'Test Nana (Universe)'}
            </Button>
          </div>
        </Stack>

        <Stack spacing="md">
          <Heading size="title4">Batch Processing API</Heading>
          <div className="grid grid-cols-1 gap-4">
            <Button
              onClick={testBatchApi}
              disabled={loading || batchLoading}
              variant="ghost"
              className="w-full"
            >
              {batchLoading
                ? 'Processing Batch...'
                : 'Test Batch Process (All Channels)'}
            </Button>
          </div>
          <Text size="small" className="text-gray-500">
            This will process Rin, Yuni, and Nana channels simultaneously
          </Text>
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

        {batchResult && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <Heading size="title6" className="text-blue-800 mb-4">
              Batch Processing Results
            </Heading>
            <Stack spacing="sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <Text className="font-medium">Total Channels:</Text>
                  <Text className="text-gray-600">
                    {batchResult.data?.summary?.totalChannels || 0}
                  </Text>
                </div>
                <div>
                  <Text className="font-medium">Successful:</Text>
                  <Text className="text-green-600">
                    {batchResult.data?.summary?.successfulChannels || 0}
                  </Text>
                </div>
                <div>
                  <Text className="font-medium">Failed:</Text>
                  <Text className="text-red-600">
                    {batchResult.data?.summary?.failedChannels || 0}
                  </Text>
                </div>
                <div>
                  <Text className="font-medium">Total Videos:</Text>
                  <Text className="text-gray-600">
                    {batchResult.data?.summary?.totalVideosProcessed || 0}
                  </Text>
                </div>
              </div>

              {batchResult.data?.results && (
                <div className="mt-4">
                  <Heading size="title7" className="mb-2">
                    Channel Results:
                  </Heading>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {batchResult.data.results.map((result: any) => (
                      <div
                        key={result.channelName}
                        className={`p-3 border rounded ${
                          result.success
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <Text className="font-medium">
                            {result.channelName}
                          </Text>
                          <Text
                            className={`text-xs ${
                              result.success ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {result.success ? 'Success' : 'Failed'}
                          </Text>
                        </div>
                        {result.success && (
                          <Text className="text-xs text-gray-600 mt-1">
                            Processed {result.videosProcessed} videos
                          </Text>
                        )}
                        {!result.success && result.error && (
                          <Text className="text-xs text-red-600 mt-1">
                            Error: {result.error}
                          </Text>
                        )}
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
