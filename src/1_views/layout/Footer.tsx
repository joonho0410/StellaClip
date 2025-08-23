import { Button } from '@/5_shared/ui/button';
import { Text } from '@/5_shared/ui/typography';

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer className={`border-t border-[var(--color-border-primary)] py-12 ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <Text size="large" weight="medium">
            🎬 Stella Clip
          </Text>
          <Text color="tertiary">
            최고의 비디오 콘텐츠를 발견하고 즐기세요
          </Text>
          <div className="flex justify-center gap-4 mt-6">
            <Button variant="ghost" size="sm">
              소개
            </Button>
            <Button variant="ghost" size="sm">
              개인정보처리방침
            </Button>
            <Button variant="ghost" size="sm">
              이용약관
            </Button>
            <Button variant="ghost" size="sm">
              고객지원
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}