import { PrismaClient, Member, Generation } from '@prisma/client';

/**
 * Member Repository Layer
 * Handles all database operations for members
 */
export class MemberRepository {
  constructor(private prisma: PrismaClient) {}

  /**
   * Find member by ID
   */
  async findById(id: string): Promise<Member | null> {
    return this.prisma.member.findUnique({
      where: { id },
    });
  }

  /**
   * Find member by name (normalized to uppercase)
   */
  async findByName(name: string): Promise<Member | null> {
    return this.prisma.member.findUnique({
      where: { name: name.toUpperCase() },
    });
  }

  /**
   * Find all members
   */
  async findAll(): Promise<Member[]> {
    return this.prisma.member.findMany({
      orderBy: [
        { generation: 'asc' },
        { name: 'asc' },
      ],
    });
  }

  /**
   * Find members by generation
   */
  async findByGeneration(generation: Generation): Promise<Member[]> {
    return this.prisma.member.findMany({
      where: { generation },
      orderBy: { name: 'asc' },
    });
  }

  /**
   * Create new member
   */
  async create(data: {
    name: string;
    displayName: string;
    generation: Generation;
    hashtags: string;
  }): Promise<Member> {
    return this.prisma.member.create({
      data: {
        name: data.name.toUpperCase(),
        displayName: data.displayName,
        generation: data.generation,
        hashtags: data.hashtags,
      },
    });
  }

  /**
   * Update member
   */
  async update(id: string, data: {
    displayName?: string;
    generation?: Generation;
    hashtags?: string;
  }): Promise<Member> {
    return this.prisma.member.update({
      where: { id },
      data,
    });
  }

  /**
   * Delete member
   */
  async delete(id: string): Promise<void> {
    await this.prisma.member.delete({
      where: { id },
    });
  }

  /**
   * Check if member exists by name (normalized to uppercase)
   */
  async existsByName(name: string): Promise<boolean> {
    const member = await this.prisma.member.findUnique({
      where: { name: name.toUpperCase() },
    });
    return !!member;
  }
}