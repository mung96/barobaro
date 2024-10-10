import { FC, useContext } from 'react';
import MessageFormType from './MessageFormType';
import MessageCommonStyles from './MessageStyles';
import { useProfileObject } from '@/store/useMyProfile';
import { OpponentContext } from '@/contexts/ChatOpponentUserInfoContext';

const SystemMessage: FC<MessageFormType> = ({ user, timestamp, body }) => {
  const profile = useProfileObject();
  const context = useContext(OpponentContext);
  if (!context) return <div> SystemMessage에서 context를 로드하지 못했습니다. </div>;
  const { otherNickname } = context;
  const nickname = user === profile.id ? profile.nickname : otherNickname;

  return (
    <div className={`${MessageCommonStyles.outerDivStyle} justify-center pb-[2vh]`}>
      <div className="text-xs">
        {body === 'datealert' && ( // A-1. 날짜 변경 표시 메시지
          <div>{timestamp}</div>
        )}
        {body === 'modified' && ( // A-2. 계약조건 수정 안내 메시지
          <div className="flex flex-col justify-center">
            <div className="flex">
              <b>{nickname}</b>님이 계약조건을&nbsp;
              <b className="text-blue-100">수정</b>
              하였습니다.
            </div>
            <div className="flex justify-center">계약조건을 다시 한 번 확인해주세요!</div>
          </div>
        )}
        {body === 'finished' && ( // A-3. 계약 완료 안내 메시지
          <div className="flex flex-col justify-center whitespace-nowrap">
            <div className="flex justify-center">
              계약이&nbsp;
              <b className="text-blue-100">완료</b>
              되었습니다.
            </div>
            <div className="flex justify-center">
              계약서가&nbsp;<b>이메일</b>로 발송되었습니다.&nbsp;
              <b>이메일</b>을&nbsp;<b>확인</b>해 주세요!
            </div>
          </div>
        )}
        {body === 'received' && (
          <div>
            <b>{nickname}</b>님께서 대여 물품을 <b>수령</b>하셨습니다.
          </div>
        )}
        {body === 'paid' && (
          <div>
            <b>{nickname}</b>님께서 <b>송금</b>을 완료하셨습니다.
          </div>
        )}
        {(body === 'accept' || body === 'reject') && ( // A-4. 거래 요청 수락 / 거절 메시지
          <div>
            <b>{nickname}</b>님이 계약을
            <b> {body === 'accept' ? '수락' : '거절'}</b>
            했습니다.
          </div>
        )}
        {body === 'accept' ||
          body === 'reject' ||
          body === 'finished' ||
          body === 'modified' ||
          body === 'datealert' ||
          body === 'received' ||
          body === 'paid' || ( // A-5. 지정된 body 값에 해당하지 않는 경우
            <div>메시지 변환 중 오류가 발생하였습니다.</div>
          )}
      </div>
    </div>
  );
};

export default SystemMessage;
