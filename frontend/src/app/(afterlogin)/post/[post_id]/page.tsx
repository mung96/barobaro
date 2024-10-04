'use client';

import KakaoMap from '@/components/map/KakaoMap';
import PictureCarousel from '@/components/post/Carousel';
import Profile from '@/components/user/Profile';
import PostContent from '@/components/post/PostContent';
import ContractCondition from '@/components/post/ContractCondition';
import { useState } from 'react';
import { ModalType } from '@/types/overlay/modal';
import PostCheckModal from '@/components/modal/PostCheckModal';
import Header from '@/components/Header';
import LikeButton from '@/components/(SVG_component)/LikeButton';
import CalendarSVG from '@/components/(SVG_component)/Calendar';

export default function PostDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('needPassword');
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Header pageName="게시글 목록" hasPrevBtn hasSearchBtn hasAlertBtn />
      <div className="flex flex-col items-center w-full mb-20">
        <div className="z-50">
          <PostCheckModal
            modalType={modalType}
            isOpen={isModalOpen}
            onRequestClose={closeModal}
          />
        </div>
        <div className="flex w-full">
          <Profile hasEmail={false} hasEditBtn={false} />
          <div className="flex-1" />
          <div className="flex">
            <button
              type="button"
              className="text-[10px] underline text-gray-300 me-1 w-[30px]"
              onClick={() => openModal()}
            >
              수정
            </button>
            <button
              type="button"
              className="text-[10px] underline text-gray-300 w-[30px]"
            >
              삭제
            </button>
          </div>
        </div>
        <PictureCarousel />
        <div className="bg-gray-500 w-[90%] h-[1px] my-3" />
        <PostContent />
        <KakaoMap width="85%" height="20dvh" lat={37.498333} lng={126.866667} />
        <ContractCondition />
      </div>
      <div className="-z-0 fixed bottom-0 -z-0 max-w-[500px] w-[100%] h-[60px] bg-white flex items-center">
        <div className="flex items-center justify-center w-full">
          <div className="mx-5">
            <LikeButton isWished />
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
            // onClick={() => console.log('Chat')}
          >
            채팅하기
          </button>
        </div>
      </div>
    </>
  );
}
