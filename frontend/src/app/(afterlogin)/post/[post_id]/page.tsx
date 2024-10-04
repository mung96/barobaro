'use client';

import KakaoMap from '@/components/map/KakaoMap';
import PictureCarousel from '@/components/post/Carousel';
import Profile from '@/components/user/Profile';
import PostContent from '@/components/post/PostContent';
import ContractCondition from '@/components/post/ContractCondition';
import { useState } from 'react';
import { ModalType } from '@/types/overlay/modal';
import PostCheckModal from '@/components/modal/PostCheckModal';

export default function PostDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('needPassword');
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="z-50">
        <PostCheckModal
          modalType={modalType}
          isOpen={isModalOpen}
          onRequestClose={closeModal}
        />
      </div>
      <div className="flex w-full p-3">
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
      <button type="button" onClick={() => console.log('Click')}>
        asdas
      </button>
      <PostContent />
      <KakaoMap width="85%" height="20dvh" lat={37.498333} lng={126.866667} />
      <ContractCondition />
    </div>
  );
}
