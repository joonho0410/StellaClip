/**
 * Stella 관련 타입 정의
 * - 도메인별 타입 분리를 통한 명확한 책임 구분
 */

import { stellaMembers } from '../model/constants';

type Stella = typeof stellaMembers;

export type GenType = keyof Stella;
export type Mystic = Stella['Mystic'];
export type Universe = Stella['Universe'];
export type Cliche = Stella['Cliche'];
export type AllMember = GenType extends keyof Stella
  ? Stella[GenType][number]
  : never;
