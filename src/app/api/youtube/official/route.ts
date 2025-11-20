import { NextRequest } from 'next/server';
import { getServiceContainer } from '@/Server/Service/ServiceContainer';
import {
  createSuccessResponse,
  createErrorResponse,
  withErrorHandling,
} from '../../utils';
import {
  validateOfficialChannelRequest,
  validateServiceResponse,
  ValidationError,
} from './validate';

/**
 * Official YouTube Channel Processing API
 *
 * POST /api/youtube/official - Process videos from official channel
 */
export async function POST(request: NextRequest) {
  return withErrorHandling(async () => {
    try {
      const body = await request.json();

      // Validate request using extracted validation logic
      const { stellaName } = validateOfficialChannelRequest(body);

      // Get service from container (dependency injection)
      const serviceContainer = getServiceContainer();
      const youtubeService = serviceContainer.getYouTubeService();

      // Delegate all business logic to service layer
      const result = await youtubeService.fetchOfficialChannelVideos(
        stellaName
      );

      // Validate service response
      validateServiceResponse(result);

      // Return response with proper status codes
      if (result.videosProcessed === 0) {
        return createSuccessResponse(
          {
            stellaName,
            ...result,
          },
          `No new videos found for ${stellaName}`
        );
      }

      return createSuccessResponse(
        {
          stellaName,
          ...result,
        },
        `Successfully processed ${result.videosProcessed} videos from ${stellaName}`
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
