import { FC, useEffect, useState } from 'react';
import MessageFormType from './MessageFormType';


import { neverExpected } from '@/utils/typeGuard';
import useStatusMessageModel from '@/hooks/message/chat/useStatusMessageModel';
import SignatureModal from '@/components/modal/SignatureModal';
import ContractRequestModal from '@/components/modal/ContractRequestModal';
import MessageCommonStyles from './MessageStyles';
import PasswordCheckModal from '@/components/modal/PasswordCheckModal';
import Button from '@/components/shared/Button';
import { UUID } from 'crypto';
import { getContractRequest, postContractApprove } from '@/apis/contractApi';
import { useParams } from 'next/navigation';

type BodyType = 'contract' | 'signature' | 'finished';

type Props = {
  id?: number;
  type: number;
  user: UUID | string; // API 연결 후 UUID로 바꾸어 주세요
  nickname?: string;
  body: string;
  timestamp: string;
  isMine?: boolean; // 하위 메시지 컴포넌트에서만 사용함
  isImg?: boolean; // UserMessage 컴포넌트에만 사용함
  otherUuid?: UUID | string; // 상대방의 uuid (Message 컴포에서만 사용)

};
const StatusMessage = ({ body, timestamp, isMine }: Props) => {
  const { modalOpen, modalClose, modalTrigger, modalType, modalChanger } =
    useStatusMessageModel();

  const [data, setData] = useState();

  const { chat_id: chatRoomId } = useParams();
  const handleRequestModalOpen = async () => {
    try {
      const response = await getContractRequest(Number(chatRoomId));
      setData(response.data.body);
      console.log(response);
      modalTrigger('request');
    } catch (error) {
      console.log(error);
    }

    // return postContractApprove;
  }


  const messageBody = (bodyProp: BodyType) => {
    if (bodyProp === 'contract') {
      return (
        <div>
          닉네임1님께서 <b>고양이 쓰다듬고 가세요</b>에 대하여 계약을
          요청하셨습니다.
        </div>
      );
    }
    if (bodyProp === 'signature') {
      return (
        <div>
          &quot;닉네임1_닉네임2_응원봉_대여계약서_20240923&quot;에 서명해
          주세요.
        </div>
      );
    }
    if (bodyProp === 'finished') {
      return (
        <>
          <div>
            &quot;닉네임1_닉네임2_응원봉_대여계약서_20240923&quot;에 모든 서명이
            완료되었습니다. 문서 내용을 확인해 보세요.
          </div>
          <div>
            &quot;닉네임1_닉네임2_응원봉_대여계약서_20240923&quot;에 모든 서명이
            완료되었습니다. 문서 내용을 확인해 보세요.
          </div>
          <div className="mt-[2vh]"> 문서이름:</div>
          <div>닉네임1_닉네임2_응원봉_대여계약서_20240923</div>
        </>
      );
    }
    return neverExpected(bodyProp);
  };

  return (
    <div
      className={`${MessageCommonStyles.outerDivStyle} ${isMine ? 'justify-end' : 'justify-start'}`}
    >
      {isMine && (
        <div
          className={`${MessageCommonStyles.timestampStyle} p${isMine ? 'r' : 'l'}-[1vh]`}
        >
          {timestamp}
        </div>
      )}
      <div className="w-[60vw]">
        <div
          className={`${MessageCommonStyles.messageStyle.substring(0, 55)} pl-[2.3vh] pt-[1.5vh] pb-[1.5vh] ${isMine ? 'rounded-tl-2xl' : 'rounded-tr-2xl'} bg-gray-500`}
        >
          <div className="font-bold">
            {body === 'contract' ? '계약을' : '전자계약서 서명을'}
          </div>
          <div className="font-bold">
            {body === 'finished' ? '완료하였습니다.' : '요청하였습니다.'}
          </div>
        </div>

        <div
          className={`${MessageCommonStyles.messageStyle} rounded-b-2xl bg-gray-400`}
        >
          <div>닉네임2님,</div>
          {messageBody(body as BodyType)}

          {(body === 'signature' || body === 'finished') && (
            <>
              <div className="mt-[2vh]">서명 요청자:</div>
              <div>닉네임1(010-1234-****)</div>

              <div className="mt-[2vh]">서명자:</div>
              <div>닉네임1(010-1234-****)</div>
              <div>닉네임2(010-5678-****)</div>
            </>
          )}

          {!isMine && (body === 'signature' || body === 'contract') && (
            <>
              <Button
                onClick={body === 'signature'
                  ? () => modalTrigger('password')
                  : handleRequestModalOpen}
                width="100%"
                height="32px">
                <p>{body === 'signature' && '서명하기'}
                  {body === 'contract' && '상세보기'}</p>
              </Button>

              {modalType === 'signature' && ( // '서명하기' 모달
                <SignatureModal
                  isOpen={modalOpen}
                  onRequestClose={modalClose}
                />
              )}

              {modalType === 'request' && ( // '상세보기' 모달 (대여자가 요청한 계약 요청서를 봄)
                <ContractRequestModal
                  disabled={true}
                  data={data}
                  isOpen={modalOpen}
                  onRequestClose={modalClose}
                  isFromStatusMessage
                  modalChanger={modalChanger} // -> password
                />
              )}

              {modalType === 'password' && (
                <PasswordCheckModal
                  isOpen={modalOpen}
                  onRequestClose={modalClose}
                  modalChanger={modalChanger} // -> signature
                  purpose="beforeSignature"
                />
              )}
            </>
          )}
        </div>
      </div>
      {
        isMine || (
          <div className={`${MessageCommonStyles.timestampStyle} pl-[1vh]`}>
            {timestamp}
          </div>
        )
      }
    </div >
  );
};

export default StatusMessage;
