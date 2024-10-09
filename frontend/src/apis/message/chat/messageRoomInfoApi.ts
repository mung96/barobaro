import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';
import { ChatRoomInfoResponse } from '@/types/apis/chatRoomResponse';

// eslint-disable-next-line import/prefer-default-export
export const getMessageRoomInfo = async (chatId: string) => {
  try {
    const response = await axiosInstance.get<ChatRoomInfoResponse>(
      `${END_POINT.CHATROOM}/${chatId}`,
      {},
    );

    return response; // 데이터 반환
  } catch (error) {
    console.error('Error fetching chat room info:', error);
    throw error; // 오류 발생 시 예외 처리
  }
};
