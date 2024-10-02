// 빌린 것, 빌려준 것
export type ItemListType = {
  productId: number;
  productMainImage: string;
  title: string;
  startDate: string;
  endDate: string;
  rentalFee: number;
  productStatus: string;
}[];

// 최근 본 것들 목록 (위의 타입과 다른 점 : productStatus냐 isWished냐)
export type CurrentList = {
  productId: number;
  productMainImage: string;
  title: string;
  startDate: string;
  endDate: string;
  rentalFee: number;
  isWished: boolean;
}[];

export type CurrentProduct = {
  productId: number;
  productMainImage: string;
  title: string;
  startDate: string;
  endDate: string;
  rentalFee: number;
  isWished: boolean;
};

export type SearchHookType = {
  search: string;
  goSearch: () => void;
  handleSearch: (value: string) => void;
};

export type CategoryCardType = {
  type: string;
  selected: boolean;
  searchData: string;
};

export type CardsType = 'recentlyView' | 'recentlyUploaded';
