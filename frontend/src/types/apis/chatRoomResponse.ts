import { UUID } from 'crypto';
import { BackMessageFormType } from '../message/chat/BackMessageFormType';

export type ChatRoomDto = {
  chatRoomId: number;
  opponentUuid: UUID;
  opponentNickname: string;
  rentalStatus: string;
  productId: number;
  ownerUuid: UUID;
  opponentProfileImage: string;
};

// export type ChatDto = {
//   chatId: number;
//   uuid: UUID;
//   message: string;
//   image: string | null; // 이미지 메시지가 아닌 경우 null
//   chatTime: Date;
//   chatType: string; // user / system
// };

export type ChatRoomInfoResponse = {
  // 채팅방 채팅 상세 조회 API response
  chatRoomDto: ChatRoomDto;
  chatDtos: BackMessageFormType[];
};
