'use client';

import React from 'react';
import ReactModal from 'react-modal';
import ModalWarningSVG from '@/components/(SVG_component)/ModalWarning';
import ModalContent from '@/components/modal/ModalContent';
import { useRouter } from 'next/navigation';

type Props = {
  modalType: string;
  isOpen: boolean;
  onRequestClose: () => void;
};

const messageList = [
  '로그인이 필요합니다',
  '이미 거래가 완료되었습니다.',
  '오직 작성자만 수정 가능합니다.',
];

const modalStyle: ReactModal.Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // 어두운 배경
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position: 'relative',
    width: '320px',
    height: '250px',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    borderRadius: '10px',
    outline: 'none',
    zIndex: '1000',
  },
};

export default function PostCheckModal({
  modalType,
  isOpen,
  onRequestClose,
}: Props) {
  const router = useRouter();
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
            modalType === 'needPassword'
              ? modalBtn('/password')
              : modalBtn('/post');
          }}
        >
          확인
        </button>
      </div>
    </ReactModal>
  );
}
