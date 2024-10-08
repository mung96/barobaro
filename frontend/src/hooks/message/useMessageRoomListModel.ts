import { getMessageRoomList } from '@/apis/message/chat/messageRoomListApi';
import ChatRoomType from '@/components/message/ChatRoomType';
import { useEffect, useState } from 'react';

const useMessageRoomListModel = () => {
  const [chatList, setChatList] = useState<ChatRoomType[] | any>();

  useEffect(() => {
    const getResponse = async () => {
      try {
        const apiResponse = await getMessageRoomList();
        setChatList(apiResponse);
      } catch (err) {
        console.error('API 요청 중 오류 발생:', err);
      }
    };
    getResponse();
  }, []);
  return { chatList };
};

export default useMessageRoomListModel;
