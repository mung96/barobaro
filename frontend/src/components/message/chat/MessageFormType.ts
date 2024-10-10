import { UUID } from 'crypto';

type MessageFormType = {
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

export default MessageFormType;
