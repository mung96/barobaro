import { SetStateAction } from 'react';

// 빌린 것, 빌려준 것
export type itemList = {
  productId: number;
  productMainImage: string;
  title: string;
  startDate: string;
  endDate: string;
  rentalFee: number;
  productStatus: string;
}[];

// 최근 본 것들 목록 (위의 타입과 다른 점 : productStatus냐 isWished냐)
export type currentList = {
  productId: number;
  productMainImage: string;
  title: string;
  startDate: string;
  endDate: string;
  rentalFee: number;
  isWished: boolean;
}[];

export type searchHookType = {
  search: string;
  goSearch: () => void;
  handleSearch: (value: string) => void;
};
