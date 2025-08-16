#!/bin/bash

# 데이터베이스 리셋 스크립트
# Usage: ./scripts/db-reset.sh

echo "🔄 Starting database reset..."

# 백업 생성
echo "📦 Creating backup before reset..."
./scripts/db-backup.sh

# 데이터베이스 파일 삭제
DB_FILE="./prisma/dev.db"
if [ -f "$DB_FILE" ]; then
    rm "$DB_FILE"
    echo "🗑️  Deleted existing database"
fi

# 스키마 다시 푸시
echo "📋 Pushing schema to database..."
yarn db:push

# 시드 데이터 추가
echo "🌱 Seeding database..."
yarn db:seed

echo "🎉 Database reset completed!"
echo "📍 Your data is now fresh with seed data"