import { kakaoInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/apis/constants';
import { KakaoLocalSearchResponse } from '@/types/shared/location';

export const getLocationByQuery = async (query: string) => {
  return await kakaoInstance.get<KakaoLocalSearchResponse>(END_POINT.LOCATION, {
    params: { query: query, size: 5 },
  });
};
