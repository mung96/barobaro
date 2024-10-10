import React, { useContext, useState } from 'react';
import ReactModal from 'react-modal';
// import ModalWarningSVG from '@/components/(SVG_component)/ModalWarning';

import { DateRange } from 'react-day-picker';

import Radio from '@/components/shared/Radio';
import SelectableItem from '@/components/shared/SelectableItem';
import { ProcessContext } from '@/contexts/ChatProcessContext';
import { SocketClientContext } from '@/contexts/SocketClientContext';
import currentTime from '@/utils/currentTime';

import ContractDurationInput from '../message/chat/ContractDurationInput';
import { ProcessTypes } from '../message/chat/ProcessTypes';
import MessageFormType from '../message/chat/MessageFormType';
import { StatusModalType } from '@/types/message/chat/statusModalType';
import { useProfileObject } from '@/store/useMyProfile';

type ContractRequestParams = {
  isOpen: boolean;
  onRequestClose: () => void;
  isFromStatusMessage?: boolean;
  modalChanger?: (modal: StatusModalType) => void;
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
    height: '250px',
    padding: '20px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    borderRadius: '10px',
    outline: 'none',
  },
};

const ContractRequestModal = ({ isOpen, onRequestClose, isFromStatusMessage, modalChanger }: ContractRequestParams) => {
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [ways, setWays] = useState<string>('');

  const processContext = useContext(ProcessContext);
  const socketContext = useContext(SocketClientContext);

  if (!processContext || !socketContext) {
    return <div> Loading ... </div>; // 두 context가 모두 필요한 경우
  }
  // const { processSetter } = processContext;
  const { sendChat } = socketContext;
  const profile = useProfileObject();

  const approveLogic = (isApproved: boolean) => {
    // 소유자가 '상세보기' 버튼을 눌렀을 때 창 처리
    // 대여자의 계약 요청서를 거절할 때
    // 프로세스 contact로 바꾸고 / 시스템메시지 찍고 /
    if (isApproved) {
      const approveMessage: MessageFormType = {
        type: 3,
        user: profile.id,
        body: 'accept',
        timestamp: currentTime(),
      };

      sendChat(approveMessage);
      // 비밀번호 모달 띄우기

      if (modalChanger) modalChanger('password');
    } else {
      const rejectMessage: MessageFormType = {
        type: 3,
        user: profile.id,
        body: 'reject',
        timestamp: currentTime(),
      };
      sendChat(rejectMessage);
      //    processSetter(ProcessTypes.CONTACT);
      onRequestClose();
    }
  };

  const requestLogic = (isSubmit: boolean) => {
    // '대여자가 계약 요청' 버튼을 눌렀을 때의 창 처리
    if (!isSubmit) {
      // 대여자가 계약 요청 창을 열었다가 취소한 경우
      setRange(undefined);
      setWays('');
    } else {
      // submit하는 경우
      // axios로 데이터 보내고

      // 상태메시지 보내고
      const requestMessage: MessageFormType = {
        type: 2,
        user: profile.id,
        body: 'contract',
        timestamp: currentTime(),
      };
      sendChat(requestMessage);

      // 프로세스 바꾸기
      //  processSetter(ProcessTypes.REQUESTED);
    }
    // 대여자가 요청 submit을 했을 경우
    // axios로 데이터 보내고 / 상태메시지 찍고 / 프로세스 requested로 바꾸고
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
        <div className="font-bold self-center mb-[1.5vh]">계약 요청서</div>

        <div className="text-sm self-center">
          {/* 여기까지 outer div */}

          <div className="mb-[1.5vh]">
            <div className="flex mb-1">희망 대여 기간</div>
            {/* DateRangePicker */}
            <div className="flex">
              <ContractDurationInput selected={range} onSelect={setRange} />
            </div>
          </div>

          <div className="mb-[2vh]">
            <div className="flex mb-1"> 반납 방법 선택</div>
            {/* Radio.group -> SelectableItem */}
            <div>
              <Radio.Group
                fieldSetName="반납 방법"
                value={ways}
                onChange={(e) => setWays(e.target.value)}
                className="flex gap-4"
              >
                <SelectableItem type="radio" value="direct" label="직거래" />
                <SelectableItem type="radio" value="delivery" label="택배거래" />
              </Radio.Group>
            </div>
          </div>

          {/* outer div 닫는 태그 */}
        </div>

        {/* 버튼 */}
        <div className="flex gap-1">
          <button
            type="button"
            className="bg-gray-200 text-white rounded-lg w-[50%] p-2 text-sm"
            onClick={isFromStatusMessage ? () => approveLogic(false) : () => requestLogic(false)}
          >
            {isFromStatusMessage ? '거절' : '취소'}
          </button>
          <button
            type="button"
            className="bg-blue-100 text-white rounded-lg w-[50%] p-2 text-sm"
            onClick={isFromStatusMessage ? () => approveLogic(true) : () => requestLogic(true)}
          >
            {isFromStatusMessage ? '승인 및 서명' : '요청'}
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default ContractRequestModal;
