#!/bin/bash

# 데이터베이스 백업 스크립트
# Usage: ./scripts/db-backup.sh

# 현재 날짜 생성
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
DB_FILE="./prisma/dev.db"

# 백업 디렉토리 생성
mkdir -p $BACKUP_DIR

# SQLite 데이터베이스 백업
if [ -f "$DB_FILE" ]; then
    cp "$DB_FILE" "$BACKUP_DIR/dev_backup_$DATE.db"
    echo "✅ Database backed up to: $BACKUP_DIR/dev_backup_$DATE.db"
else
    echo "❌ Database file not found: $DB_FILE"
    exit 1
fi

# 오래된 백업 파일 정리 (7일 이상된 것)
find $BACKUP_DIR -name "dev_backup_*.db" -mtime +7 -delete
echo "🧹 Cleaned up old backup files (>7 days)"

echo "🎉 Database backup completed!"