import React from 'react';
import MESSAGETYPES from './MessageTypes';
import MessageFormType from './MessageFormType';
import UserMessage from './UserMessage';
import SystemMessage from './SystemMessage';
import StatusMessage from './StatusMessage';
import { useProfileObject } from '@/store/useMyProfile';

const Message: React.FC<MessageFormType> = ({ type, user, body, timestamp }) => {
  const profile = useProfileObject();
  const me: string = profile.id;
  console.log(profile.id);
  // 메시지 타입에 따라 처리 분리
  const isMine: boolean = me === user; // 내가 보낸 메시지인지
  const isStatus: boolean = type === MESSAGETYPES.STATUS; // 거래 프로세스와 관련된 메시지인지
  const isSys: boolean = type === MESSAGETYPES.SYSTEM; // 시스템 메시지인지(말풍선으로 표시되지 않는 메시지)
  const isImg: boolean = type === MESSAGETYPES.IMAGE; // 이미지 메시지인지

  // 메시지 타입 평가 순서는
  // 시스템 메시지인지 -> 내가 보낸 메시지인지 -> 상태 메시지인지 -> 이미지인지 -> 전부 아니면 남이 보낸 일반 메시지

  return (
    <>
      {/*  A. 시스템 메시지 */}
      {isSys && <SystemMessage type={type} body={body} timestamp={timestamp} user={user} />}
      {/* B. 상태 메시지 */}
      {isStatus && <StatusMessage type={type} body={body} timestamp={timestamp} user={user} isMine={isMine} />}
      {/* C. 텍스트 / 이미지 메시지 */}
      {!isSys && !isStatus && (
        <UserMessage type={type} body={body} timestamp={timestamp} user={user} isMine={isMine} isImg={isImg} />
      )}
    </>
  );
};

export default Message;
