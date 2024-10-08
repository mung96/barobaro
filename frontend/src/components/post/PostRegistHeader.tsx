'use client';

import GoBack from '@/components/(SVG_component)/GoBack';
import { usePathStore, useSetPathStore } from '@/store/usePath';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


type Props = {
  pageName: string; // 헤더에 표시될 text (e.g. 홈, 게시글 쓰기, 채팅 등 페이지의 제목)
  hasPrevBtn: boolean; // 이전 버튼(<)을 표시할 것인지

};

function PostRegistHeader({
  pageName,
  hasPrevBtn,
}: Props) {
  return (<header className="bg-white w-full min-h-12 flex items-center ">
      <div className="flex flex-grow gap-2 items-center">
          <div onClick={()=>window.history.back()} role="presentation">
            <GoBack />
          </div>
       {pageName && <h2 className="flex-grow text-left mx-5 ml-0">{pageName}</h2>}
      </div>
    </header>
  );
}

export default PostRegistHeader;

// noti list에서 안 읽은 알림이 있다 ? notification_with_noti : notification 형태로 배치
