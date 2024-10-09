import { axiosInstance, nonLoginInstance } from "@/apis/axiosInstance"
import { END_POINT } from "@/constants/api"
import { DefaultLocationResponse, DefaultLocationRequest, MyLocationRequest, SearchLocationRequest, MyLocationsResponse, SearchResultDongResponse } from "@/types/apis/location"

export const postDefaultLocation = async (locationNumber : number) => {
    try {
        const locationString = await locationNumber.toString();
        const response =  await axiosInstance.post(END_POINT.DEFAULT_LOCATION,{
            locationId: locationString
        })
        console.log('SUCCESS CHANGE MAIN', response)
        return response
    } catch (err) {
        console.log('ChangeMainLocation Error', err)
    }

}
export const getMyLocations = async () => {
    return await axiosInstance.get<MyLocationsResponse>(END_POINT.MY_LOCATIONS)
}

export const postMyLocation = async (data:MyLocationRequest) => {
    return await axiosInstance.post<MyLocationsResponse>(END_POINT.MY_LOCATIONS,{data})
}
export const getDongList = async (data:SearchLocationRequest) => {
    return await nonLoginInstance.get<SearchResultDongResponse>(END_POINT.SEARCH_LOCATION,{params:{...data}})
}