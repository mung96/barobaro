import { useState } from 'react';

const useStatusMessageModel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 기본적으로 모달 닫힘

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useStatusMessageModel;
