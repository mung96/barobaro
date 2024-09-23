"use client";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function KakaoMap() {
    return (
        <Map
            center={{ lat: 33.5563, lng: 126.79581 }}
            style={{ width: "90%", height: "30dvh" }}
        >
            <MapMarker position={{ lat: 33.55635, lng: 126.795841 }} />
        </Map>
    );
}