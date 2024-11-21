import ReactModal from 'react-modal';
import ModalClose from '../(SVG_component)/ModalClose';
import { StatusModalType } from '@/types/message/chat/statusModalType';

import { useContext, useEffect } from 'react';
import MessageFormType from '../message/chat/MessageFormType';
import currentTime from '@/utils/currentTime';
import { SocketClientContext } from '@/contexts/SocketClientContext';
import { ProcessContext } from '@/contexts/ChatProcessContext';
import { useProfileObject } from '@/store/useMyProfile';
import PasswordConfirmKeypad from '@/components/user/PasswordConfirmKeypad';
import {getPINApi} from "@/apis/passwordApi";

type PasswordCheckModalParams = {
  isOpen: boolean;
  onRequestClose: () => void;
  modalChanger?: (modal: StatusModalType) => void;
  purpose: string; // 모달 활용 목적
  onChange?: (value: number) => void
  value?: number;
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

const PasswordCheckModal = ({ isOpen, onRequestClose, modalChanger, purpose, value, onChange }: PasswordCheckModalParams) => {

  const socketClientContext = useContext(SocketClientContext);
  const processContext = useContext(ProcessContext);
  if (!socketClientContext || !processContext) return null;
  const { sendChat } = socketClientContext;
  // const { processSetter } = processContext;
  const profile = useProfileObject();
  // TODO : 비밀번호를 가져오는 과정 오류 발생, 추후 수정 필요.

  const modalFinish = () => {
    // 이 모달의 사용이 끝날 때 (비밀번호가 맞았을 때) 작동할 함수
    if (purpose === 'beforeSignature' && modalChanger) modalChanger('signature');


    else if (purpose === 'beforePay') {
      // 송금 액션 들어가야 함(axios 등)

      //    processSetter(ProcessTypes.PAID_DIRECT);

      const payFinishedMessage: MessageFormType = {
        type: 3,
        user: profile.id,
        body: 'paid',
        timestamp: currentTime(),
      };

      sendChat(payFinishedMessage);
      onRequestClose();
    }
  };

  useEffect(() => {
    if (value?.toString().length === 6) modalFinish();
  }, [value]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="pwdCheck"
      ariaHideApp={false}
      style={modalStyle}
    >
      <div className="flex flex-col w-[100vw] h-[100vh] items-center">
        <div className="pl-3 pt-3 h-[4vh] self-start" onClick={onRequestClose} role="presentation">
          <ModalClose />
        </div>
        <div className="flex h-[4vh] text-base font-bold mt-3 mb-3">비밀번호 확인</div>
        <PasswordConfirmKeypad value={value} onChange={onChange} />
      </div>
    </ReactModal>
  );
};

export default PasswordCheckModal;
