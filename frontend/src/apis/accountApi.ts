import {axiosInstance} from "@/apis/axiosInstance";
import {END_POINT} from "@/constants/api";

export const getUserAccounts = async () => {
    try {
        const response = await axiosInstance.get(END_POINT.ACCOUNT);
        console.log('ACCOUNTs', response.data.body['accounts'])
        return response.data.body['accounts'];
    } catch (err) {
        console.log('GetUserAccounts err', err)
    }

}
