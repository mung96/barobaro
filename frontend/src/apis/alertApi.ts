import {axiosInstance} from "@/apis/axiosInstance";
import {END_POINT} from "@/constants/api";

export const getAlerts = async () => {
  try {
    const response = await axiosInstance.get(END_POINT.ALERT);
    console.log('ALERT', response)
    return response;
  } catch (err) {
    console.log('GEt ALERT ERR', err)
  }
}
