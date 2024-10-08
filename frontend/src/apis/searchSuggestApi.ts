import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';

export const getSuggest = async (value: string) => {
    try {
        const response = await axiosInstance.get(END_POINT.SUGGESTIONS, {
            params: { query: value }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}