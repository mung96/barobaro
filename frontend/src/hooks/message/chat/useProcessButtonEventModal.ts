import { useState } from 'react';
import { ChatModalType } from '@/types/message/chat/chatModalType';

const useProcessButtonEventModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ChatModalType>(undefined);

  const modalTrigger = (name: ChatModalType) => {
    // 계약조건, 계약요청(대여자), 수령확인, 송금(대여자)
    setModalType(name);
    setModalOpen(true);
  };

  const modalClose = () => {
    setModalOpen(false);
    setModalType(undefined);
  };

  return { modalType, modalOpen, modalClose, modalTrigger };
};

export default useProcessButtonEventModal;
