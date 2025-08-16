#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// .env 파일 로드
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env.development' });

const DB_FILE = './prisma/dev.db';

console.log('📊 Database Status Check\n');

// 데이터베이스 파일 존재 확인
if (fs.existsSync(DB_FILE)) {
  const stats = fs.statSync(DB_FILE);
  console.log('✅ Database file exists');
  console.log(`📁 Location: ${path.resolve(DB_FILE)}`);
  console.log(`📏 Size: ${(stats.size / 1024).toFixed(2)} KB`);
  console.log(`📅 Last modified: ${stats.mtime.toLocaleString()}`);
  
  // 환경 변수 확인
  console.log('\n🔧 Environment Configuration:');
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL || 'Not set'}`);
  console.log(`DIRECT_URL: ${process.env.DIRECT_URL || 'Not set'}`);
  
  console.log('\n💡 Available commands:');
  console.log('  yarn db:studio     - Open Prisma Studio (GUI)');
  console.log('  yarn db:seed       - Re-run seed data');
  console.log('  yarn db:backup     - Create backup');
  console.log('  yarn db:reset      - Reset database');
  
} else {
  console.log('❌ Database file not found');
  console.log(`Expected location: ${path.resolve(DB_FILE)}`);
  console.log('\n🔧 To create database:');
  console.log('  yarn db:push       - Create database with current schema');
  console.log('  yarn db:seed       - Add initial data');
}

console.log('');