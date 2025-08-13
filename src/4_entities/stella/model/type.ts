/**
 * Stella 관련 타입 정의
 * - 도메인별 타입 분리를 통한 명확한 책임 구분
 */

import { stellaMembers } from './const';
type Stella = typeof stellaMembers;
export type CohortType = keyof Stella;
export type Mystic = Stella['Mystic'];
export type Universe = Stella['Universe'];
export type Cliche = Stella['Cliche'];
export type AllMember = CohortType extends any
  ? Stella[CohortType][number]
  : never;
