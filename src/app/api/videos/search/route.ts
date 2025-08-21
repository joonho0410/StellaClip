import { NextRequest } from 'next/server';
import { getServiceContainer } from '@/Server/Service/ServiceContainer';
import { 
  createErrorResponse, 
  createPaginatedResponse,
  withErrorHandling
} from '../../utils';
import { validateVideoSearchRequest, validateSearchServiceResponse, ValidationError } from './validate';

/**
 * Video Search API
 * 
 * GET /api/videos/search - Search videos by Stella member or generation
 */
export async function GET(request: NextRequest) {
  return withErrorHandling(async () => {
    try {
      const { searchParams } = new URL(request.url);
      
      // Extract query parameters
      const queryParams = {
        stella: searchParams.get('stella'),
        gen: searchParams.get('gen'),
        isOfficial: searchParams.get('isOfficial'),
        maxResult: searchParams.get('maxResult'),
        page: searchParams.get('page'),
      };

      // Validate request using extracted validation logic
      const validatedParams = validateVideoSearchRequest(queryParams);

      // Get service from container (dependency injection)
      const serviceContainer = getServiceContainer();
      const videoService = serviceContainer.getVideoService();

      // Search videos through service layer - choose method based on parameters
      let searchResult;
      let searchDescription;
      
      if (validatedParams.stella) {
        // Search by stella member
        searchResult = await videoService.searchVideosByStella({
          stellaName: validatedParams.stella,
          isOfficial: validatedParams.isOfficial,
          page: validatedParams.page,
          limit: validatedParams.maxResult,
        });
        searchDescription = `Found ${searchResult.total} videos for ${validatedParams.stella}`;
      } else if (validatedParams.gen) {
        // Search by generation
        searchResult = await videoService.searchVideosByGen({
          genName: validatedParams.gen,
          isOfficial: validatedParams.isOfficial,
          page: validatedParams.page,
          limit: validatedParams.maxResult,
        });
        searchDescription = `Found ${searchResult.total} videos for ${validatedParams.gen} generation`;
      } else {
        throw new ValidationError('Either stella or gen parameter is required');
      }

      // Validate service response
      validateSearchServiceResponse(searchResult);

      // Return paginated response
      return createPaginatedResponse(
        searchResult.videos,
        {
          page: validatedParams.page,
          limit: validatedParams.maxResult,
          total: searchResult.total,
        },
        searchDescription
      );

    } catch (error) {
      // Handle validation errors
      if (error instanceof ValidationError) {
        return createErrorResponse(
          error.message,
          error.statusCode,
          error.data
        );
      }

      // Let withErrorHandling handle all other errors
      throw error;
    }
  });
}