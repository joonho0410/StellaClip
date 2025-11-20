/**
 * Validation functions for YouTube Official API
 * Throws validation errors that are caught by the outer try/catch
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

/**
 * Validate POST request body for official channel processing
 */
export function validateOfficialChannelRequest(body: any) {
  if (!body) {
    throw new ValidationError('Request body is required');
  }

  const { stella } = body;

  if (!stella || !allMembers.includes(stella.toUpperCase())) {
    throw new ValidationError(
      'stella property is required and must be a string',
      400,
      { example: { stella: 'rin' } }
    );
  }

  const stellaName = stella.toUpperCase().trim();

  if (!stellaName) {
    throw new ValidationError('stella cannot be empty');
  }

  return {
    stellaName,
    originalInput: stella,
  };
}

/**
 * Validate service response and throw appropriate errors
 */
export function validateServiceResponse(result: any) {
  if (!result) {
    throw new ValidationError('Service returned invalid response', 500);
  }

  if (typeof result.videosProcessed !== 'number') {
    throw new ValidationError('Invalid service response format', 500);
  }

  return result;
}
