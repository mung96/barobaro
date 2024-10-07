type ChatRoomType = {
  profileImage: string; // 상대방 프로필사진
  nickname: string; // 상대방 닉네임
  lastChat: string; // 마지막으로 전송받은 메시지
  productMainImage: string; // 거래 진행 중인 게시글 썸네일
  lastChatTime: Date;
  // unread: boolean;
  chatRoomStatus:string; // 기존의 own, 값이 'owner'이면 기존 own 값이 true
};

export default ChatRoomType;
