import { Response } from "@/types/apis/shared"


type LocationId = {
    locationId: number,
}
type IsMain = {
    isMain: boolean,
}



//request
export type LocationRequest=LocationId

export type MyLocationRequest=LocationId & IsMain

export type SearchLocationRequest={
    keyword:string,
}

//response
type MyDong={
    locationId: number,
    name: string,
    dong: string,
};

type Dong= MyDong & { isMain: boolean};

export type DefaultLocationResponse= Response<MyDong>
export type MyLocationsResponse= Response<MyDong[]>
export type SearchResultDongResponse= Response<Dong[]>


