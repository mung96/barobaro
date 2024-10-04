import { useState } from 'react';

const useProcessButtonEventModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const requestEvent = () => {
    // 계약요청 버튼 눌렀을 때 -> 모달 나타나야 함
    // 나타난 모달에서 -> 요청 눌러야 process를 바꿀 수 있음.
    // 여기서는 모달만 나타내는 이벤트를 수행함
    setModalOpen(true);
  };

  const receivedEvent = () => {
    // 대여자, 소유자가 수령 확인 버튼을 눌렀을 때 -> 모달 나타나야 함
    // 나타난 모달에서 -> 확인 눌러야 수령 완료됨
    // 여기서는 모달만 나타내는 이벤트를 수행함
    alert('receivedEvent');
  };

  const paidEvent = () => {
    // 대여자가 송금을 함 -> 모달 나타나야 함
    // 나타난 모달에서 -> 확인 눌러야 수령 완료됨
    // 여기서는 모달만 나타내는 이벤트를 수행함
    alert('paidEvent');
  };

  const modalClose = () => {
    setModalOpen(false);
  };

  return { modalOpen, modalClose, requestEvent, receivedEvent, paidEvent };
};

export default useProcessButtonEventModal;
