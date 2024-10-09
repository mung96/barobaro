'use client';

import { usePrevPathStore } from '@/store/usePath';
import { useRouter } from 'next/navigation';

import { IoMdClose } from "react-icons/io";


type Props = {
  pageName: string; // 헤더에 표시될 text (e.g. 홈, 게시글 쓰기, 채팅 등 페이지의 제목)
  hasPrevBtn: boolean; // 이전 버튼(<)을 표시할 것인지

};

function PostRegistHeader({
  pageName,
}: Props) {
  const router = useRouter();
  const prevPathState = usePrevPathStore();

  return (<header className="bg-white w-full h-14 flex items-center justify-center fixed top-0 left-0">
    <div onClick={() => router.push(prevPathState)} role="presentation" className='absolute left-3'>
      <IoMdClose className='text-2xl' />
    </div>
    {pageName && <h2 className="text-lg font-semibold text-center mt-1">{pageName}</h2>}
  </header>
  );
}

export default PostRegistHeader;
