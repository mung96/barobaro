import React, { useContext, useState } from 'react';
import ReactModal from 'react-modal';
// import ModalWarningSVG from '@/components/(SVG_component)/ModalWarning';

import { DateRange } from 'react-day-picker';

import Radio from '@/components/shared/Radio';
import SelectableItem from '@/components/shared/SelectableItem';
import { SocketClientContext } from '@/contexts/SocketClientContext';
import currentTime from '@/utils/currentTime';

import ContractDurationInput from '../message/chat/ContractDurationInput';
import MessageFormType from '../message/chat/MessageFormType';
import { StatusModalType } from '@/types/message/chat/statusModalType';
import { useProfileObject } from '@/store/useMyProfile';
import useContractRequestModel from '@/hooks/contract/useContractRequestModel';
import { useParams } from 'next/navigation';
import Button from '@/components/shared/Button';
import { getContractRequest } from '@/apis/contractApi';
import { formatDate } from '@/utils/dayUtil';
import { IoCalendarClearOutline } from 'react-icons/io5';
import Input from '@/components/shared/Input';

type ContractRequestParams = {
  isOpen: boolean;
  onRequestClose: () => void;
  isFromStatusMessage?: boolean;
  modalChanger?: (modal: StatusModalType) => void;
  data?: any;
  disabled?: boolean;
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
    width: '340px',
    height: '316px',
    padding: '20px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    borderRadius: '10px',
    outline: 'none',
  },
};

const ContractRequestModal = ({ isOpen, onRequestClose, isFromStatusMessage, modalChanger, data, disabled }: ContractRequestParams) => {
  const { chat_id: chatRoomId } = useParams();
  const { rentalDuration, returnType, requestContract, isSubmitting } = useContractRequestModel(Number(chatRoomId as string))
  const socketContext = useContext(SocketClientContext);

  if (!socketContext) {
    return <div> Loading ... </div>; // 두 context가 모두 필요한 경우
  }
  const { sendChat } = socketContext;
  const profile = useProfileObject();
  // const use


  const approveLogic = (isApproved: boolean) => {
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
      onRequestClose();
    }
  };

  const handleRequestSuccess = () => {
    // '대여자가 계약 요청' 버튼을 눌렀을 때의 창 처리
    // submit하는 경우
    // axios로 데이터 보내고
    // 상태메시지 보내고
    const requestMessage: MessageFormType = {
      type: 2,
      user: profile.id,
      body: 'contract',
      timestamp: currentTime(),
    };
    console.log("로직에 성공!")
    sendChat(requestMessage);
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
      <form className="flex flex-col gap-4 justify-center" onSubmit={isFromStatusMessage ? () => approveLogic(true) : requestContract(handleRequestSuccess)}>
        <h2 className="font-bold text-center text-xl">계약 요청서</h2>
        <section className='flex flex-col gap-3'>
          <div className="flex flex-col gap-1">
            <h3 className="text-base">희망 대여 기간</h3>
            {
              !disabled ?
                <ContractDurationInput selected={rentalDuration.field.value as DateRange} onSelect={rentalDuration.field.onChange} />
                :
                <div className="flex gap-2 relative">
                  <Input
                    placeholder="대여 날짜"
                    value={data.desiredStartDate}
                    width="120px"
                    height="40px"
                    icon={<IoCalendarClearOutline className="w-4 h-4 mb-[2px]" />}
                    disabled
                  />
                  <p>~</p>
                  <Input
                    placeholder="반납 날짜"
                    value={data.desiredEndDate}
                    width="120px"
                    height="40px"
                    icon={<IoCalendarClearOutline className="w-4 h-4 mb-[2px]" />}
                    disabled
                  />
                </div>
            }
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-base">반납 방법 선택</h3>
            <Radio.Group
              fieldSetName="반납 방법"
              value={!disabled ? returnType.field.value as string : data.returnType}
              onChange={returnType.field.onChange}
              className="flex gap-4"
            >
              <SelectableItem disabled={disabled} type="radio" value="DIRECT" label="직거래" />
              <SelectableItem disabled={disabled} type="radio" value="DELIVERY" label="택배거래" />
            </Radio.Group>
          </div>
        </section>
        <div className='mt-3'>
          <Button
            type="submit"
            width='100%'
            height='48px'
            disabled={isSubmitting}
          >
            <p className='text-base'> {isFromStatusMessage ? '승인 및 서명' : '요청'}</p>
          </Button>
        </div>
      </form>
    </ReactModal >
  );
};

export default ContractRequestModal;
