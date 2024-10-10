import { StatusModalType } from '@/types/message/chat/statusModalType';
import { useState } from 'react';

const useStatusMessageModel = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<StatusModalType>(undefined);

  const modalTrigger = (name: StatusModalType) => {
    // 계약조건, 계약요청(대여자), 수령확인, 송금(대여자)
    setModalType(name);
    setModalOpen(true);
  };

  const modalChanger = (name: StatusModalType) => {
    setModalOpen(false); // 열린 모달 닫고
    modalTrigger(name);
  };

  const modalClose = () => {
    setModalOpen(false);
    setModalType(undefined);
  };

  return { modalType, modalOpen, modalClose, modalTrigger, modalChanger };
};

export default useStatusMessageModel;
