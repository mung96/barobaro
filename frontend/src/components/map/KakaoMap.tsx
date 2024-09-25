'use client';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

type Props = {
  width: string;
  height: string;
  lat: number;
  lng: number;
};

export default function KakaoMap({ width, height, lat, lng }: Props) {
  return (
    <Map
      center={{ lat: lat, lng: lng }}
      style={{ width: width, height: height, zIndex: -0 }}
    >
      <MapMarker position={{ lat: lat, lng: lng }} />
    </Map>
  );
}
