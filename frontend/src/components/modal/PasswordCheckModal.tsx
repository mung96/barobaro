import ReactModal from 'react-modal';
import ModalClose from '../(SVG_component)/ModalClose';

type PasswordCheckModalParams = {
  isOpen: boolean;
  onRequestClose: () => void;
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
}: PasswordCheckModalParams) => {
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
        <div className="flex h-[45vh] w-[98vw] overflow-y-auto rounded-xl border border-gray-500">
          {/* 계약서 영역 */}
        </div>
        <div className="flex h-[30vh] w-[98vw] rounded-xl border border-gray-500 mt-3">
          {/* 서명 라이브러리 영역 */}
        </div>
      </div>
    </ReactModal>
  );
};

export default PasswordCheckModal;
