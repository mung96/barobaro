'use client';

import Link from 'next/link';
import HomeButton from './(SVG_component)/HomeButton';
import FavoriteButton from './(SVG_component)/FavoriteButton';
import PostButton from './(SVG_component)/PostButton';
import MessageButton from './(SVG_component)/MessageButton';
import MyPageButton from './(SVG_component)/MyPageButton';
import { usePathname } from 'next/navigation';
import { usePathStore, useSetPathStore } from '@/store/usePath';
import { useEffect } from 'react';



const NavBarItemList=[
  {id:0,icon: (currentPath:string)=>{return  <HomeButton width='32' height='32' fill={currentPath === '/home' ? '#1A1E27' : '#B6BDC8'} />},label:'홈',path:'/home'},
  {id:1,icon: (currentPath:string)=>{return  <FavoriteButton  width='28' height='28'  fill={currentPath === '/like' ? '#1A1E27' : '#B6BDC8'} />},label:'관심내역',path:'/like'},
  {id:2,icon: (currentPath:string)=>{return  <PostButton  width='28' height='28'  fill={currentPath === '/post/regist' ? '#1A1E27' : '#B6BDC8'} />},label:'등록',path:'/post/regist'},
  {id:3,icon: (currentPath:string)=>{return  <MessageButton  width='30' height='30'   fill={currentPath === '/message' ? '#1A1E27' : '#B6BDC8'} />},label:'채팅',path:'/message'},
  {id:4,icon: (currentPath:string)=>{return  <MyPageButton  width='32' height='32' fill={currentPath === '/mypage' ? '#1A1E27' : '#B6BDC8'} />},label:'마이페이지',path:'/mypage'}

]
const excludePathList =[
  '/post/regist',
]

export default function NavBar() {
  const pathname = usePathname();
  const pathState = usePathStore();
  const setPath = useSetPathStore();

  useEffect(()=>{
    setPath(pathname);
  },[pathname])


  return !excludePathList.includes(pathname) &&
    <nav className="fixed flex bottom-0 bg-gray-400 h-[60px] w-full max-w-[500px] z-10 justify-center">
      {NavBarItemList.map((item)=>
         <Link
         className="flex flex-1 flex-col items-center justify-center h-full gap-1"
         href={item.path}
         onClick={() => setPath(item.path)}
         key={item.id}
       >
         {item.icon(pathState)}
         <p
           className={`text-xs ${pathState === item.path ? 'text-[#1A1E27] font-bold' : 'text-[#B6BDC8]'}`}
         >
           {item.label}
         </p>
       </Link>
      )}
    </nav>
}
