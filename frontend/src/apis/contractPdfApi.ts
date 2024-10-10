import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';

export const getContractPdf = async (chatRoomId : string) => {
  try {
    const response = await axiosInstance.get(END_POINT.CONTRACT + '/' + chatRoomId);
    console.log('hi pdf', response);
    return response;
  } catch (err) {
    console.log('where pdf', err)
  }
};

