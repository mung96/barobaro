'use client';

import NavBarLayout from '@/layout/NavBarLayout';
import ProfilePhoto from '@/components/user/ProfilePhoto';
// import { file } from '@babel/types';

export default function Profile() {
  return (
    <NavBarLayout current="mypage">
      <header className="font-bold text-[15px] flex flex-col items-center mt-3 mb-10">
        프로필 수정
      </header>
      <ProfilePhoto />
    </NavBarLayout>
  );
}
