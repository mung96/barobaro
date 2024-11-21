import { useEffect, useState, useContext } from 'react';
import ReactModal from 'react-modal';

import { ProcessContext } from '@/contexts/ChatProcessContext';

import ModalClose from '../(SVG_component)/ModalClose';
import ContractContent from '../message/chat/ContractContent';
import SignatureArea from '../message/chat/SignatureArea';
import currentTime from '@/utils/currentTime';
import MessageFormType from '../message/chat/MessageFormType';
import { SocketClientContext } from '@/contexts/SocketClientContext';
import { useProfileObject } from '@/store/useMyProfile';
import ContractPaperModal from '@/components/modal/ContractPaperModal';
import {axiosInstance} from "@/apis/axiosInstance";
import {END_POINT} from "@/constants/api";
import {postOwnerSign, postRentalSign, SignRequest} from "@/apis/contractApi";
import {useApproveContractUrl, usePinNumber, useSetPinNumber} from "@/store/useContractPaperStore";
import {useParams} from "next/navigation";

type SignatureModalParam = {
  onRequestClose: () => void;
  isOpen: boolean;
  onChange?: (data: string) => void
  isOwner:boolean;
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

const SignatureModal = ({ isOpen, onRequestClose, onChange ,isOwner}: SignatureModalParam) => {
  const [pressed, setPressed] = useState(false); // '확인' 버튼이 눌렸는지
  const [dataUrl, setDataUrl] = useState('');
  const processContext = useContext(ProcessContext);
  const clientContext = useContext(SocketClientContext); // 추가 후 확인 못했음
  const [contextLoaded, setContextLoaded] = useState(false);
  const { process, processSetter } = processContext || {};
  const { sendChat } = clientContext || {};
  const profile = useProfileObject();

  useEffect(() => {
    if (processContext && clientContext) {
      setContextLoaded(true);
    }
  }, [processContext]);
  const pinNumber = usePinNumber();
  const {chat_id} = useParams();
  const pdfUrl = useApproveContractUrl();

  useEffect(() => {
    // 버튼 눌리면 수행할 로직
    // 비동기 -> 서명 그래픽 정보 서버로 보내기
    // 응답 오면 -> 모달 닫기, 프로세스 상태 업데이트하기, 상태 메시지 보내기
    // 프로세스 상태 넘어가면? -> 서명하기 버튼 disabled 되어야 함
    if (contextLoaded && pressed && processSetter !== undefined) {
      // 서명 모달이 뜨는 케이스들
      // 1 ) 소유자가 계약 받을 때 (2, REQUESTED)
      // 2 ) 대여자가 서명할 차례일 때 (4, ACCEPTED_DIRECT)
      // -> 기존 값에 +2 해 주면 됨

      console.log(dataUrl); // BE에 보내야 할 서명 파일

      // useEffect(() => {
      //   console.log(dataUrl)
      // }, []);

      const signRequestMessage: MessageFormType = {
        // 상태 메시지 보내기
        type: 2,
        user: profile.id,
        body: 'signature',
        timestamp: currentTime(),
      };

      const signFinishedMessage: MessageFormType = {
        type: 2,
        user: profile.id,
        body: 'finished',
        timestamp: currentTime(),
      };

      const finishedSystemMessaege: MessageFormType = {
        type: 3,
        user: profile.id,
        body: 'finished',
        timestamp: currentTime(),
      };

      if (process === 2) {
        // 소유자의 서명 요청 메시지
        //   processSetter(4);

        if (sendChat) sendChat(signRequestMessage);
      } else if (process === 4) {
        //   processSetter(6);
        // 숫자로 쓰는 게 더 직관적인 로직이라 숫자로 썼음

        const sendMessages = async () => {
          if (sendChat) {
            await sendChat(signFinishedMessage); // 첫 번째 메시지를 전송
            await sendChat(finishedSystemMessaege); // 두 번째 메시지를 전송
          }
        };

        // 호출
        sendMessages().catch((error) => {
          console.error('Error sending messages:', error);
        });
      }

      onRequestClose(); // 모달 닫기
      setPressed(false);
    }
  }, [pressed]);

  if (!contextLoaded) {
    // context 로드되지 않을 시 리턴할 JSX
    return <div>Loading...</div>;
  }

  const handlePressed = () => {
    setPressed(true);
  };

  const handleSignature = (signatureUrl: string) => {
    onChange && onChange(signatureUrl);
    setDataUrl(signatureUrl);

    const sign = async () =>{
      const data =  {chatRoomId: Number(chat_id),   pinNumber: Number(pinNumber),   signatureData: signatureUrl  , s3FileUrl: pdfUrl}
      return isOwner ? await postOwnerSign(data):await postRentalSign(data);
    }

    sign()
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="signature"
      ariaHideApp={false}
      style={modalStyle}
    >
      <div className="flex flex-col w-[100vw] h-[100vh] items-center">
        <div className="pl-3 pt-3 h-[4vh] self-start" onClick={onRequestClose} role="presentation">
          <ModalClose />
        </div>
        <div className="flex h-[4vh] text-base font-bold mt-3 mb-3">전자계약서 확인 및 서명</div>
        <div className="flex h-[45vh] w-[98vw] overflow-y-auto rounded-xl border border-gray-500">
          {/* 계약서 영역 */}
          {/* <ContractContent /> */}

          <ContractPaperModal />
        </div>
        <div className="flex h-[30vh] w-[98vw] rounded-xl border border-gray-500 mt-3">
          {/* 서명 라이브러리 영역 */}
          <SignatureArea handleSignature={handleSignature} saveTrigger={pressed} />
        </div>
        <button
          type="button"
          className={`w-[90vw] h-[6vh] rounded-xl text-white text-sm mt-3 ${pressed ? 'bg-blue-100 ' : 'bg-blue-500'}`}
          onClick={handlePressed}
        >
          완료
        </button>
      </div>
    </ReactModal>
  );
};

export default SignatureModal;
