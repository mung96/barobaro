import SignatureModal from '@/components/modal/SignatureModal';
import { useState } from 'react';

const useStatusMessageModel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 기본적으로 모달 닫힘

  const openSignatureModal = () => {
    setIsModalOpen(true);
  };

  const closeSignatureModal = () => {
    setIsModalOpen(false);
  };

  const openContractModal = () => {};
  return {
    isModalOpen,
    closeSignatureModal,
    openSignatureModal,
    openContractModal,
  };
};

export default useStatusMessageModel;
