export const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
export const SERVER_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const KAKAO_BASE_URL = 'https://dapi.kakao.com/v2/';

export const END_POINT = {
  LOCATION: 'local/search/keyword.json',
  GOOGLE_LOGIN: 'members/signin/social/google',
  NAVER_LOGIN: 'members/signin/social/naver',
  KAKAO_LOGIN: 'members/signin/social/kakao',
} as const;

export const HTTP_STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBBIDEN: 409,
  CONTENT_TOO_LARGE: 413,

  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGE = {};

export const NETWORK = {
  RETRY_COUNT: 2,
  TIMEOUT: 10000,
} as const;
