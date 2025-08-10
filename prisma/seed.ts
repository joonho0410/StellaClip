import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create some sample tags
  const tags = await Promise.all([
    prisma.tag.upsert({
      where: { name: 'Tutorial' },
      update: {},
      create: { name: 'Tutorial', color: '#3b82f6' },
    }),
    prisma.tag.upsert({
      where: { name: 'Music' },
      update: {},
      create: { name: 'Music', color: '#ef4444' },
    }),
    prisma.tag.upsert({
      where: { name: 'Gaming' },
      update: {},
      create: { name: 'Gaming', color: '#10b981' },
    }),
    prisma.tag.upsert({
      where: { name: 'Technology' },
      update: {},
      create: { name: 'Technology', color: '#8b5cf6' },
    }),
    prisma.tag.upsert({
      where: { name: 'Entertainment' },
      update: {},
      create: { name: 'Entertainment', color: '#f59e0b' },
    }),
  ])

  console.log('✅ Created tags:', tags.length)

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