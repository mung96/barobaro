
import { lazy, ReactNode, Suspense } from 'react';

const PostRegistHeader = lazy(() => import('@/components/post/PostRegistHeader'));

type Props = {
  children: ReactNode;
};

export default function PostRegistLayout({ children }: Props) {
  return (
    <>
    <Suspense>
      <PostRegistHeader pageName='대여 물품 등록' hasPrevBtn={false} />
    </Suspense>
      {children}
    </>
  );
}
