import { StaticImageData } from 'next/image';

export type SocialName = 'Naver' | 'Kakao' | 'Google';
export type Props = {
  socialName: SocialName;
};
export type SocialBarInfo = {
  backgroundColor: string;
  imageUrl: StaticImageData;
  fontColor: string;
  korean: string;
  link: string;
};
