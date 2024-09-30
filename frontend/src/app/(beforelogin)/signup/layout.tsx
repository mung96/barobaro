import { ReactNode } from 'react';
import Header from '@/components/Header';

export default function SignUpLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header
        pageName="로그인"
        hasPrevBtn
        hasSearchBtn={false}
        hasAlertBtn={false}
      />
      <div className="flex justify-center items-center text-black-100 font-bold text-[16px] mb-3">
        <h1>회원가입</h1>
      </div>
      {children}
    </>
  );
}
