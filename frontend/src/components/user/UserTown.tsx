'use client';

import { useEffect, useState } from 'react';
import { getLocation } from "@/apis/profileApi";
import { postDefaultLocation } from "@/apis/locationApi"
import { useSetLocations, useLocations, useSetMain, useMain } from '@/store/useLocationStore';
import Location from "@/components/(SVG_component)/Location";

interface LocationInfo {
  locationId: number;
  name: string;
  dong: string;
  isMain: boolean;
}

export default function UserTown() {
  const locations = useLocations();
  const setLocations = useSetLocations();
  const setMainLocation = useSetMain();
  // const mainLocation = useMain();
  const [isOpen, setIsOpen] = useState(false);
  const [main, setMain] = useState(0);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getLocation();
        setLocations(response);
        const mainRes = response.find((location: LocationInfo) => location.isMain);
        if (mainRes) {
          setMain(mainRes.locationId);
          setMainLocation(mainRes.locationId);
        }
      } catch (error) {
        console.error("위치 정보를 가져오는데 실패했습니다:", error);
      }
    };
    fetchLocations();
  }, [setLocations, setMainLocation]);

  useEffect(() => {
    console.log('MainLocation !!!', main);
  }, [main]);

  const handleChangeMainLocation = async (locationId: number) => {
    try {
      await postDefaultLocation(locationId);
      const updatedLocations = await getLocation();
      setMainLocation(locationId)
      setLocations(updatedLocations);
      setIsOpen(false);
      setMain(locationId);
    } catch (error) {
      console.error("메인 위치 변경에 실패했습니다:", error);
    }
  };

  let mainLocation;
  if (locations === undefined) {
    mainLocation = { dong: 'null' }
  } else {
    mainLocation = locations.find(location => location.isMain) || locations[0];
    console.log('locations', locations)
  }

  return (
    <div className="relative">
      {locations !== undefined && locations.length > 0 ? (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-[10px] ${isOpen ? 'bg-gray-400' : null}`}
          >
            <Location where={mainLocation.dong} />
          </button>

          {isOpen && (
            <div className="absolute left-0 mt-2 w-[150px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu">
                {locations
                  .filter(location => !location.isMain)
                  .map((location) => (
                    <button
                      key={location.locationId}
                      onClick={() => handleChangeMainLocation(location.locationId)}
                      className="block text-left px-4 py-2 text-sm text-gray-700"
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