'use client';

import useMessageRoomListModel from '@/hooks/message/useMessageRoomListModel';
import ChatRoomEach from './ChatRoom';
import ChatRoomType from './ChatRoomType';
import { useEffect, useState } from 'react';

type MessageRoomListParam = {
  selectValue: string;
};

export default function MessageRoomList({ selectValue }: MessageRoomListParam) {
  const { chatList } = useMessageRoomListModel(); // 초기값 설정
  const [chatRooms, setChatRooms] = useState<ChatRoomType[]>([]);

  useEffect(() => {
    // 사용자가 선택한 탭 값에 따라 '전체', '소유', '대여' 물건 따로 보여주기
    const messageFilter = (chatRoom: ChatRoomType) => {
      switch (selectValue) {
        case 'entire':
          return true; // 모든 채팅방을 보여줌
        case 'own':
          return chatRoom.chatRoomStatus === 'OWNER'; // 소유한 채팅방만 보여줌
        case 'lent':
          return chatRoom.chatRoomStatus !== 'OWNER'; // 대여한 채팅방만 보여줌
        default:
          return false; // 해당하지 않는 경우
      }
    };
    if (chatList) setChatRooms(chatList.filter(messageFilter));
  }, [chatList, selectValue]);
  return (
    <div className="mt-[2vh] flex-1 overflow-auto">
      {chatRooms.length > 0 ? (
        chatRooms.map((each) => (
          <ChatRoomEach
            key={each.chatRoomId}
            chatRoomId={each.chatRoomId}
            nickname={each.nickname}
            profileImage={each.profileImage}
            productMainImage={each.productMainImage}
            lastChat={each.lastChat}
            lastChatTime={each.lastChatTime}
            chatRoomStatus={each.chatRoomStatus}
          />
        ))
      ) : (
        <ChatRoomEach
          key={11111}
          chatRoomId={'11111'}
          nickname={'dummy 유저'}
          profileImage={'https://loremflickr.com/320/240'}
          productMainImage={'https://loremflickr.com/320/240'}
          lastChat={
            '저기요 제가 지금 진짜 급해서 그런데 이거 언제 보내주시는 거예요?'
          }
          lastChatTime={new Date()}
          chatRoomStatus={'OWNER'}
        />
      )}
    </div>
  );
}
