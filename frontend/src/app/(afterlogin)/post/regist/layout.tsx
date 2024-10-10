import PostRegistHeader from '@/components/post/PostRegistHeader';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function PostRegistLayout({ children }: Props) {
  return (
    <>
      <PostRegistHeader pageName='대여 물품 등록' hasPrevBtn={false} />
      {children}
    </>
  );
}
