import { ReactNode } from 'react';
import Header from '@/components/Header';
import LikeButton from '@/components/(SVG_component)/LikeButton';
import CalendarSVG from '@/components/(SVG_component)/Calendar';

export default function PostDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
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
