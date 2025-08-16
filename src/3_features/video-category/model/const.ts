import { stellaMembers } from '@/4_entities/stella';
import type { AllMember } from '@/4_entities/stella';
import type { Tab } from '@/shared/ui/category-bar';

/**
 * stella 멤버들을 subtab으로 변환하는 헬퍼 함수
 */
function makeSubTabs(members: readonly AllMember[]): Tab['subTabs'] {
  return [
    { id: 'ALL', label: 'ALL' },
    ...members.map((member) => ({
      id: member,
      label: member,
    })),
  ];
}

/**
 * 비디오 카테고리 탭 구조
 * ALL이 가장 왼쪽에 위치하도록 구성
 */
export const videoCategories: Tab[] = [
  { id: 'ALL', label: 'ALL' },
  ...Object.entries(stellaMembers).map(([gen, members]) => ({
    id: gen,
    label: gen,
    subTabs: makeSubTabs(members),
  })),
];
