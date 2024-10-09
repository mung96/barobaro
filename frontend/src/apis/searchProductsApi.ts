import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';



// TODO : Location Id => string 값으로
export const getSearchData = async (keywords: string, category: string, locationId: number) => {
    if (keywords === '') {
        try {
            const stringLocationId = locationId.toString();
            const response = await axiosInstance.get(END_POINT.SEARCH_RECENTLY, {
                params: { category: category, locationId: stringLocationId }
            });
            console.log('RECENTLY SEARCH API', category, stringLocationId,response);
            return response;
        } catch (err) {
            console.log('RECENTLY ERR', err)
        }
    }

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

// TODO : main 동네가 어디인지 store에서 정보를 가져오고, 이를 기반으로 요청을 진행한다.
// export const getSearchCategoryData = async (catrgory: string) => {
//
//     try {
//
//     }
// }