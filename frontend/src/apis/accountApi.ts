import {axiosInstance} from "@/apis/axiosInstance";
import {END_POINT} from "@/constants/api";

export const getUserAccounts = async () => {
    const response = await axiosInstance.get(END_POINT.ACCOUNT);
    console.log('ACCOUNTs', response.data.body['accounts'])
    return response.data.body['accounts'];
}
