import { axiosInstance } from '@/apis/axiosInstance';
import ChatRoomType from '@/components/message/ChatRoomType';
import { END_POINT } from '@/constants/api';
import { ChatRoomInfoResponse } from '@/types/apis/chatRoomResponse';

// eslint-disable-next-line import/prefer-default-export
export const getMessageRoomInfo = async (chatId: number) => {
  const response = await axiosInstance.get<ChatRoomInfoResponse>(
    `${END_POINT.CHATROOM}/${chatId}`,
    {
      params: {
        chatRoomId: chatId,
      },
    },
  );

  return response;
};
