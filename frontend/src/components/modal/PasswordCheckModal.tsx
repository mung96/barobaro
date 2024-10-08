import ReactModal from 'react-modal';
import ModalClose from '../(SVG_component)/ModalClose';
import { StatusModalType } from '@/types/message/chat/statusModalType';

type PasswordCheckModalParams = {
  isOpen: boolean;
  onRequestClose: () => void;
  modalChanger: (modal: StatusModalType) => void;
};

const modalStyle: ReactModal.Styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // 배경색
    zIndex: 1000, // 다른 요소 위에 오도록 설정
  },
  content: {
    position: 'fixed', // 'absolute' 대신 'fixed'로 변경
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: 'none',
    borderRadius: '0',
    padding: '0',
  },
};

const PasswordCheckModal = ({
  isOpen,
  onRequestClose,
  modalChanger,
}: PasswordCheckModalParams) => {
  const modalFinish = () => {
    // 이 모달의 사용이 끝날 때 (비밀번호가 맞았을 때) 작동할 함수
    modalChanger('signature');
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="pwdCheck"
      ariaHideApp={false}
      style={modalStyle}
    >
      <div className="flex flex-col w-[100vw] h-[100vh] items-center">
        <div
          className="pl-3 pt-3 h-[4vh] self-start"
          onClick={onRequestClose}
          role="presentation"
        >
          <ModalClose />
        </div>
        <div className="flex h-[4vh] text-base font-bold mt-3 mb-3">
          비밀번호 확인
        </div>
        {/* 비밀번호 확인 파트 */}
      </div>
    </ReactModal>
  );
};

export default PasswordCheckModal;
