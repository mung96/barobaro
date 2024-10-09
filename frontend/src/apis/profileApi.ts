import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';
import { MyProfileResponse, SocialMemberResponse } from '@/types/apis/memberResponse';

export const getProfile = async () => {
    const response = await axiosInstance.get<MyProfileResponse>(END_POINT.MY_PROFILE);
    console.log('Profile', response)
    return response;
}

export const getLocation = async () => {
    try {
        const response = await axiosInstance.get(END_POINT.LOCATION_GET);
        console.log('SUCCESS - getLocation', response)
        return response.data.body.locations
    } catch (err) {
        console.log('getLocation Err', err)
    }

}

export const changeMainLocation = async () => {
    try {
        const response = await axiosInstance.post(END_POINT.LOCATION_MAIN_CHANGE);
        console.log('SUCCESS - changeMainLocation', response)
    } catch (err) {
        console.log('changeMainLocation Err', err)
    }

}