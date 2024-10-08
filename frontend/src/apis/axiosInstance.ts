import axios from 'axios';
import { KAKAO_BASE_URL, KAKAO_REST_API_KEY, NETWORK } from '@/constants/api';

export const kakaoInstance = axios.create({
  baseURL: KAKAO_BASE_URL,
  headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` },
});

export const axiosInstance = axios.create({
  // baseURL: SERVER_BASE_URL, // 기본 URL
  baseURL: '/api',
  withCredentials: true, // 도메인이 다른 서버에 쿠키 요청시 필요
  timeout: NETWORK.TIMEOUT, // TimeOut 시간이 지나도 응답이 안오면 에러처리됨
  headers: {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc0NlcnRpZmljYXRlZCI6ZmFsc2UsInN1YiI6IjE2MDRiNzcyLWFkYzAtNDIxMi04YTkwLTgxMTg2YzU3ZjU5OCIsImlzcyI6Ind3dy5zYW1zdW5nLmNvbSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJleHAiOjE3MzEyNzAxMDl9.izpT5rUftxkSm-fu467p4SjkVdAWJlnk4FvjMF-4eZ7PvMMco4foiujqcUb7LDtT9hw6udA4V0ZJZOkaysBgzA', // Authorization 헤더에 Bearer 토큰 추가
  },
});
