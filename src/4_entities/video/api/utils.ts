import type { SearchVideosParams } from './types';

export const makeSearchVideoQuery = (params: SearchVideosParams) => {
  const query = new URLSearchParams();

  // Add search parameters
  query.set('isOfficial', String(params.isOfficial) || 'false');
  query.set('maxResult', String(params.maxResult || 20));
  query.set('page', String(params.page || 1));
  query.set('stella', String(params.member || 'ALL'));
  query.set('gen', String(params.generation || 'ALL'));

  return query;
};
