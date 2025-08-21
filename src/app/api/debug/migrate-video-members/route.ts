import { NextResponse } from 'next/server';
import { getServiceContainer } from '@/Server/Service/ServiceContainer';

/**
 * Migration API to connect existing videos with members
 * POST /api/debug/migrate-video-members
 */
export async function POST() {
  try {
    const serviceContainer = getServiceContainer();
    const videoRepository = serviceContainer.getVideoRepository();
    const memberRepository = serviceContainer.getMemberRepository();
    const videoMemberRepository = serviceContainer.getVideoMemberRepository();

    // Get all members for reference
    const members = await memberRepository.findAll();
    const memberMap = new Map(
      members.map(member => [member.name, member]) // member.name is already uppercase
    );

    // Get all videos that don't have member relationships
    const allVideos = await videoRepository.findMany({ limit: 1000, offset: 0 });
    
    console.log(`Processing ${allVideos.length} videos...`);

    const results = {
      processed: 0,
      connected: 0,
      errors: 0,
      connections: [] as Array<{
        videoTitle: string;
        memberName: string;
        reason: string;
      }>,
    };

    for (const video of allVideos) {
      results.processed++;
      
      try {
        const memberNames: string[] = [];
        
        // Method 1: Check sourceQuery (e.g., "channel:RIN")
        if (video.sourceQuery) {
          const queryMatch = video.sourceQuery.match(/channel:(\w+)/i);
          if (queryMatch) {
            const channelMember = queryMatch[1].toUpperCase(); // Normalize to uppercase
            if (memberMap.has(channelMember)) {
              memberNames.push(channelMember);
              results.connections.push({
                videoTitle: video.title,
                memberName: channelMember,
                reason: `sourceQuery: ${video.sourceQuery}`,
              });
            }
          }
        }

        // Method 2: Check title for member names
        const title = video.title.toLowerCase();
        for (const [memberName, member] of memberMap) {
          // Check for member name or displayName in title
          const displayName = member.displayName.toLowerCase();
          const memberNameLower = memberName.toLowerCase();
          if (title.includes(memberNameLower) || title.includes(displayName)) {
            if (!memberNames.includes(memberName)) {
              memberNames.push(memberName);
              results.connections.push({
                videoTitle: video.title,
                memberName: member.name,
                reason: `title contains: ${memberNameLower}`,
              });
            }
          }
        }

        // Method 3: Check for specific patterns
        // RIN specific patterns
        if (title.includes('린') || title.includes('rin') && !memberNames.includes('RIN')) {
          if (memberMap.has('RIN')) {
            memberNames.push('RIN');
            results.connections.push({
              videoTitle: video.title,
              memberName: 'RIN',
              reason: 'title contains Korean/Japanese name pattern',
            });
          }
        }

        // Create video-member relationships if any found
        if (memberNames.length > 0) {
          const relationships = memberNames.map(name => ({
            videoId: video.id,
            memberId: memberMap.get(name)!.id, // name is already uppercase
          }));

          await videoMemberRepository.createMany(relationships);
          results.connected++;
          
          console.log(`Connected video "${video.title}" with ${memberNames.length} members: ${memberNames.join(', ')}`);
        }
        
      } catch (error) {
        console.error(`Error processing video ${video.id}:`, error);
        results.errors++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Migration completed: ${results.connected}/${results.processed} videos connected`,
      data: results,
    });

  } catch (error) {
    console.error('Migration error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Migration failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}