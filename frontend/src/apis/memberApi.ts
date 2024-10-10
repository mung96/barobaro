import { axiosInstance, nonLoginInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';
import { SignUpMemberRequest } from '@/types/apis/memberRequest';
import { SocialMemberResponse } from '@/types/apis/memberResponse';

// eslint-disable-next-line import/prefer-default-export
export const getSignUpInfo = async (email: string) => {
  const response = await nonLoginInstance.get<SocialMemberResponse>(END_POINT.SIGN_UP_INFO, {
    params: {
      key: email,
    },
  });

  return response;
};

export const postSignUp = async (data: SignUpMemberRequest, image: File | null | undefined | string) => {
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  console.dir(image);
  console.log(image);
  formData.append('dto', blob);
  if (image instanceof File) {
    formData.append('file', image);
  }

  return await nonLoginInstance.post(END_POINT.SIGN_UP, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const patchFcmToken = async (token: string) => {
  return await axiosInstance.patch(END_POINT.FCM_TOKEN, null, {
    params: {
      token,
    },
  });
};
