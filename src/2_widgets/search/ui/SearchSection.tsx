import React from 'react';
import { ContainerSearch } from './containers';

interface SearchSectionProps {
  className?: string;
}

export function SearchSection({ className }: SearchSectionProps) {
  return <ContainerSearch className={className} />;
}