type Product = {
  productId: number;
  productMainImage: string;
  title: string;
  startDate: string;
  endDate: string;
  rentalFee: number;
  productStatus: string;
};

export type CurrentStoreState = {
  borrowProducts: Product[];
  lentProducts: Product[];
  actions: {
    setBorrowList: (borrowList: Product[]) => void;
    setLentList: (lentList: Product[]) => void;
    addBorrowProduct: (product: Product) => void;
    addLentProduct: (product: Product) => void;
  };
};

export type RecentlyStoreState = {
  recentlyViewedProducts: Product[];
  recentlyUploadedProducts: Product[];
  actions: {
    setRecentlyViewedProducts: (recentlyViewedProducts: Product[]) => void;
    setRecentlyUploadedProducts: (recentlyUploadedProducts: Product[]) => void;
  }
}