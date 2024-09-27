import { KAKAO_BASE_URL, KAKO_REST_API_KEY } from '@/apis/constants';
import axios from 'axios';

export const kakaoInstance = axios.create({
  baseURL: KAKAO_BASE_URL,
  headers: { Authorization: `KakaoAK ${KAKO_REST_API_KEY}` },
});
