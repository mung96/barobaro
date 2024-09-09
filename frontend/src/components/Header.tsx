'use client';

import Image from 'next/image';
import Link from 'next/link';
import GoBack from './(SVG_component)/GoBack';
import Search from './(SVG_component)/Search';
import Notification from './(SVG_component)/Notification';

type HeaderProps = {
  pageName: string;
};

export default function Header({ pageName }: HeaderProps) {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <header className="bg-white w-full h-[7vh] flex items-center p-4">
      <div className="flex flex-grow">
        <div onClick={handleGoBack}>
          <GoBack />
        </div>
        <span className="flex-grow text-left mx-5 ml-0">{pageName}</span>
      </div>
      <div className="flex flex-none items-center space-x-4">
        <Link href="/search">
          <Search />
        </Link>
        <Link href="/alert">
          <Notification />
        </Link>
      </div>
    </header>
  );
}

// noti list에서 안 읽은 알림이 있다 ? notification_with_noti : notification 형태로 배치
