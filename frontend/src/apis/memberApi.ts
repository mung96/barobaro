import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';
import {  SignUpMemberRequest } from '@/types/apis/memberRequest';
import { SocialMemberResponse } from '@/types/apis/memberResponse';

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

export const postSignUp = async (data: SignUpMemberRequest, image: File) => {
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  formData.append('dto', blob);
  formData.append('file', image);

  return await axiosInstance.post(END_POINT.SIGN_UP, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};