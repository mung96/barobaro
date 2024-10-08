'use client';

import { useEffect } from 'react';
import { getLocation, changeMainLocation } from "@/apis/profileApi";
import { useSetLocations, useLocations } from '@/store/useLocationStore';

export default function UserTown() {
    const locations = useLocations();
    const setLocations = useSetLocations();

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await getLocation();
                setLocations(response);
            } catch (error) {
                console.error("위치 정보를 가져오는데 실패했습니다:", error);
            }
        };

        fetchLocations();
    }, [setLocations]);

    // // 메인 위치 변경 함수 (필요시 사용)
    // const handleChangeMainLocation = async (locationId: string) => {
    //     try {
    //         await changeMainLocation(locationId);
    //         // 위치 정보를 다시 불러와 상태를 업데이트
    //         const updatedLocations = await getLocation();
    //         setLocations(updatedLocations);
    //     } catch (error) {
    //         console.error("메인 위치 변경에 실패했습니다:", error);
    //     }
    // };

    return (
        <div>
            {/*{locations.map((location, index) => (*/}
            {/*    <div key={index} className="w-[100px] h-[20px] bg-amber-200 my-2">*/}
            {/*        {location}*/}
            {/*    </div>*/}
            {/*))}*/}
            asdas
        </div>
    );
}