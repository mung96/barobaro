'use client';

import React, { useEffect, useState } from 'react';
import { getLocation, changeMainLocation } from "@/apis/profileApi";
import { useSetLocations, useLocations } from '@/store/useLocationStore';
import Location from "@/components/(SVG_component)/Location";

export default function UserTown() {
  const locations = useLocations();
  const setLocations = useSetLocations();
  const [isOpen, setIsOpen] = useState(false);

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

  // const handleChangeMainLocation = async (locationId: number) => {
  //   try {
  //     await changeMainLocation();
  //     const updatedLocations = await getLocation();
  //     setLocations(updatedLocations);
  //     setIsOpen(false);
  //   } catch (error) {
  //     console.error("메인 위치 변경에 실패했습니다:", error);
  //   }
  // };

  const mainLocation = locations.find(location => location.isMain) || locations[0];

  return (
    <div className="relative">
      {locations.length > 0 ? (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-[10px] ${isOpen ? 'bg-gray-400' : null}`}
          >
            <Location where={mainLocation.dong} />
            {/*{mainLocation ? mainLocation.dong : '위치를 선택하세요'}*/}
            {/*<span className="ml-2">▼</span>*/}
          </button>

          {isOpen && (
            <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {locations.map((location) => (
                  <button
                    key={location.locationId}
                    // onClick={() => handleChangeMainLocation(location.locationId)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    {location.dong}
                  </button>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <p>위치 정보가 없습니다.</p>
      )}
    </div>
  );
}