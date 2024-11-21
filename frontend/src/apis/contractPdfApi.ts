import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';

export const getContractPdf = async (chatRoomId : number) => {
  try {
    const response = await axiosInstance.get(END_POINT.CONTRACT+'/'+chatRoomId);
    return response;
  } catch (err) {
    console.log('where pdf', err)
  }
};

