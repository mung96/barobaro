import { axiosInstance } from '@/apis/axiosInstance';
import { END_POINT } from '@/constants/api';

const categoryConverter = {
    'all' : 'ALL',
    'lightstick' : 'LIGHT_STICK',
    'smartphone' : 'SMART_PHONE',
    'telescope' : 'TELESCOPE',
    'camerabody' : 'CAMERA_BODY',
    'cameralens' : 'CAMERA_LENS',
    'etc' : 'ETC',
}

// TODO : Location Id => string 값으로
export const getSearchData = async (keywords: string, category: string, locationId: number) => {
    try {
        const stringLocationId = await locationId.toString()
        const convertedCategory = categoryConverter[category as keyof typeof categoryConverter] || category;

        if (keywords === '') {
            const response = await axiosInstance.get(END_POINT.SEARCH_RECENTLY, {
                params: {
                    category: convertedCategory,
                    locationId: stringLocationId
                }
            });
            console.log('searchAPI-Recently', convertedCategory, response);
            return response.data.body.products;
        }
        const response = await axiosInstance.get(END_POINT.SEARCH_RESULT, {
            params: {
                keyword: keywords,
                category: category,
                locationId: stringLocationId
            }
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