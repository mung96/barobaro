import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';

export const getLentProducts = async () => {
    const response = await axiosInstance.get(END_POINT.LENT);
    console.log('LENT RES', response.data.body['products'])
    return response.data.body['products'];
}

export const getBorrowProducts = async () => {
    const response = await axiosInstance.get(END_POINT.BORROW);
    console.log('BORROW RES', response.data.body['products'])
    return response.data.body['products'];
}

export const getRecentlyUploaded = async () => {
    const response = await axiosInstance.get(END_POINT.RECENTLY_UPLOADED);
    console.log('RECENTLY UPLOADED', response.data.body['products'])
    return response.data.body['products'];
}

export const getRecentlyViewed = async () => {
    const response = await axiosInstance.get(END_POINT.RECENTLY_VIEWED);
    console.log('RECENTLY VIEWED', response.data.body['products'])
    return response.data.body['products'];
}