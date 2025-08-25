'use client';

import React, { useState } from 'react';
import { cn } from '@/5_shared/lib/utils';
import { Input } from '../input';
import { Button } from '../button';
import { Text } from '../typography';
import { Badge } from '../badge';
import { isValidYouTubeUrl, extractYouTubeVideoId } from '@/5_shared/lib/youtube';
import { YouTubeIcon, LinkIcon } from '@/5_shared/svg';

export interface URLInputProps {
  placeholder?: string;
  value?: string;
  onUrlSubmit?: (url: string, videoId: string) => void;
  onUrlChange?: (url: string, isValid: boolean) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showValidation?: boolean;
  supportedPlatforms?: ('youtube' | 'vimeo' | 'dailymotion')[];
}

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case 'youtube':
      return <YouTubeIcon />;
    case 'vimeo':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/>
        </svg>
      );
    default:
      return <LinkIcon />;
  }
};

export function URLInput({
  placeholder = 'Paste YouTube URL here...',
  value: controlledValue,
  onUrlSubmit,
  onUrlChange,
  className,
  size = 'md',
  showValidation = true,
  supportedPlatforms = ['youtube'],
}: URLInputProps) {
  const [value, setValue] = useState(controlledValue || '');
  const [isValid, setIsValid] = useState(false);
  const [hasError, setHasError] = useState(false);

  const validateUrl = (url: string) => {
    if (!url.trim()) {
      setIsValid(false);
      setHasError(false);
      return false;
    }

    // Check if it's a valid YouTube URL (for now, only YouTube is supported)
    const valid = isValidYouTubeUrl(url);
    setIsValid(valid);
    setHasError(!valid && url.trim().length > 0);
    return valid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    const valid = validateUrl(newValue);
    onUrlChange?.(newValue, valid);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isValid && value.trim()) {
      const videoId = extractYouTubeVideoId(value.trim());
      if (videoId) {
        onUrlSubmit?.(value.trim(), videoId);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    // Auto-validate on paste
    setTimeout(() => {
      const pastedValue = e.currentTarget.value;
      validateUrl(pastedValue);
    }, 0);
  };

  return (
    <div className={cn('w-full max-w-2xl', className)}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              value={value}
              onChange={handleInputChange}
              onPaste={handlePaste}
              placeholder={placeholder}
              error={hasError}
              inputSize={size}
              leftIcon={<PlatformIcon platform="youtube" />}
              className={cn(
                'transition-colors',
                isValid && 'border-[var(--color-green)] focus:ring-[var(--color-green)]',
                hasError && 'border-[var(--color-red)] focus:ring-[var(--color-red)]'
              )}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            disabled={!isValid}
            size={size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'}
            className="px-6"
          >
            Load Video
          </Button>
        </div>

        {showValidation && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {supportedPlatforms.map((platform) => (
                <Badge
                  key={platform}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <PlatformIcon platform={platform} />
                  <span className="capitalize">{platform}</span>
                </Badge>
              ))}
            </div>

            {hasError && value.trim() && (
              <Text size="small" color="danger" className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                Invalid YouTube URL
              </Text>
            )}

            {isValid && (
              <Text size="small" color="success" className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
                Valid YouTube URL
              </Text>
            )}
          </div>
        )}
      </form>

      {/* Quick examples */}
      <div className="mt-4 p-3 bg-[var(--color-bg-secondary)] rounded-lg">
        <Text size="small" color="tertiary" weight="medium" className="mb-2 block">
          Supported URL formats:
        </Text>
        <div className="space-y-1">
          <Text size="tiny" color="quaternary" className="font-mono">
            https://www.youtube.com/watch?v=VIDEO_ID
          </Text>
          <Text size="tiny" color="quaternary" className="font-mono">
            https://youtu.be/VIDEO_ID
          </Text>
          <Text size="tiny" color="quaternary" className="font-mono">
            https://www.youtube.com/embed/VIDEO_ID
          </Text>
        </div>
      </div>
    </div>
  );
};