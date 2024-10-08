export const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
export const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;
export const NEXT_BASE_URL = process.env.NEXT_PUBLIC_FRONT_URL;
export const KAKAO_BASE_URL = 'https://dapi.kakao.com/v2/';
export const DummyToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;
export const FCM_VAPID_KEY = process.env.NEXT_PUBLIC_FCM_VAPID_KEY;

export const END_POINT = {
  LOCATION: 'local/search/keyword.json',
  ADDRESS: 'local/search/address.json',
  GOOGLE_LOGIN: 'members/signin/social/google',
  NAVER_LOGIN: 'members/signin/social/naver',
  KAKAO_LOGIN: 'members/signin/social/kakao',

  //Location
  MY_LOCATIONS:'members/me/locations',
  SEARCH_LOCATION: 'search/locations',
  DEFAULT_LOCATION:'members/me/default-location',

  //Member
  FCM_TOKEN: 'notifications/fcm-register',
  LOGOUT: 'members/logout',
  SIGN_UP: 'members/signup',
  MY_PASSWORD: 'members/me/password',
  MY_PROFILE: 'members/me/profile',
  SIGN_UP_INFO: 'members/signup/info',
  BORROW: 'members/me/rental',
  LENT: 'members/me/owner',
  ACCOUNT: 'members/me/accounts',
  RECENTLY_UPLOADED: 'products/recently-uploaded',
  RECENTLY_VIEWED: 'products/recently-viewed',
  WISH_LIST: 'wish-list',
  SUGGESTIONS: 'search/suggestions',
  PRODUCT: 'products',

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
