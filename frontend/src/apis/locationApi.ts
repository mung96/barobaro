import { axiosInstance } from "@/apis/axiosInstance"
import { END_POINT } from "@/constants/api"

export const postDefaultLocation = async () => {
    return await axiosInstance.post(END_POINT.DEFAULT_LOCATION,{})
}
export const getMyLocations = async () => {
    return await axiosInstance.get(END_POINT.MY_LOCATIONS,{})
}

export const postMyLocation = async () => {
    return await axiosInstance.post(END_POINT.MY_LOCATIONS,{})
}
export const getDongList = async () => {
    return await axiosInstance.post(END_POINT.SEARCH_LOCATION,{})
}