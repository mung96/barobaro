import KB from '@/../public/assets/png/bank/KB_mark.png';
import Shinhan from '@/../public/assets/png/bank/Shinhan_mark.png';
import SSAFY from '@/../public/assets/png/bank/SSAFY_mark.png'
import KakaoBank from '@/../public/assets/png/bank/Kakao_mark.png'
import { StaticImageData } from 'next/image';

const bankColor: { [key: string]: string } = {
  국민은행: '#ffbc00',
  신한은행: '#0046ff',
  싸피은행: '#6DCEF5',
  카카오뱅크: '#ffbc00',
};

const bankImage: { [key: string]: StaticImageData } = {
  국민은행: KB,
  신한은행: Shinhan,
  싸피은행: SSAFY,
  카카오뱅크: KakaoBank,
};

export function convertAccountColor(bank: string) {
  return bankColor[bank];
}

export function convertAccountImage(bank: string) {
  return bankImage[bank];
}
