import { kakaoInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/apis/constants';

export const getLocationByQuery = async (query: string) => {
  return await kakaoInstance.get(END_POINT.LOCATION, {
    params: { query: query },
  });
};
