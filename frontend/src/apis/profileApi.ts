import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';
import {MyProfileResponse} from "@/types/apis/memberResponse";

export const getProfile = async () => {
    const response = await axiosInstance.get<MyProfileResponse>(END_POINT.MY_PROFILE);
    console.log('Profile', response.data)
    return response.data;
}