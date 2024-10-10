'use client';

import Link from 'next/link';
import HomeButton from './(SVG_component)/HomeButton';
import FavoriteButton from './(SVG_component)/FavoriteButton';
import PostButton from './(SVG_component)/PostButton';
import MessageButton from './(SVG_component)/MessageButton';
import MyPageButton from './(SVG_component)/MyPageButton';
import { usePathname, useRouter } from 'next/navigation';
import { usePathStore, usePrevPathStore, useSetPathStore, useSetPrevPathStore } from '@/store/usePath';
import { useEffect } from 'react';
import { useProfileObject } from '@/store/useMyProfile';

const NavBarItemList = [
  { id: 0, icon: (currentPath: string) => <HomeButton width='32' height='32' fill={currentPath === '/home' ? '#1A1E27' : '#B6BDC8'} />, label: '홈', path: '/home' },
  { id: 1, icon: (currentPath: string) => <FavoriteButton width='28' height='28' fill={currentPath === '/like' ? '#1A1E27' : '#B6BDC8'} />, label: '관심내역', path: '/like' },
  { id: 2, icon: (currentPath: string) => <PostButton width='28' height='28' fill={currentPath === '/post/regist' ? '#1A1E27' : '#B6BDC8'} />, label: '등록', path: '/post/regist' },
  { id: 3, icon: (currentPath: string) => <MessageButton width='30' height='30' fill={currentPath === '/message' ? '#1A1E27' : '#B6BDC8'} />, label: '채팅', path: '/message' },
  { id: 4, icon: (currentPath: string) => <MyPageButton width='32' height='32' fill={currentPath === '/mypage' ? '#1A1E27' : '#B6BDC8'} />, label: '마이페이지', path: '/mypage' }
];

const excludePathList = [
  '/post/regist',
  '/post/:id',  // 동적 세그먼트를 나타내는 패턴
  '/mypage/user/password/new'
];

function isPathExcluded(path: string): boolean {
  return excludePathList.some(pattern => {
    if (pattern.includes(':')) {
      const regexPattern = pattern.replace(/:[\w]+/g, '[\\w-]+');
      const regex = new RegExp(`^${regexPattern}$`);
      return regex.test(path);
    }
    return pattern === path;
  });
}

export default function NavBar() {
  const pathname = usePathname();
  const pathState = usePathStore();
  const setPath = useSetPathStore();
  const setPrevPathState = useSetPrevPathStore();

  useEffect(() => {
    setPath(pathname);
  }, [pathname, setPath]);

  if (isPathExcluded(pathname)) {
    return null; // NavBar를 렌더링하지 않음
  }
  return (
    <nav className="fixed flex bottom-0 bg-gray-400 h-[60px] w-full max-w-[500px] z-10 justify-center">
      {NavBarItemList.map((item) => (
        <Link
          className="flex flex-1 flex-col items-center justify-center h-full gap-1"
          href={item.path}
          onClick={() => {
            setPath(item.path)
            setPrevPathState(window.location.pathname)
          }}
          key={item.id}
        >
          {item.icon(pathState)}
          <p
            className={`text-xs ${pathState === item.path ? 'text-[#1A1E27] font-bold' : 'text-[#B6BDC8]'}`}
          >
            {item.label}
          </p>
        </Link>
      ))}
    </nav>
  );
}