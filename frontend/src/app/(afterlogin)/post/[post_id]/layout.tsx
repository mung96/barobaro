'use client';

import { ReactNode, useState, useEffect } from 'react';
import Header from '@/components/Header';
import LikeButton from '@/components/(SVG_component)/LikeButton';
import CalendarSVG from '@/components/(SVG_component)/Calendar';
import PostCheckModal, { ModalType } from '@/components/modal/PostCheckModal';

export default function PostDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('needPassword');
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // API 로 정보를 받는다고 치면~
  // 작성자 userID => 1이라고 가정. 하단의 값 바꾸며 modal값 변경 여부 확인
  // const loginUserInfo = { hasPassword: true, userId: 2 };
  // 해당 페이지가 켜지면? => 우선 자격이 되는지 판단하고, Modal Open 혹은 유지
  // 자격이 된다면, 만약 수정버튼을 누른다면? => writer와 동일한지 판단하고 다르다면 적합한 Modal
  return (
    <>
      <Header pageName="게시글 목록" hasPrevBtn hasSearchBtn hasAlertBtn />
      <div className="z-50">
        <PostCheckModal
          modalType={modalType}
          isOpen={isModalOpen}
          onRequestClose={closeModal}
        />
      </div>
      <button
        type="button"
        onClick={() => {
          setModalType('noPermissionEdit');
          openModal();
        }}
      >
        ModalTest - 수정
      </button>
      <button
        type="button"
        onClick={() => {
          setModalType('noPermissionDelete');
          openModal();
        }}
      >
        ModalTest - 삭제
      </button>
      <button
        type="button"
        onClick={() => {
          setModalType('needPassword');
          openModal();
        }}
      >
        ModalTest - 비밀번호설정필요
      </button>
      <button
        type="button"
        onClick={() => {
          setModalType('isComplete');
          openModal();
        }}
      >
        ModalTest - 완료된 거래
      </button>
      <div className="mb-[60px]">{children}</div>
      <div className="-z-0 fixed bottom-0 -z-0 max-w-[500px] w-[100%] h-[60px] bg-white flex items-center">
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
            // onClick={() => console.log('Chat')}
          >
            채팅하기
          </button>
        </div>
      </div>
    </>
  );
}
