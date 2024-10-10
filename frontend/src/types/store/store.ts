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
  likeProducts: Product[];
  searchProducts: Product[];
  actions: {
    setBorrowList: (borrowList: Product[]) => void;
    setLentList: (lentList: Product[]) => void;
    setLikeList: (likeList: Product[]) => void;
    setSearchList: (searchList: Product[]) => void;
    addBorrowProduct: (product: Product) => void;
    addLentProduct: (product: Product) => void;
    addLikeProduct: (product: Product) => void;
  };
};

export type RecentlyStoreState = {
  recentlyViewedProducts: Product[];
  recentlyUploadedProducts: Product[];
  actions: {
    setRecentlyViewedProducts: (recentlyViewedProducts: Product[]) => void;
    setRecentlyUploadedProducts: (recentlyUploadedProducts: Product[]) => void;
  };
};

type Profile = {
  id: string;
  profileImage: string;
  nickname: string;
  phoneNumber: string;
  email: string;
  name: string;
  isAuthenticated: boolean;
};

export type ProfileStoreState = {
  profileObject: Profile;
  isInit: boolean;
  setProfileObject: (profileObject: Profile) => void;
};
