import KB from '@/../public/assets/png/bank/KB_mark.png';
import Shinhan from '@/../public/assets/png/bank/Shinhan_mark.png';
import { StaticImageData } from 'next/image';

const bankColor: { [key: string]: string } = {
  국민은행: '#ffbc00',
  신한은행: '#0046ff',
};

const bankImage: { [key: string]: StaticImageData } = {
  국민은행: KB,
  신한은행: Shinhan,
};

export function convertAccountColor(bank: string) {
  return bankColor[bank];
}

export function convertAccountImage(bank: string) {
  return bankImage[bank];
}
