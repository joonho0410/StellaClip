import React from 'react';
import { CategoryBar } from '@/shared/ui/category-bar';
import { videoCategories } from '../model/const';
import { useVideoCategoryBar } from '../model/useVideoCategoryBar';

interface VideoCategoryBarProps {
  className?: string;
}

/**
 * 비디오 카테고리를 위한 특화된 CategoryBar
 * URLQuery 상태와 연동되어 동작
 */
export const VideoCategoryBar = ({ className }: VideoCategoryBarProps) => {
  const { 
    isPending, 
    activeTabId, 
    activeSubTabId, 
    handleTabChange, 
    handleSubTabChange 
  } = useVideoCategoryBar();

  return (
    <CategoryBar
      tabs={videoCategories}
      activeTabId={activeTabId}
      activeSubTabId={activeSubTabId}
      onTabChange={handleTabChange}
      onSubTabChange={handleSubTabChange}
      className={className}
      showSubTabs={true}
    />
  );
};