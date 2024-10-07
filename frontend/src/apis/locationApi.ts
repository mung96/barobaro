import { axiosInstance } from "@/apis/axiosInstance"
import { END_POINT } from "@/constants/api"
import { DefaultLocationResponse, DefaultLocationRequest, MyLocationRequest, SearchLocationRequest, MyLocationsResponse, SearchResultDongResponse } from "@/types/apis/location"

export const postDefaultLocation = async (data:DefaultLocationRequest) => {
    return await axiosInstance.post<DefaultLocationResponse>(END_POINT.DEFAULT_LOCATION,{data})
}
export const getMyLocations = async () => {
    return await axiosInstance.get<MyLocationsResponse>(END_POINT.MY_LOCATIONS)
}

export const postMyLocation = async (data:MyLocationRequest) => {
    return await axiosInstance.post<MyLocationsResponse>(END_POINT.MY_LOCATIONS,{data})
}
export const getDongList = async (data:SearchLocationRequest) => {
    return await axiosInstance.post<SearchResultDongResponse>(END_POINT.SEARCH_LOCATION,{params:{data}})
}