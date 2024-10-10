import { UUID } from 'crypto';

// 백엔드 메시지 타입
export type BackMessageFormType = {
  chatId?: number;
  uuid: UUID | string; // API 연결 이후 UUID only Type으로 바꾸기
  message: string;
  image: string | null; // image src
  chatTime: string; // Date?
  chatType: string;
};
