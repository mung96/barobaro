import { getLocationListByQuery } from '@/apis/kakaoApi';
import { convertLocationDataToView } from '@/services/shared/location';
import { Location } from '@/types/domains/location';

import { useState } from 'react';

const useLocationModel = () => {
  const [locationList, setLocationList] = useState<Location[]>([]);

  const searchLocationListByQuery = async (query: string) => {
    try {
      const locationListData = await getLocationListByQuery(query);
      const locationListView: Location[] = [];

      locationListData.data.documents.map((location) => {
        locationListView.push(convertLocationDataToView(location));
      });

      setLocationList(locationListView);
    } catch (error) {
      //TODO: 에러 핸들링시 수정해야함
      alert('위치를 찾을 수 없습니다.');
    }
  };

  return { locationList, searchLocationListByQuery };
};

export default useLocationModel;
