import { KakaoLocalSearchDocument, Location } from '@/types/shared/location';

export const convertLocationDataToView = (
  locationData: KakaoLocalSearchDocument,
) => {
  const locationView: Location = {
    addressName: locationData.address_name,
    placeName: locationData.place_name,
    latitude: locationData.x,
    longitude: locationData.y,
  };

  return locationView;
};
