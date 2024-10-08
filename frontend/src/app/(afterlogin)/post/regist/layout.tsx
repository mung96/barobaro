import PostRegistHeader from '@/components/post/PostRegistHeader';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function PostRegistLayout({ children }: Props) {
  return (
    <main className="w-full max-w-[500px] mx-auto px-6 py-3 bg-white">
      <PostRegistHeader pageName='대여 물품 등록' hasPrevBtn={false}/>
      {children}
    </main>
  );
}
