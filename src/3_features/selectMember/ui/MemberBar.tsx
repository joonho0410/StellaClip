import React from 'react';
import { CategoryBar } from '@/shared/ui/category-bar';
import { memberCategories } from '../model/const';
import { useMemberBar } from '../model/useMemberBar';

interface MemberBarProps {
  className?: string;
}

/**
 * 멤버 카테고리를 위한 특화된 CategoryBar
 * URL Query Parameter와 연동되어 동작
 *
 * Query Parameters:
 * - gen: 'ALL' | 'Mystic' | 'Universe' | 'Cliche'
 * - stella: 'ALL' | AllMember (멤버 이름)
 *
 * @example
 * ```tsx
 * <MemberBar className="mb-4" />
 * ```
 */
export const MemberBar = ({ className }: MemberBarProps) => {
  const { activeTabId, activeSubTabId, handleTabChange, handleSubTabChange } =
    useMemberBar();

  return (
    <CategoryBar
      tabs={memberCategories}
      activeTabId={activeTabId}
      activeSubTabId={activeSubTabId}
      onTabChange={handleTabChange}
      onSubTabChange={handleSubTabChange}
      className={className}
      showSubTabs={true}
    />
  );
};
