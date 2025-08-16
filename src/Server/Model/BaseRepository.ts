import { PrismaClient } from '@prisma/client';

/**
 * Base Repository class with common database operations
 */
export abstract class BaseRepository {
  protected prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Begin database transaction
   */
  async transaction<T>(fn: (prisma: PrismaClient) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(fn);
  }

  /**
   * Execute raw SQL query
   */
  async executeRaw(query: string, ...values: any[]): Promise<any> {
    return this.prisma.$executeRaw`${query}`.bind(this.prisma, ...values);
  }

  /**
   * Query raw SQL
   */
  async queryRaw(query: string, ...values: any[]): Promise<any> {
    return this.prisma.$queryRaw`${query}`.bind(this.prisma, ...values);
  }

  /**
   * Health check for database connection
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database health check failed:', error);
      return false;
    }
  }

  /**
   * Disconnect from database
   */
  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
}