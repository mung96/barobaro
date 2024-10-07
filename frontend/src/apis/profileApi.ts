import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';

export const getProfile = async () => {
    const response = await axiosInstance.get(END_POINT.MY_PROFILE);
    console.log('Profile', response.data)
    return response.data;
}