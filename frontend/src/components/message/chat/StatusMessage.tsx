import { FC, useContext, useEffect, useState } from 'react';
import { neverExpected } from '@/utils/typeGuard';
import useStatusMessageModel from '@/hooks/message/chat/useStatusMessageModel';
import SignatureModal from '@/components/modal/SignatureModal';
import ContractRequestModal from '@/components/modal/ContractRequestModal';
import MessageCommonStyles from './MessageStyles';
import PasswordCheckModal from '@/components/modal/PasswordCheckModal';
import { OpponentContext } from '@/contexts/ChatOpponentUserInfoContext';
import { useProfileObject } from '@/store/useMyProfile';
import currentTime from '@/utils/currentTime';
import Button from '@/components/shared/Button';
import { getContractRequest, postContractApprove, SignRequest } from '@/apis/contractApi';
import { useParams } from 'next/navigation';
import MessageFormType from '@/components/message/chat/MessageFormType';

type BodyType = 'contract' | 'signature' | 'finished';

const StatusMessage: FC<MessageFormType> = ({ body, timestamp, isMine }) => {
  const { modalOpen, modalClose, modalTrigger, modalType, modalChanger } = useStatusMessageModel();

  const context = useContext(OpponentContext);
  if (!context) return <div></div>;
  const { otherNickname, ownerUuid, boardTitle } = context;

  const profile = useProfileObject();
  const amIOwner: boolean = ownerUuid === profile.id;
  const fileName: string = `대여계약서_${currentTime('file')}_${profile.nickname}_${otherNickname}`;

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
  }


  const messageBody = (bodyProp: BodyType) => {
    if (bodyProp === 'contract') {
      return (
        <div>
          {isMine ? profile.nickname : otherNickname}님께서 <b>{boardTitle}</b>에 대하여 계약을 요청하셨습니다.
        </div>
      );
    }
    if (bodyProp === 'signature') {
      return <div>&quot;{fileName}&quot;에 서명해 주세요.</div>;
    }
    if (bodyProp === 'finished') {
      return (
        <>
          <div>&quot;{fileName}&quot;에 모든 서명이 완료되었습니다. 문서 내용을 확인해 보세요.</div>
          <div className="mt-[2vh]"> 문서이름:</div>
          <div>{fileName}</div>
        </>
      );
    }
    return neverExpected(bodyProp);
  };

  const { chat_id: charRoomId } = useParams();

  const [pinNumber, setPinNumber] = useState(0);
  const [signData, setSignData] = useState<string>('');
  const [s3FileUrl, setS3FileUrl] = useState('');

  useEffect(() => {
    const data = {
      charRoomId, pinNumber, signData, s3FileUrl
    }
    console.log(data);

  }, [pinNumber, signData, s3FileUrl])


  return (
    <div className={`${MessageCommonStyles.outerDivStyle} ${isMine ? 'justify-end' : 'justify-start'}`}>
      {isMine && (
        <div className={`${MessageCommonStyles.timestampStyle} p${isMine ? 'r' : 'l'}-[1vh]`}>{timestamp}</div>
      )}
      <div className="w-[60vw]">
        <div
          className={`${MessageCommonStyles.messageStyle.substring(0, 55)} pl-[2.3vh] pt-[1.5vh] pb-[1.5vh] ${isMine ? 'rounded-tl-2xl' : 'rounded-tr-2xl'} bg-gray-500`}
        >
          <div className="font-bold">{body === 'contract' ? '계약을' : '전자계약서 서명을'}</div>
          <div className="font-bold">{body === 'finished' ? '완료하였습니다.' : '요청하였습니다.'}</div>
        </div>

        <div className={`${MessageCommonStyles.messageStyle} rounded-b-2xl bg-gray-400`}>
          <div>{isMine ? otherNickname : profile.nickname}님,</div>
          {messageBody(body as BodyType)}

          {(body === 'signature' || body === 'finished') && (
            <>
              <div className="mt-[2vh]">서명 요청자: {amIOwner ? profile.nickname : otherNickname} </div>

              <div className="mt-[2vh]">
                서명자: {amIOwner ? profile.nickname : otherNickname},&nbsp;
                {amIOwner ? otherNickname : profile.nickname}
              </div>
            </>
          )}

          {!isMine && (body === 'signature' || body === 'contract') && (
            <>
              <div className='mt-2'>
                <Button
                  onClick={body === 'signature'
                    ? () => modalTrigger('password')
                    : handleRequestModalOpen}
                  width="100%"
                  height="32px">
                  <p>{body === 'signature' && '서명하기'}
                    {body === 'contract' && '상세보기'}</p>
                </Button>
              </div>
              {modalType === 'signature' && ( // '서명하기' 모달
                <SignatureModal onChange={setSignData} isOpen={modalOpen} onRequestClose={modalClose} />
              )}

              {modalType === 'request' && ( // '상세보기' 모달 (대여자가 요청한 계약 요청서를 봄)
                <ContractRequestModal
                  onChange={setS3FileUrl}
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
                  value={pinNumber}
                  onChange={setPinNumber}
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
      {isMine || <div className={`${MessageCommonStyles.timestampStyle} pl-[1vh]`}>{timestamp}</div>}
    </div>
  );
};

export default StatusMessage;
