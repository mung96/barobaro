export type Location = {
  addressName: string;
  placeName: string;
  latitude: string;
  longitude: string;
};

export type KakaoLocalSearchMeta = {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
};

export type KakaoLocalSearchDocument = {
  place_name: string;
  distance: string;
  place_url: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  id: string;
  phone: string;
  category_group_code: string;
  category_group_name: string;
  x: string;
  y: string;
};

type Address = {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_3depth_h_name: string;
  h_code: string;
  b_code: string;
  mountain_yn: string;
  main_address_no: string;
  sub_address_no: string;
  x: string;
  y: string;
};

type RoadAddress = {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  underground_yn: string;
  main_building_no: string;
  sub_building_no: string;
  building_name: string;
  zone_no: string;
  x: string;
  y: string;
};

export type KakaoDongSearchDocument = {
  address_name: string;
  address_type: 'REGION' | 'ROAD' | 'REGION_ADDR' | 'ROAD_ADDR';
  x: string;
  y: string;
  address: Address;
  road_address: RoadAddress;
};

export type KakaoLocalSearchResponse = {
  meta: KakaoLocalSearchMeta;
  documents: KakaoLocalSearchDocument[];
};

export type KakaoLocalDongResponse = {
  meta: KakaoLocalSearchMeta;
  documents: KakaoDongSearchDocument[];
};
