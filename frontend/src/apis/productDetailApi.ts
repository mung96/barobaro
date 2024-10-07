import { axiosInstance } from '@/apis/axiosInstance';
// import { END_POINT } from '@/constants/api';

export const getProductsDetail = async (productId:string) => {
    try {
        const response = await axiosInstance.get(`/products/${productId}`);
        console.log('RESPONSE!')
        return response
    } catch (err) {
        console.error(err);
    }
}
