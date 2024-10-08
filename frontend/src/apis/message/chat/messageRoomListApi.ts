import { axiosInstance } from '@/apis/axiosInstance';
import ChatRoomType from '@/components/message/ChatRoomType';
import { END_POINT } from '@/constants/api';

// eslint-disable-next-line import/prefer-default-export
export const getMessageRoomList = async () => {
  const response = await axiosInstance.get<ChatRoomType>(
    END_POINT.CHATROOM,
    {},
  );

  return response;
};
