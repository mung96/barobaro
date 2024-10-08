import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';

export const getSuggest = async (value: string) => {
    try {
        const response = await axiosInstance.get(END_POINT.SUGGESTIONS, {
            params: { keyword: value }
        });
        console.log('searchSuggestAPI', response.data.body.keywords);
        return response.data.body.keywords;
    } catch (error) {
        throw error;
    }
}