import { kakaoInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';
import { KakaoLocalSearchResponse } from '@/types/domains/location';

// eslint-disable-next-line import/prefer-default-export
export const getLocationListByQuery = async (query: string) => {
  const response = await kakaoInstance.get<KakaoLocalSearchResponse>(
    END_POINT.LOCATION,
    {
      params: { query, size: 6 },
    },
  );
  return response;
};
