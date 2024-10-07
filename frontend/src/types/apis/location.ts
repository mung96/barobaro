import { Response } from "@/types/apis/shared"


type LocationId = {
    locationId: number,
}
type IsMain = {
    isMain: boolean,
}



//request
export type DefaultLocationRequest=LocationId

export type MyLocationRequest=(LocationId & IsMain)[]

export type SearchLocationRequest={
    keyword:string,
}

//response
export type MyDong={
   
        locationId: number,
        name: string,
        dong: string,
};

export type Dong= MyDong & { isMain: boolean};

export type DefaultLocationResponse= Response<MyDong>
export type MyLocationsResponse= Response<MyDong[]>
export type SearchResultDongResponse= Response<{result: Dong[]}>


