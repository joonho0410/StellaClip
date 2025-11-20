import { NextRequest } from 'next/server';
import { getServiceContainer } from '@/Server/Service/ServiceContainer';
import {
  createSuccessResponse,
  createErrorResponse,
  withErrorHandling,
} from '../../utils';
import {
  validateClipSearchRequest,
  validateClipServiceResponse,
  ValidationError,
} from './validate';

/**
 * YouTube Clip Search API
 *
 * POST /api/youtube/clip - Search fan-made clips for Stella members
 */
export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    try {
      const body = await request.json();

      // Validate request using extracted validation logic
      const { stellaName, maxResults } = validateClipSearchRequest(body);

      // Get service from container (dependency injection)
      const serviceContainer = getServiceContainer();
      const youtubeService = serviceContainer.getYouTubeService();

      // Search clips through service layer
      const result = await youtubeService.searchClipVideos(
        stellaName,
        maxResults
      );

      // Validate service response
      validateClipServiceResponse(result);

      // Return response with proper status codes
      if (result.videosProcessed === 0) {
        return createSuccessResponse(
          {
            stellaName,
            ...result,
          },
          `No new clip videos found for ${stellaName}`
        );
      }

      return createSuccessResponse(
        {
          stellaName,
          ...result,
        },
        `Successfully processed ${result.videosProcessed} clip videos for ${stellaName}`
      );
    } catch (error) {
      // Handle validation errors
      if (error instanceof ValidationError) {
        return createErrorResponse(error.message, error.statusCode, error.data);
      }

      // Let withErrorHandling handle all other errors
      throw error;
    }
  });
}