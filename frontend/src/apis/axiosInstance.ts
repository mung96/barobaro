import axios from 'axios';
import {
  KAKAO_BASE_URL,
  KAKAO_REST_API_KEY,
  NETWORK,
  SERVER_BASE_URL,
} from '@/constants/api';

export const kakaoInstance = axios.create({
  baseURL: KAKAO_BASE_URL,
  headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
});

export const axiosinstance = axios.create({
  baseURL: SERVER_BASE_URL, // 기본 URL
  withCredentials: true, // 도메인이 다른 서버에 쿠키 요청시 필요
  timeout: NETWORK.TIMEOUT, // TimeOut 시간이 지나도 응답이 안오면 에러처리됨
});
