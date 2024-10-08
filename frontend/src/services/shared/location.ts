import { KakaoLocalSearchDocument, Location } from '@/types/domains/location';

// eslint-disable-next-line import/prefer-default-export
export const convertLocationDataToView = (
  locationData: KakaoLocalSearchDocument,
) => {
  const locationView: Location = {
    addressName: locationData.address_name,
    placeName: locationData.place_name,
    latitude: locationData.y,
    longitude: locationData.x,
  };

  return locationView;
};
