import ReactModal from 'react-modal';
import ModalClose from '../(SVG_component)/ModalClose';
import { StatusModalType } from '@/types/message/chat/statusModalType';
import usePasswordChange from '@/hooks/user/usePasswordModel';
import useKeypad from '@/hooks/keypad/useKeyPadModel';
import KeyPadDelete from '../(SVG_component)/(mypage)/KeyPadDelete';
import DisplayPassword from '../user/DisplayPassword';
import { useContext, useEffect } from 'react';
import MessageFormType from '../message/chat/MessageFormType';
import currentTime from '@/utils/currentTime';
import { SocketClientContext } from '@/contexts/SocketClientContext';
import { ProcessContext } from '@/contexts/ChatProcessContext';
import { ProcessTypes } from '../message/chat/ProcessTypes';

type PasswordCheckModalParams = {
  isOpen: boolean;
  onRequestClose: () => void;
  modalChanger?: (modal: StatusModalType) => void;
  purpose: string; // 모달 활용 목적
};

const modalStyle: ReactModal.Styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // 배경색
    zIndex: 2000, // 다른 요소 위에 오도록 설정
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
  purpose,
}: PasswordCheckModalParams) => {
  const socketClientContext = useContext(SocketClientContext);
  const processContext = useContext(ProcessContext);
  if (!socketClientContext || !processContext) return null;
  const { sendChat } = socketClientContext;
  const { processSetter } = processContext;

  const modalFinish = () => {
    // 이 모달의 사용이 끝날 때 (비밀번호가 맞았을 때) 작동할 함수
    if (purpose === 'beforeSignature' && modalChanger)
      modalChanger('signature');
    else if (purpose === 'beforePay') {
      // 송금 액션 들어가야 함(axios 등)

      processSetter(ProcessTypes.PAID_DIRECT);

      const payFinishedMessage: MessageFormType = {
        type: 3,
        user: '김말이',
        body: 'paid',
        timestamp: currentTime(),
      };

      sendChat(payFinishedMessage);
      onRequestClose();
    }
  };

  const needNewPassword = false;
  const realPassword = '112233'; // 비밀번호 확인하고 없으면 모달 띄우지 말고 바로 back

  const { inputPassword, setInputPassword, passwordMessage, isFinished, step } =
    usePasswordChange(
      needNewPassword,
      needNewPassword ? undefined : realPassword,
    );

  const { passwordHandler, deleteHandler } = useKeypad(setInputPassword);

  useEffect(() => {
    if (step === 1) modalFinish();
  }, [step]);

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
        <main className="flex flex-col justify-center items-center flex-1">
          <p className="text-[14px] text-black-100">{passwordMessage}</p>
          <div className="mt-9">
            {!isFinished ? (
              <DisplayPassword length={inputPassword.length} />
            ) : null}
            {/* 비밀번호를 설정하고 완료되었다면 ---이걸 표시하지 않음. */}
          </div>
        </main>
        <section className="w-full max-w-[500px] mx-auto text-gray-600">
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                type="button"
                className="w-full text-2xl h-[10dvh] flex items-center justify-center"
                onClick={() => passwordHandler(num.toString())}
              >
                {num}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-1 mt-1">
            <div className="w-full bg-transparent" />
            <button
              type="button"
              className="w-full text-2xl h-[10dvh] flex items-center justify-center"
              onClick={() => passwordHandler('0')}
            >
              0
            </button>
            <button
              type="button"
              className="w-full text-2xl h-[10dvh] flex items-center justify-center"
              onClick={deleteHandler}
            >
              <KeyPadDelete />
            </button>
          </div>
        </section>
      </div>
    </ReactModal>
  );
};

export default PasswordCheckModal;
