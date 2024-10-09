import axios, { AxiosError } from 'axios';
import {
  DummyToken,
  HTTP_STATUS_CODE,
  KAKAO_BASE_URL,
  KAKAO_REST_API_KEY,
  NETWORK,
  SERVER_BASE_URL,
  // SERVER_BASE_URL,
} from '@/constants/api';

export const kakaoInstance = axios.create({
  baseURL: KAKAO_BASE_URL,
  headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
});
export const nonLoginInstance = axios.create({
  baseURL: SERVER_BASE_URL, // 기본 URL
  withCredentials: true, // 도메인이 다른 서버에 쿠키 요청시 필요
  timeout: NETWORK.TIMEOUT, // TimeOut 시간이 지나도 응답이 안오면 에러처리됨
});

export const axiosInstance = axios.create({
  baseURL: SERVER_BASE_URL, // 기본 URL
  withCredentials: true, // 도메인이 다른 서버에 쿠키 요청시 필요
  timeout: NETWORK.TIMEOUT, // TimeOut 시간이 지나도 응답이 안오면 에러처리됨
});

//TODO: 인터셉터, 요청 후 토큰오면 담자.
//요청 전에는 header에 토큰 담기
axiosInstance.interceptors.request.use(
  (config) => {
    const token = location.port === '3001' ? DummyToken : localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  () => {},
);

//요청 후에 Forbidden오면 token 다시 요청
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error?.response?.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
      //providerType에 따라 다른 로직을 타야함
    }
  },
);
