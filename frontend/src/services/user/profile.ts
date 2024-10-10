// import { useRouter } from 'next/navigation';
// import { UserProfile } from '@/types/user/userData';

import {postProfile} from "@/apis/profileApi";

export function signnUp() {
  // 이곳에 회원가입 로직을 입력합니다.
  console.log('signup');
}
// TODO : data - profile 설정에 필요한 모든 정보
export async function updateProfile(nicknameInput : string, file : any) {
  // const formData = new FormData();
  // const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  // formData.append('dto', blob);
  // formData.append('file', file);

}
