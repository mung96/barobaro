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