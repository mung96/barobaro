export type ItemListType = {
  productId: number;
  productMainImage: string;
  title: string;
  startDate: string;
  endDate: string;
  rentalFee: number;
  productStatus: string;
}[];

export type SearchHookType = {
  search: string;
  goSearch: () => void;
  handleSearch: (value: string) => void;
};
