import { stellaMembers } from '../model/constants';
import type { GenType, AllMember } from '../types';

/**
 * 특정 기수의 멤버 목록을 반환
 */
export function getMembersByGeneration(gen: GenType): readonly AllMember[] {
  return stellaMembers[gen];
}

/**
 * 멤버가 속한 기수를 반환
 */
export function getGenerationByMember(member: AllMember): GenType {
  for (const [gen, members] of Object.entries(stellaMembers)) {
    if ((members as readonly string[]).includes(member)) {
      return gen as GenType;
    }
  }
  throw new Error(`Unknown member: ${member}`);
}

/**
 * 멤버가 유효한지 확인
 */
export function isValidMember(member: string): member is AllMember {
  return Object.values(stellaMembers)
    .flat()
    .includes(member as AllMember);
}

/**
 * 기수가 유효한지 확인
 */
export function isValidGeneration(gen: string): gen is GenType {
  return Object.keys(stellaMembers).includes(gen);
}
