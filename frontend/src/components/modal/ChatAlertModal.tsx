import React from 'react';
import ReactModal from 'react-modal';

import ModalWarningSVG from '@/components/(SVG_component)/ModalWarning';

type ChatAlertModalParams = {
  isOpen: boolean;
  onRequestClose: () => void;
  type: 'received' | undefined;
};

const modalStyle: ReactModal.Styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // 어두운 배경
    zIndex: 1000, // 다른 요소 위에 오도록 설정
  },
  content: {
    position: 'absolute',
    top: '50%', // 수직 중앙
    left: '50%', // 수평 중앙
    transform: 'translate(-50%, -50%)', // 모달을 자신의 크기만큼 위로 및 왼쪽으로 이동
    width: '320px',
    height: '270px',
    padding: '20px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    borderRadius: '10px',
    outline: 'none',
  },
};

const ChatAlertModal = ({
  isOpen,
  onRequestClose,
  type,
}: ChatAlertModalParams) => {
  const onReceived = () => {
    // 수령확인 버튼 누른 후의 로직 작성
    // 프로세스 바뀌어야 함
    onRequestClose();
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="request"
      ariaHideApp={false}
      style={modalStyle}
    >
      {/* 모달 전체 감싸는 태그 */}
      <div className="flex flex-col ">
        {/* SVG icon 영역 */}
        <div className="self-center">
          <ModalWarningSVG />
        </div>

        {/* alert 영역 */}
        <div className="font-bold self-center mb-[1vh]">
          {type === 'received' && '상품을 받으셨나요?'}
        </div>

        {/* notice 영역 */}
        <div className="flex flex-col text-center text-sm text-gray-300 mb-[1vh]">
          {type === 'received' && (
            <>
              <div>수령 완료 후에는 취소할 수 없습니다.</div>
              <div>꼭 물건을 받으신 후 클릭해 주세요!</div>
            </>
          )}
        </div>

        <div className="text-sm self-center">{/* 여기까지 outer div */}</div>

        {/* outer div 닫는 태그 */}
      </div>

      {/* 버튼 */}
      <div className="flex gap-1">
        <button
          type="button"
          className="bg-gray-500 text-gray-300 rounded-lg w-[50%] p-2 text-sm"
          onClick={onRequestClose}
        >
          돌아가기
        </button>

        {type === 'received' && (
          <button
            type="button"
            className="bg-blue-100 text-white rounded-lg w-[50%] p-2 text-sm"
            onClick={onReceived}
          >
            수령 확인
          </button>
        )}
      </div>
    </ReactModal>
  );
};

export default ChatAlertModal;
