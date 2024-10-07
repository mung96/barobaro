export const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
export const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const NEXT_BASE_URL = process.env.NEXT_PUBLIC_FRONT_URL;
export const KAKAO_BASE_URL = 'https://dapi.kakao.com/v2/';

export const END_POINT = {
  LOCATION: 'local/search/keyword.json',
  ADDRESS: 'local/search/address.json',
  GOOGLE_LOGIN: 'members/signin/social/google',
  NAVER_LOGIN: 'members/signin/social/naver',
  KAKAO_LOGIN: 'members/signin/social/kakao',

  LOGOUT: 'members/logout',
  SIGN_UP: 'members/signup',
  MY_PASSWORD: 'members/me/password',
  MY_PROFILE: 'members/me/profile',
  SIGN_UP_INFO: 'members/signup/info',

  CHATROOM: 'chatrooms',
  CHAT_IMAGE: 'chatrooms/image',

  CONTRACT: 'contracts',
  CONTRACT_APPROVE: 'contracts/approve',
  CONTRACT_REQUEST: 'contracts/request',
  CONTRACT_TERMINATE: 'contracts/terminate',
  CONTRACT_SIGN_OWNER: 'contracts/sign/owner',
  CONTRACT_SIGN_RENTAL: 'contracts/sign/rental',

} as const;

export const HTTP_STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 404,
  CONTENT_TOO_LARGE: 413,

  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGE = {};

export const NETWORK = {
  RETRY_COUNT: 2,
  TIMEOUT: 10000,
} as const;
