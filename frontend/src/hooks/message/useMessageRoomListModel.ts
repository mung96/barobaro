import { getMessageRoomList } from '@/apis/message/chat/messageRoomListApi';
import ChatRoomType from '@/components/message/ChatRoomType';
import { useEffect, useState } from 'react';

const useMessageRoomListModel = () => {
  const [chatList, setChatList] = useState<ChatRoomType[] | any[]>();

  useEffect(() => {
    const getResponse = async () => {
      try {
        const apiResponse: any = await getMessageRoomList();
        const beforeConverted: any[] = apiResponse?.data?.body?.chatRooms;
        const afterConverted: ChatRoomType[] = [];
        beforeConverted.map((each) => {
          const thisRoom: ChatRoomType = {
            chatRoomId: each?.chatRoomId,
            profileImage: each?.profileImage,
            nickname: each?.nickname,
            lastChat: each?.lastChat,
            productMainImage: each?.productMainImage,
            lastChatTime: each?.lastChatTime,
            chatRoomStatus: each?.chatRoomStatus,
          };
          afterConverted.push(thisRoom);
        });
        setChatList(afterConverted);
      } catch (err) {
        console.error('API 요청 중 오류 발생:', err);
      }
    };
    getResponse();
  }, []);

  return { chatList };
};

export default useMessageRoomListModel;
