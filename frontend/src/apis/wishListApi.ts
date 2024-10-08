import {axiosInstance} from "@/apis/axiosInstance";
import {END_POINT} from "@/constants/api";

export const getWishPostApi = async (productId: string) => {
    try {
        const response = await axiosInstance.post(END_POINT.WISH_LIST + '/' + productId);
        console.log('POST 성공', response.headers);
        return response.headers; // 응답 데이터 반환
    } catch (error) {
        console.error('POST 요청 중 오류 발생:', error);
        throw error; // 오류를 호출자에게 전달
    }
}

export const getWishDeleteApi = async (productId: string) => {
    try {
        const response = await axiosInstance.delete(END_POINT.WISH_LIST + '/' + productId);
        console.log('DELETE 성공', response.headers);
        return response.headers; // 응답 데이터 반환
    } catch (error) {
        console.error('POST 요청 중 오류 발생:', error);
        throw error; // 오류를 호출자에게 전달
    }
}
