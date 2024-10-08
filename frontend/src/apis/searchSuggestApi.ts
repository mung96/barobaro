import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';

export const getSuggest = async (value: string) => {
    try {
        const response = await axiosInstance.get(END_POINT.SUGGESTIONS, {
            params: { query: value }
        });
        console.log('SUGGESTIONS', response.data);
        return response.data;
    } catch (error) {
        console.error('Error SUGGEST API', error);
        throw error;
    }
}