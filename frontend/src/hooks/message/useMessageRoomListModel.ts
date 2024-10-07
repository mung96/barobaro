import { getMessageRoomList } from '@/apis/message/chat/messageRoomListApi';
import { useEffect } from 'react';

const useMessageRoomListModel = () => {
  useEffect(() => {
    const getResponse = async () => {
      try {
        const response = await getMessageRoomList();

        console.log(response);
      } catch (err) {
        console.error('API 요청 중 오류 발생:', err);
      }
    };
    getResponse();
  }, []);
};

export default useMessageRoomListModel;
