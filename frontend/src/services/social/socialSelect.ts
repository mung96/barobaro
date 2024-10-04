import { Props, SocialBarInfo } from '@/types/social/social';
import Google from '@/../public/assets/png/login/Google.png';
import Naver from '@/../public/assets/png/login/Naver.png';
import Kakao from '@/../public/assets/png/login/Kakao.png';
import { END_POINT, SERVER_BASE_URL } from '@/constants/api';

const color = {
  Naver: '#03C75A',
  Kakao: '#FEE500',
  Google: '#F3F3F3',
} as const;

const korean = {
  Naver: '네이버',
  Kakao: '카카오',
  Google: '구글',
} as const;

const fontColor = {
  Naver: 'white',
  Kakao: 'black-100',
  Google: 'black-100',
} as const;

const img = {
  Naver,
  Kakao,
  Google,
} as const;

const link = {
  Naver: SERVER_BASE_URL + END_POINT.GOOGLE_LOGIN,
  Kakao: SERVER_BASE_URL + END_POINT.GOOGLE_LOGIN,
  Google: SERVER_BASE_URL + END_POINT.GOOGLE_LOGIN,
};

// eslint-disable-next-line import/prefer-default-export
export const socialSelect = ({ socialName }: Props): SocialBarInfo => {
  return {
    backgroundColor: color[socialName],
    imageUrl: img[socialName],
    fontColor: fontColor[socialName],
    korean: korean[socialName],
    link: link[socialName],
  };
};
