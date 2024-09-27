import {
  KAKAO_BASE_URL,
  KAKO_REST_API_KEY,
  SERVER_BASE_URL,
} from '@/constants/api';
import axios from 'axios';

export const kakaoInstance = axios.create({
  baseURL: KAKAO_BASE_URL,
  headers: { Authorization: `KakaoAK ${KAKO_REST_API_KEY}` },
});

export const axiosInstance = axios.create({
  baseURL: SERVER_BASE_URL,

  withCredentials: true,
});
