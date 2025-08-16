#!/bin/bash

# Prisma Studio 시작 스크립트
# 환경 변수를 명시적으로 로드

echo "🎨 Starting Prisma Studio with environment variables..."

# .env.local 파일 확인
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found!"
    echo "Please create .env.local with DATABASE_URL"
    exit 1
fi

# 환경 변수 로드 및 Prisma Studio 실행
source .env.local
export DATABASE_URL
export DIRECT_URL

echo "🔗 DATABASE_URL: $DATABASE_URL"
echo "🚀 Starting Prisma Studio..."

# Prisma Studio 실행
npx prisma studio