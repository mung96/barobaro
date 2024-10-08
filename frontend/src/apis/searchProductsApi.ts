import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';

// TODO : Location Id => string 값으로
export const getSearchData = async (keywords: string, category: string) => {
    try {
        const response = await axiosInstance.get(END_POINT.SEARCH_RESULT, {
            params: { keyword: keywords, category: category, locationId: 1 }
        });
        console.log('searchAPI', response);
        return response.data.body.products;
    } catch (error) {
        throw error;
    }
}