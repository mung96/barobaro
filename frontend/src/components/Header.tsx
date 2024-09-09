'use client';

import Link from 'next/link';
import GoBack from './(SVG_component)/GoBack';
import Search from './(SVG_component)/Search';
import Notification from './(SVG_component)/Notification';

type HeaderProps = {
  pageName: string; // 헤더에 표시될 text (e.g. 홈, 게시글 쓰기, 채팅 등 페이지의 제목)
  hasPrevBtn: boolean; // 이전 버튼(<)을 표시할 것인지
  hasSearchBtn: boolean; // 검색 아이콘을 표시할 것인지
  hasAlertBtn: boolean; // 알림 아이콘을 표시할 것인지
};

export default function Header({
  pageName,
  hasPrevBtn,
  hasSearchBtn,
  hasAlertBtn,
}: HeaderProps) {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <header className="bg-white w-full h-[7vh] flex items-center p-4">
      <div className="flex flex-grow">
        {hasPrevBtn && (
          <div onClick={handleGoBack} role="presentation">
            <GoBack />
          </div>
        )}
        <span className="flex-grow text-left mx-5 ml-0">{pageName}</span>
      </div>
      <div className="flex flex-none items-center space-x-4">
        {hasSearchBtn && (
          <Link href="/search">
            <Search />
          </Link>
        )}
        {hasAlertBtn && (
          <Link href="/alert">
            <Notification />
          </Link>
        )}
      </div>
    </header>
  );
}

// noti list에서 안 읽은 알림이 있다 ? notification_with_noti : notification 형태로 배치
