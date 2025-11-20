#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client')
require('dotenv').config({ path: '.env.local' })

const prisma = new PrismaClient()

async function addSampleVideos() {
  console.log('🎬 Adding more sample videos for testing...')

  // 멤버들 조회
  const members = await prisma.member.findMany()
  console.log(`Found ${members.length} members`)

  // 각 멤버에 대해 추가 비디오 생성
  const sampleVideos = [
    {
      videoId: 'yuni-clip-001',
      title: 'YUNI의 일상 브이로그',
      description: 'MYSTIC 세대 YUNI의 일상을 담은 영상',
      publishedAt: new Date('2024-02-01'),
      channelId: 'yuni-personal',
      channelTitle: 'YUNI Personal',
      isOfficial: false,
      duration: '00:05:23',
      category: 'CLIP',
      tags: JSON.stringify(['yuni', 'vlog', '일상']),
      memberName: 'yuni',
    },
    {
      videoId: 'yuni-shorts-001',
      title: 'YUNI 댄스 챌린지',
      description: 'YUNI의 댄스 챌린지 쇼츠',
      publishedAt: new Date('2024-02-05'),
      channelId: 'stella-official',
      channelTitle: 'STELLA Official',
      isOfficial: true,
      duration: '00:00:30',
      category: 'SHORTS',
      tags: JSON.stringify(['yuni', 'dance', 'challenge']),
      memberName: 'yuni',
    },
    {
      videoId: 'hina-tabi-collab',
      title: 'HINA x TABI 콜라보 스트림',
      description: 'UNIVERSE 세대 HINA와 TABI의 콜라보레이션',
      publishedAt: new Date('2024-01-20'),
      channelId: 'stella-official',
      channelTitle: 'STELLA Official',
      isOfficial: true,
      duration: '01:30:45',
      category: 'CLIP',
      tags: JSON.stringify(['hina', 'tabi', 'collaboration', 'stream']),
      memberNames: ['hina', 'tabi'],
    },
    {
      videoId: 'cliche-group-video',
      title: 'CLICHE 세대 단체 영상',
      description: 'CLICHE 멤버들의 단체 영상',
      publishedAt: new Date('2024-01-25'),
      channelId: 'stella-official',
      channelTitle: 'STELLA Official',
      isOfficial: true,
      duration: '00:15:30',
      category: 'CLIP',
      tags: JSON.stringify(['cliche', 'group', 'variety']),
      memberNames: ['rin', 'nana', 'rico', 'buki'],
    },
    {
      videoId: 'lize-solo-shorts',
      title: 'LIZE 솔로 쇼츠',
      description: 'LIZE의 개인 쇼츠 영상',
      publishedAt: new Date('2024-02-10'),
      channelId: 'lize-channel',
      channelTitle: 'LIZE Channel',
      isOfficial: false,
      duration: '00:00:45',
      category: 'SHORTS',
      tags: JSON.stringify(['lize', 'solo', 'music']),
      memberName: 'lize',
    },
  ]

  for (const videoData of sampleVideos) {
    try {
      // 비디오 생성
      const { memberName, memberNames, ...videoCreateData } = videoData
      const video = await prisma.video.create({
        data: videoCreateData,
      })

      console.log(`✅ Created video: ${video.title}`)

      // 멤버 관계 생성
      if (memberName) {
        // 단일 멤버
        const member = members.find(m => m.name === memberName)
        if (member) {
          await prisma.videoMember.create({
            data: {
              videoId: video.id,
              memberId: member.id,
            },
          })
          console.log(`  🔗 Associated with ${member.displayName}`)
        }
      } else if (memberNames) {
        // 다중 멤버
        for (const name of memberNames) {
          const member = members.find(m => m.name === name)
          if (member) {
            await prisma.videoMember.create({
              data: {
                videoId: video.id,
                memberId: member.id,
              },
            })
            console.log(`  🔗 Associated with ${member.displayName}`)
          }
        }
      }
    } catch (error) {
      if (error.code === 'P2002') {
        console.log(`⚠️  Video ${videoData.videoId} already exists, skipping...`)
      } else {
        console.error(`❌ Error creating video ${videoData.videoId}:`, error.message)
      }
    }
  }

  console.log('🎉 Sample videos added successfully!')
}

addSampleVideos()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })