'use client';

import React from 'react';
import ReactModal from 'react-modal';
import { useRouter } from 'next/navigation';
import ModalWarningSVG from '@/components/(SVG_component)/ModalWarning';
import ModalContent from '@/components/modal/ModalContent';
import { ModalProps } from '@/types/overlay/modal';
import { modalStyle } from '@/services/overlay/modal';

export default function PostCheckModal({
  modalType,
  isOpen,
  onRequestClose,
}: ModalProps) {
  const router = useRouter();
  // 이미 완료된 거래 ? 뒤로 보내야함.
  // 비밀번호 설정이 필요? => 비밀번호 설정 창으로 이동
  // 수정 및 삭제? => 애초에 버튼이 나오지 않도록 (User != Writer)
  const modalBtn = (go: string) => {
    router.replace(go);
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={modalType}
      ariaHideApp={false}
      style={modalStyle}
    >
      <div className="flex flex-col justify-center items-center">
        <ModalWarningSVG />
        <ModalContent data={modalType} />
        <button
          type="button"
          className="w-[126px] h-[34px] rounded-[8px] bg-blue-100 font-bold text-[13px] text-white"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            modalType === 'needPassword'
              ? modalBtn('/mypage/user/password')
              : modalBtn('/post');
          }}
        >
          확인
        </button>
      </div>
    </ReactModal>
  );
}
