'use client';

import Link from 'next/link';
import HomeButton from './(SVG_component)/HomeButton';
import FavoriteButton from './(SVG_component)/FavoriteButton';
import PostButton from './(SVG_component)/PostButton';
import MessageButton from './(SVG_component)/MessageButton';
import MyPageButton from './(SVG_component)/MyPageButton';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function NavBar() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);
  return (
    <nav className="fixed bottom-0 bg-gray-400 h-12 w-full max-w-[500px] z-10 flex flex-col justify-center">
      <div className="flex">
        <Link
          className="flex flex-1 flex-col items-center justify-center"
          href="/home"
          onClick={() => setCurrentPath('/home')}
        >
          <HomeButton fill={currentPath === '/home' ? '#1A1E27' : '#B6BDC8'} />
          <p
            className="text-xs text-nav_btn"
            style={{ color: currentPath === '/home' ? '#1A1E27' : '#B6BDC8' }}
          >
            홈
          </p>
        </Link>
        <Link
          className="flex flex-1 flex-col items-center justify-center"
          href="/like"
          onClick={() => setCurrentPath('/like')}
        >
          <FavoriteButton fill={currentPath === '/like' ? '#1A1E27' : '#B6BDC8'} />
          <p
            className="text-xs text-nav_btn"
            style={{ color: currentPath === '/like' ? '#1A1E27' : '#B6BDC8' }}
          >
            관심내역
          </p>
        </Link>
        <Link
          className="flex flex-1 flex-col items-center justify-center"
          href="/post/regist"
          onClick={() => setCurrentPath('/post')}
        >
          <PostButton fill={currentPath === '/post' ? '#1A1E27' : '#B6BDC8'} />
          <p
            className="text-xs text-nav_btn"
            style={{ color: currentPath === '/post' ? '#1A1E27' : '#B6BDC8' }}
          >
            등록
          </p>
        </Link>
        <Link
          className="flex flex-1 flex-col items-center justify-center"
          href="/message"
          onClick={() => setCurrentPath('/message')}
        >
          <MessageButton fill={currentPath === '/message' ? '#1A1E27' : '#B6BDC8'} />
          <p
            className="text-xs text-nav_btn"
            style={{ color: currentPath === '/message' ? '#1A1E27' : '#B6BDC8' }}
          >
            채팅
          </p>
        </Link>
        <Link
          className="flex flex-.1 flex-col items-center justify-center"
          href="/mypage"
          onClick={() => setCurrentPath('/mypage')}
        >
          <MyPageButton fill={currentPath === '/mypage' ? '#1A1E27' : '#B6BDC8'} />
          <p
            className="text-xs text-nav_btn"
            style={{ color: currentPath === '/mypage' ? '#1A1E27' : '#B6BDC8' }}
          >
            마이페이지
          </p>
        </Link>
      </div>
    </nav>
  );
}
