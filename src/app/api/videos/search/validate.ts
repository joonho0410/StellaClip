/**
 * Validation functions for Video Search API
 * Throws validation errors that are caught by the outer try/catch
 */

import { allMembers, allGen } from '@/4_entities/member';

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

export interface VideoSearchParams {
  stella?: string;
  gen?: string;
  isOfficial?: boolean;
  maxResult: number;
  page: number;
}

/**
 * Validate GET request query parameters for video search
 */
export function validateVideoSearchRequest(params: {
  stella: string | null;
  gen: string | null;
  isOfficial: string | null;
  maxResult: string | null;
  page: string | null;
}): VideoSearchParams {
  // Validate that at least one search parameter is provided
  if (!params.stella && !params.gen) {
    throw new ValidationError(
      'Either stella or gen parameter is required',
      400,
      {
        example:
          '?stella=RIN&page=1&maxResult=10 or ?gen=Universe&page=1&maxResult=10',
        availableMembers: allMembers,
        availableGens: allGen,
      }
    );
  }

  let stellaName: string | undefined;
  let genName: string | undefined;

  // Validate stella parameter (optional)
  if (params.stella) {
    stellaName = params.stella.toUpperCase().trim();
    if (stellaName !== 'ALL' && !allMembers.includes(stellaName as any)) {
      throw new ValidationError(`Invalid stella member: ${stellaName}`, 400, {
        provided: stellaName,
        availableMembers: allMembers,
      });
    }
  }

  // Validate gen parameter (optional)
  if (params.gen) {
    genName = params.gen.toUpperCase().trim();
    if (genName !== 'ALL' && !allGen.includes(genName as any)) {
      throw new ValidationError(`Invalid gen: ${genName}`, 400, {
        provided: genName,
        availableGens: allGen,
      });
    }
  }

  // Validate page parameter (optional, default: 1)
  let page = 1;
  if (params.page) {
    const parsedPage = parseInt(params.page, 10);
    if (isNaN(parsedPage) || parsedPage < 1) {
      throw new ValidationError('page must be a positive integer', 400, {
        provided: params.page,
        expected: 'positive integer >= 1',
      });
    }
    page = parsedPage;
  }

  // Validate maxResult parameter (optional, default: 20, max: 100)
  let maxResult = 20;
  if (params.maxResult) {
    const parsedMaxResult = parseInt(params.maxResult, 10);
    if (
      isNaN(parsedMaxResult) ||
      parsedMaxResult < 1 ||
      parsedMaxResult > 100
    ) {
      throw new ValidationError('maxResult must be between 1 and 100', 400, {
        provided: params.maxResult,
        expected: 'integer between 1 and 100',
      });
    }
    maxResult = parsedMaxResult;
  }

  // Validate isOfficial parameter (optional, default: undefined)
  let isOfficial: boolean | undefined;
  if (params.isOfficial !== null) {
    if (params.isOfficial === 'true') {
      isOfficial = true;
    } else if (params.isOfficial === 'false') {
      isOfficial = false;
    } else {
      throw new ValidationError('isOfficial must be "true" or "false"', 400, {
        provided: params.isOfficial,
        expected: '"true" or "false"',
      });
    }
  }

  return {
    stella: stellaName,
    gen: genName,
    isOfficial,
    maxResult,
    page,
  };
}

/**
 * Validate search service response
 */
export function validateSearchServiceResponse(result: any) {
  if (!result) {
    throw new ValidationError('Service returned invalid response', 500);
  }

  if (!Array.isArray(result.videos)) {
    throw new ValidationError(
      'Invalid service response: videos must be an array',
      500
    );
  }

  if (typeof result.total !== 'number') {
    throw new ValidationError(
      'Invalid service response: total must be a number',
      500
    );
  }

  return result;
}
