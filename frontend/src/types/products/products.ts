import { SetStateAction } from 'react';

export type itemList = {
  productId: number;
  productMainImage: string;
  title: string;
  startDate: string;
  endDate: string;
  rentalFee: number;
  productStatus: string;
}[];

export type searchHookType = {
  search: string;
  goSearch: () => void;
  handleSearch: (value: string) => void;
};
