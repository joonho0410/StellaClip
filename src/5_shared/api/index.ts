export { createClient as createSupabaseClient } from '../lib/supabase/client'
export { prisma } from '../lib/prisma'
export { NetworkService, networkService, createNetworkService } from './networkService'
export type { NetworkConfig, RequestOptions, ApiResponse, ApiError } from './networkService'