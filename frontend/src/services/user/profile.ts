// import { useRouter } from 'next/navigation';
// import { UserProfile } from '@/types/user/userData';
import {axiosInstance} from "@/apis/axiosInstance";
import {END_POINT} from "@/constants/api";

export function signnUp() {
  // 이곳에 회원가입 로직을 입력합니다.
  console.log('signup');
}
// TODO : 프로필 업데이트 과정 다시 확인할 것
export async function updateProfile(nicknameInput : string, file : any) {
  const data = {
    nickname: nicknameInput,
  }
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  formData.append('dto', blob);
  formData.append('file', file);
  return await axiosInstance.post(END_POINT.PRODUCT, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
