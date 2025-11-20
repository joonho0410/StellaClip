/**
 * Validation functions for YouTube Clip Search API
 */

import { allMembers } from '@/4_entities/member';

export class ValidationError extends Error {
  constructor(
    message: string,
    public statusCode: number = 400,
    public data?: any
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

export interface ClipSearchParams {
  stellaName: string;
  maxResults: number;
}

/**
 * Validate POST request for clip search
 */
export function validateClipSearchRequest(body: {
  stella?: string;
  maxResults?: number;
}): ClipSearchParams {
  // Validate stella parameter (required)
  if (!body.stella) {
    throw new ValidationError('stella parameter is required', 400, {
      example: '{ "stella": "RIN", "maxResults": 20 }',
      availableMembers: allMembers,
    });
  }

  const stellaName = body.stella.toUpperCase().trim();
  if (!allMembers.includes(stellaName as any)) {
    throw new ValidationError(`Invalid stella member: ${stellaName}`, 400, {
      provided: stellaName,
      availableMembers: allMembers,
    });
  }

  // Validate maxResults parameter (optional, default: 20, max: 50)
  let maxResults = 20;
  if (body.maxResults) {
    if (
      typeof body.maxResults !== 'number' ||
      body.maxResults < 1 ||
      body.maxResults > 50
    ) {
      throw new ValidationError('maxResults must be between 1 and 50', 400, {
        provided: body.maxResults,
        expected: 'integer between 1 and 50',
      });
    }
    maxResults = body.maxResults;
  }

  return {
    stellaName,
    maxResults,
  };
}

/**
 * Validate service response
 */
export function validateClipServiceResponse(result: any) {
  if (!result) {
    throw new ValidationError('Service returned invalid response', 500);
  }

  if (typeof result.videosFound !== 'number') {
    throw new ValidationError(
      'Invalid service response: videosFound must be a number',
      500
    );
  }

  if (typeof result.videosProcessed !== 'number') {
    throw new ValidationError(
      'Invalid service response: videosProcessed must be a number',
      500
    );
  }

  if (!Array.isArray(result.videos)) {
    throw new ValidationError(
      'Invalid service response: videos must be an array',
      500
    );
  }

  return result;
}