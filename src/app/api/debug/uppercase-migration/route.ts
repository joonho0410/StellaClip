import { NextResponse } from 'next/server';
import { getServiceContainer } from '@/Server/Service/ServiceContainer';

/**
 * Migration API to convert all member names to uppercase
 * POST /api/debug/uppercase-migration
 */
export async function POST() {
  try {
    const serviceContainer = getServiceContainer();
    const prisma = serviceContainer.getPrismaClient();

    // Get all members to update
    const members = await prisma.member.findMany();
    
    console.log(`Found ${members.length} members to update...`);

    const results = {
      updated: 0,
      errors: 0,
      changes: [] as Array<{
        id: string;
        oldName: string;
        newName: string;
      }>,
    };

    for (const member of members) {
      const oldName = member.name;
      const newName = oldName.toUpperCase();
      
      try {
        if (oldName !== newName) {
          // Update member name to uppercase
          await prisma.member.update({
            where: { id: member.id },
            data: { name: newName },
          });
          
          results.updated++;
          results.changes.push({
            id: member.id,
            oldName,
            newName,
          });
          
          console.log(`Updated member: ${oldName} -> ${newName}`);
        } else {
          console.log(`Member ${member.name} already uppercase`);
        }
      } catch (error) {
        console.error(`Error updating member ${member.id}:`, error);
        results.errors++;
      }
    }

    // Verify the changes
    const updatedMembers = await prisma.member.findMany({
      select: {
        id: true,
        name: true,
        displayName: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Migration completed: ${results.updated} members updated to uppercase`,
      data: {
        ...results,
        finalMemberNames: updatedMembers.map(m => ({
          id: m.id,
          name: m.name,
          displayName: m.displayName,
        })),
      },
    });

  } catch (error) {
    console.error('Uppercase migration error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Uppercase migration failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}