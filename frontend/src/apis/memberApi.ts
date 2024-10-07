import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';
import { SignUpMember, SignUpMemberRequest } from '@/types/apis/memberRequest';
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

  // data를 Blob 타입으로 변환하여 dto 키로 추가
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  formData.append('dto', blob);

  // image를 file 키로 추가
  formData.append('file', image);

  console.dir(formData.get('dto'));
  console.dir(formData.get('file'));

  return await axiosInstance.post(END_POINT.SIGN_UP, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};