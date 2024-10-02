import { useRouter } from 'next/navigation';
// import { UserProfile } from '@/types/user/userData';

export function signnUp() {
  // 이곳에 회원가입 로직을 입력합니다.
  console.log('signup');
}

export function updateProfile() {
  const router = useRouter();
  console.log('updateProfile');
  router.replace('/mypage');
}
