export type Location = {
  addressName: string;
  placeName: string;
  latitude: string;
  longitude: string;
};

export interface KakaoLocalSearchMeta {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
}

export interface KakaoLocalSearchDocument {
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
}

export interface KakaoLocalSearchResponse {
  meta: KakaoLocalSearchMeta;
  documents: KakaoLocalSearchDocument[];
}
