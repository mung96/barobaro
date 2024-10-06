import { ReactNode } from 'react';
// import Header from '@/components/Header';

type Props = {
  children: ReactNode;
};

export default function SignUpLayout({ children }: Props) {
  return (
    <>
      {/* <Header
        pageName="로그인"
        hasPrevBtn
        hasSearchBtn={false}
        hasAlertBtn={false}
      /> */}
      <main className="w-full max-w-[500px] mx-auto px-6 py-3">{children}</main>
    </>
  );
}
