import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';
import {SocialMemberResponse} from '@/types/apis/memberResponse';

// eslint-disable-next-line import/prefer-default-export
export const getSignUpInfo = async (email: string) => {
  const response = await axiosInstance.get<SocialMemberResponse>(
    END_POINT.SIGN_UP_INFO,
    {
      params: {
        key: email,
      },
    },
  );

  return response;
};
