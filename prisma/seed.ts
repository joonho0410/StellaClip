import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create Members based on your existing constants
  const members = [
    // MYSTIC Generation
    {
      name: 'yuni',
      displayName: 'YUNI',
      generation: 'MYSTIC',
      hashtags: JSON.stringify(['yuni', 'mystic', 'stella']),
    },
    
    // UNIVERSE Generation
    {
      name: 'hina',
      displayName: 'HINA',
      generation: 'UNIVERSE',
      hashtags: JSON.stringify(['hina', 'universe', 'stella']),
    },
    {
      name: 'tabi',
      displayName: 'TABI',
      generation: 'UNIVERSE',
      hashtags: JSON.stringify(['tabi', 'universe', 'stella']),
    },
    {
      name: 'lize',
      displayName: 'LIZE',
      generation: 'UNIVERSE',
      hashtags: JSON.stringify(['lize', 'universe', 'stella']),
    },
    {
      name: 'mashiro',
      displayName: 'MASHIRO',
      generation: 'UNIVERSE',
      hashtags: JSON.stringify(['mashiro', 'universe', 'stella']),
    },
    
    // CLICHE Generation
    {
      name: 'rin',
      displayName: 'RIN',
      generation: 'CLICHE',
      hashtags: JSON.stringify(['rin', 'cliche', 'stella']),
    },
    {
      name: 'nana',
      displayName: 'NANA',
      generation: 'CLICHE',
      hashtags: JSON.stringify(['nana', 'cliche', 'stella']),
    },
    {
      name: 'rico',
      displayName: 'RICO',
      generation: 'CLICHE',
      hashtags: JSON.stringify(['rico', 'cliche', 'stella']),
    },
    {
      name: 'buki',
      displayName: 'BUKI',
      generation: 'CLICHE',
      hashtags: JSON.stringify(['buki', 'cliche', 'stella']),
    },
  ]

  // Create members with upsert to prevent duplicates
  const createdMembers = []
  for (const memberData of members) {
    const member = await prisma.member.upsert({
      where: { name: memberData.name },
      update: {
        displayName: memberData.displayName,
        generation: memberData.generation as 'MYSTIC' | 'UNIVERSE' | 'CLICHE',
        hashtags: memberData.hashtags,
      },
      create: {
        name: memberData.name,
        displayName: memberData.displayName,
        generation: memberData.generation as 'MYSTIC' | 'UNIVERSE' | 'CLICHE',
        hashtags: memberData.hashtags,
      },
    })
    createdMembers.push(member)
    console.log(`✅ Created/Updated member: ${member.displayName} (${member.generation})`)
  }

  console.log(`🎉 Successfully seeded ${createdMembers.length} members!`)

  // Optional: Create some sample videos for testing
  console.log('🎬 Creating sample videos...')
  
  const sampleVideos = [
    {
      videoId: 'sample-video-1',
      title: 'STELLA Clip Sample Video 1',
      description: 'This is a sample video for testing purposes',
      publishedAt: new Date('2024-01-15'),
      channelId: 'stella-official',
      channelTitle: 'STELLA Official',
      isOfficial: true,
      duration: '00:03:45',
      category: 'CLIP' as const,
      tags: JSON.stringify(['stella', 'clip', 'sample']),
    },
    {
      videoId: 'sample-video-2',
      title: 'STELLA Shorts Sample Video',
      description: 'This is a sample shorts video for testing purposes',
      publishedAt: new Date('2024-01-16'),
      channelId: 'stella-official',
      channelTitle: 'STELLA Official',
      isOfficial: true,
      duration: '00:00:59',
      category: 'SHORTS' as const,
      tags: JSON.stringify(['stella', 'shorts', 'sample']),
    },
  ]

  const createdVideos = []
  for (const videoData of sampleVideos) {
    const video = await prisma.video.upsert({
      where: { videoId: videoData.videoId },
      update: videoData,
      create: videoData,
    })
    createdVideos.push(video)
    console.log(`✅ Created/Updated video: ${video.title}`)
  }

  // Create some sample video-member relationships
  if (createdVideos.length > 0 && createdMembers.length > 0) {
    console.log('🔗 Creating sample video-member relationships...')
    
    // Associate first video with YUNI
    const yuni = createdMembers.find(m => m.name === 'yuni')
    const firstVideo = createdVideos[0]
    
    if (yuni && firstVideo) {
      await prisma.videoMember.upsert({
        where: {
          videoId_memberId: {
            videoId: firstVideo.id,
            memberId: yuni.id,
          },
        },
        update: {},
        create: {
          videoId: firstVideo.id,
          memberId: yuni.id,
        },
      })
      console.log(`✅ Associated ${yuni.displayName} with ${firstVideo.title}`)
    }

    // Associate second video with HINA and TABI
    const hina = createdMembers.find(m => m.name === 'hina')
    const tabi = createdMembers.find(m => m.name === 'tabi')
    const secondVideo = createdVideos[1]
    
    if (secondVideo) {
      for (const member of [hina, tabi].filter(Boolean)) {
        await prisma.videoMember.upsert({
          where: {
            videoId_memberId: {
              videoId: secondVideo.id,
              memberId: member!.id,
            },
          },
          update: {},
          create: {
            videoId: secondVideo.id,
            memberId: member!.id,
          },
        })
        console.log(`✅ Associated ${member!.displayName} with ${secondVideo.title}`)
      }
    }
  }

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })