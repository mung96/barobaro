import { getLocationByQuery } from '@/apis/shared/kakaoApi';
import { convertLocationDataToView } from '@/services/shared/location';
import { Location } from '@/types/shared/location';

import { useMemo, useState } from 'react';

const useLocationModel = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  const searchLocationByQuery = async (query: string) => {
    try {
      const locationData = await getLocationByQuery(query);
      const locationViews: Location[] = [];

      locationData.data.documents.map((location) => {
        locationViews.push(convertLocationDataToView(location));
      });

      setLocations(locationViews);
    } catch (error) {
      //TODO: 에러 핸들링시 수정해야함
      alert('위치를 찾을 수 없습니다.');
    }
  };

  return { locations, searchLocationByQuery };
};

export default useLocationModel;
