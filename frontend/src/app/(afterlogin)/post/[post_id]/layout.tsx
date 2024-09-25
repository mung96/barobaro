'use client';

import { ReactNode, useState, useEffect } from 'react';
import Header from '@/components/Header';
import LikeButton from '@/components/(SVG_component)/LikeButton';
import CalendarSVG from '@/components/(SVG_component)/Calendar';
import checkStatus from '@/services/post/checkProcess';

export default function PostDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  // 나중엔 API 호출로 값을 받고, 이를 활용해 Modal 띄울 여부 판단
  // const [showModal, setShowModal] = useState(false);
  // const [showDirectly, setShowDirectly] = useState(false);

  // const data = 'needLogin';
  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const status = await checkStatus(data);
  //       console.log('try');
  //       if (status !== 0) {
  //         setShowModal(true);
  //         if (status !== 3) {
  //           setShowDirectly(true);
  //         }
  //       }
  //     } catch (error) {
  //       console.error('로그인 상태 확인 중 오류 발생:', error);
  //       // 오류 처리 로직 (예: 에러 모달 표시)
  //     }
  //   };
  //
  //   checkLoginStatus();
  // }, [data]); // data가 변경될 때만 효과 실행

  return (
    <>
      <Header pageName="게시글 목록" hasPrevBtn hasSearchBtn hasAlertBtn />
      <div className="mb-[60px]">{children}</div>
      <div className="fixed bottom-0 z-10 max-w-[500px] w-[100%] h-[60px] bg-white flex items-center">
        <div className="flex items-center justify-center w-full">
          <div className="mx-5">
            <LikeButton />
          </div>
          <div className="h-[42px] w-[1px] bg-gray-500" />
          <div className="flex flex-col flex-1 mx-3">
            <div className="flex items-center">
              <CalendarSVG />
              <p className="text-gray-300 text-[12px]">24.10.21 ~ 24.10.23</p>
            </div>
            <p className="text-black-100 text-[16px] font-bold">20,000원/일</p>
          </div>
          <button
            type="button"
            className="mx-3 text-[12px] text-gray-200 rounded-[3px] w-[69px] h-[28px] bg-gray-400"
          >
            채팅하기
          </button>
        </div>
      </div>
    </>
  );
}
