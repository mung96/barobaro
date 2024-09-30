import { useState } from 'react';

export default function useOpenModalModel() {
  const [openModal, setOpenModal] = useState(false);
  const clickModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  return { openModal, clickModal, closeModal };
}
