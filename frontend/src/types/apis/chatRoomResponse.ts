import { UUID } from 'crypto';

export type chatRoomDto = {
  chatRoomId: number;
  opponentUuid: UUID;
  opponentNickname: string;
  rentalStatus: string;
};

export type chatDto = {
  uuid: UUID;
  message: string;
  image: string | null; // 이미지 메시지가 아닌 경우 null
  chatTime: Date;
  chatType: string; // user / system
};

export type ChatRoomInfoResponse = {
  // 채팅방 채팅 상세 조회 API response
  chatRoomDto: chatRoomDto;
  chatDtos: chatDto[];
};
