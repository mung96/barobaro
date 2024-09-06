// 채팅목록에 띄울 채팅방(1개)

// custom types
type ChatRoom = {
  profileImageSrc: string; // 상대방 프로필사진
  otherUserNickname: string; // 상대방 닉네임
  lastMessage: string; // 마지막으로 전송받은 메시지
  stuffThumbImageSrc: string; // 거래 진행 중인 게시글 썸네일
};

export default function ChatRoomEach({
  profileImageSrc,
  otherUserNickname,
  lastMessage,
  stuffThumbImageSrc,
}: ChatRoom) {}
