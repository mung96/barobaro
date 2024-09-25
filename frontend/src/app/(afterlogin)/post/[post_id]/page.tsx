'use client';

import KakaoMap from '@/components/map/KakaoMap';
import PictureCarousel from '@/components/post/Carousel';
import Profile from '@/components/user/Profile';
import PostContent from '@/components/post/PostContent';
import ContractCondition from '@/components/post/ContractCondition';
import { useState } from 'react';
import PostCheckModal from '@/components/modal/PostCheckModal';
// frontend - .env => NEXT_PUBLIC_KAKAO_CLIENT_ID=APIKEY
export default function PostDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="flex flex-col items-center">
      <div className="flex w-full">
        <Profile hasEmail={false} hasEditBtn={false} />
        <div className="flex flex-1" />
      </div>
      <section className="flex justify-center items-center">
        <PictureCarousel />
      </section>
      <div className="bg-gray-500 w-[90%] h-[1px]" />
      <button type="button" onClick={openModal}>
        ModalTest
      </button>
      <PostCheckModal
        modalType="needLogin"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      />
      <PostContent />
      <KakaoMap width="85%" height="20dvh" lat={37.498333} lng={126.866667} />
      <ContractCondition />
    </section>
  );
}
