import { axiosInstance } from '@/apis/axiosInstance';
import ChatRoomType from '@/components/message/ChatRoomType';
import { END_POINT } from '@/constants/api';

// eslint-disable-next-line import/prefer-default-export
export const getMessageRoomList = async () => {
  const response = await axiosInstance.get<ChatRoomType>(END_POINT.CHATROOM, {
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc0NlcnRpZmljYXRlZCI6ZmFsc2UsInN1YiI6IjE2MDRiNzcyLWFkYzAtNDIxMi04YTkwLTgxMTg2YzU3ZjU5OCIsImlzcyI6Ind3dy5zYW1zdW5nLmNvbSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJleHAiOjE3MzEyNzAxMDl9.izpT5rUftxkSm-fu467p4SjkVdAWJlnk4FvjMF-4eZ7PvMMco4foiujqcUb7LDtT9hw6udA4V0ZJZOkaysBgzA', // Authorization 헤더에 Bearer 토큰 추가
    },
  });

  return response;
};
