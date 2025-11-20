'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import { Input } from '../input';
import { Button, IconButton } from '../button';
import { Text } from '../typography';

export interface SearchSuggestion {
  id: string;
  text: string;
  type?: 'query' | 'channel' | 'video';
  thumbnail?: string;
  metadata?: string;
}

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  suggestions?: SearchSuggestion[];
  recentSearches?: string[];
  showSuggestions?: boolean;
  maxSuggestions?: number;
  onSearch?: (query: string) => void;
  onSuggestionClick?: (suggestion: SearchSuggestion) => void;
  onClearRecentSearches?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'ghost';
}

// Icons
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m18 6-12 12M6 6l12 12" />
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
);

const TrendingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
    <polyline points="17,6 23,6 23,12" />
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const VideoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M23 7l-7 5 7 5V7z" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

export function SearchBar({
  placeholder = 'Search videos...',
  value: controlledValue,
  suggestions = [],
  recentSearches = [],
  showSuggestions = true,
  maxSuggestions = 8,
  onSearch,
  onSuggestionClick,
  onClearRecentSearches,
  className,
  size = 'md',
  variant = 'default',
}: SearchBarProps) {
  const [value, setValue] = useState(controlledValue || '');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch?.(value.trim());
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    const totalSuggestions = Math.min(suggestions.length + recentSearches.length, maxSuggestions);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => 
          prev < totalSuggestions - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          const allSuggestions = [
            ...recentSearches.map(text => ({ id: text, text, type: 'query' as const })),
            ...suggestions
          ];
          const selectedSuggestion = allSuggestions[highlightedIndex];
          if (selectedSuggestion) {
            setValue(selectedSuggestion.text);
            onSuggestionClick?.(selectedSuggestion);
            setIsOpen(false);
          }
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setValue(suggestion.text);
    onSuggestionClick?.(suggestion);
    setIsOpen(false);
  };

  const clearValue = () => {
    setValue('');
    inputRef.current?.focus();
  };

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'channel':
        return <UserIcon />;
      case 'video':
        return <VideoIcon />;
      default:
        return <TrendingIcon />;
    }
  };

  const displaySuggestions = suggestions.slice(0, maxSuggestions);
  const displayRecentSearches = recentSearches.slice(0, maxSuggestions - displaySuggestions.length);
  const hasContent = displaySuggestions.length > 0 || displayRecentSearches.length > 0;

  return (
    <div className={cn('relative w-full max-w-2xl', className)}>
      <form onSubmit={handleSubmit} className="relative">
        <Input
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          leftIcon={<SearchIcon />}
          rightIcon={
            value && (
              <IconButton
                variant="ghost"
                icon={<CloseIcon />}
                onClick={clearValue}
                className="h-6 w-6 p-1 hover:bg-[var(--color-bg-tertiary)]"
              />
            )
          }
          variant={variant}
          inputSize={size}
          className="pr-12"
        />
        <Button
          type="submit"
          variant="ghost"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
        >
          <SearchIcon />
        </Button>
      </form>

      {/* Suggestions Dropdown */}
      {isOpen && showSuggestions && hasContent && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          {/* Recent Searches */}
          {displayRecentSearches.length > 0 && (
            <div className="p-2">
              <div className="flex items-center justify-between px-3 py-2">
                <Text size="small" color="tertiary" weight="medium">
                  Recent searches
                </Text>
                {onClearRecentSearches && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearRecentSearches}
                    className="text-xs text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
                  >
                    Clear all
                  </Button>
                )}
              </div>
              {displayRecentSearches.map((search, index) => (
                <button
                  key={search}
                  onClick={() => handleSuggestionClick({ id: search, text: search, type: 'query' })}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-md text-left hover:bg-[var(--color-bg-tertiary)] transition-colors',
                    index === highlightedIndex && 'bg-[var(--color-bg-tertiary)]'
                  )}
                >
                  <ClockIcon />
                  <Text size="regular" color="primary">
                    {search}
                  </Text>
                </button>
              ))}
            </div>
          )}

          {/* Suggestions */}
          {displaySuggestions.length > 0 && (
            <div className="p-2">
              {displayRecentSearches.length > 0 && (
                <div className="border-t border-[var(--color-border-secondary)] my-2" />
              )}
              {displaySuggestions.map((suggestion, index) => {
                const adjustedIndex = index + displayRecentSearches.length;
                return (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3 py-2 rounded-md text-left hover:bg-[var(--color-bg-tertiary)] transition-colors',
                      adjustedIndex === highlightedIndex && 'bg-[var(--color-bg-tertiary)]'
                    )}
                  >
                    {suggestion.thumbnail ? (
                      <div className="relative w-8 h-8 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={suggestion.thumbnail}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                    ) : (
                      getTypeIcon(suggestion.type)
                    )}
                    <div className="flex-1 min-w-0">
                      <Text size="regular" color="primary" className="truncate">
                        {suggestion.text}
                      </Text>
                      {suggestion.metadata && (
                        <Text size="small" color="tertiary" className="truncate">
                          {suggestion.metadata}
                        </Text>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};