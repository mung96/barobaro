import { axiosInstance } from '@/apis/axiosInstance';
// import { END_POINT } from '@/constants/api';

export const getProductsDetail = async (productId:string) => {
    try {
        const response = await axiosInstance.get(`/products/${productId}`);
        console.log('RESPONSE!')
        return response.data.body
    } catch (err) {
        console.error(err);
    }
}

export const deleteProductsDetail = async (productId:string) => {
    try {
        const response = await axiosInstance.delete(`/products/${productId}`);
        return response;
    } catch (error) {
        console.error('Delete Err', error);
    }
}