import { Props, SocialBarInfo } from '@/types/social/social';
import Google from '@/../public/assets/png/login/Google.png';
import Naver from '@/../public/assets/png/login/Naver.png';
import Kakao from '@/../public/assets/png/login/Kakao.png';

const color = {
  Naver: '#03C75A',
  Kakao: '#FEE500',
  Google: '#F3F3F3',
};

const korean = {
  Naver: '네이버',
  Kakao: '카카오',
  Google: '구글',
};

const fontColor = {
  Naver: 'white',
  Kakao: 'black-100',
  Google: 'black-100',
};

const img = {
  Naver: Naver,
  Kakao: Kakao,
  Google: Google,
};

export const socialSelect = ({ socialName }: Props): SocialBarInfo => {
  return {
    backgroundColor: color[socialName],
    imageUrl: img[socialName],
    fontColor: fontColor[socialName],
    korean: korean[socialName],
  };
};
