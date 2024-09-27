import { kakaoInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';
import { KakaoLocalSearchResponse } from '@/types/domains/location';

export const getLocationListByQuery = async (query: string) => {
  return await kakaoInstance.get<KakaoLocalSearchResponse>(END_POINT.LOCATION, {
    params: { query: query, size: 5 },
  });
};
