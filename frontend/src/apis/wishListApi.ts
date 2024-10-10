import {axiosInstance} from "@/apis/axiosInstance";
import {END_POINT} from "@/constants/api";

// TODO : APi 문서 확인 후 , 값 및 params 수정
export const getWishPostApi = async (productId: string) => {
    try {
        const response = await axiosInstance.get(END_POINT.WISH_LIST, {
            params: {
                productId,
            }
        });
        console.log('get 성공', response);
        return response.headers; // 응답 데이터 반환
    } catch (error) {
        console.error('get 요청 중 오류 발생:', error);
        throw error; // 오류를 호출자에게 전달
    }
}

export const getWishAddApi = async (productId: string) => {
    try {
        const response = await axiosInstance.post(END_POINT.WISH_LIST + '/' + productId, null, {
            params: {
                isWished: true
            }
        });
        console.log('ADD 성공', response);
        return response; // 응답 데이터 반환
    } catch (error) {
        console.error('POST(ADD) 요청 중 오류 발생:', error);
        throw error; // 오류를 호출자에게 전달
    }
}

export const getWishDeleteApi = async (productId: string) => {
    try {
        const response = await axiosInstance.post(END_POINT.WISH_LIST + '/' + productId, null, {
            params: {
                isWished: false
            }
        });
        console.log('DELETE 성공', response);
        return response; // 응답 데이터 반환
    } catch (error) {
        console.error('POST(DELETE) 요청 중 오류 발생:', error);
        throw error; // 오류를 호출자에게 전달
    }
}
