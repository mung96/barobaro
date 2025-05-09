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

export const postMessageRoomList = async (productId: string) => {
  const response = await axiosInstance.post(END_POINT.CHATROOM, {
    productId,
  });
  return response;
};
