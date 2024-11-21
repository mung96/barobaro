import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';

type Props = {
  nowPassword: string;
  modifyPassword: string;
  checkPassword: string;
};

export const patchPINApi = async (passwordData: Props) => {
  try {
    const response = await axiosInstance.patch(END_POINT.PIN_PATCH, passwordData);
    console.log('SUCCESS', response);
    return response;
  } catch (err) {
    console.log('ERROR PIN', err);
  }
};

export const getPINApi = async (password:string) => {
  try {
    const response = await axiosInstance.get(END_POINT.PIN_VERIFIED,{params:{key:password}});
    console.log('SUCCESS', response);
    return response;
  } catch (err) {
    console.log('ERR getPINApi', err);
  }
};

export const postPINApi = async (passwordData: { password: string; checkPassword: string }) => {
  return await axiosInstance.post(END_POINT.PIN_PATCH, passwordData);
};
