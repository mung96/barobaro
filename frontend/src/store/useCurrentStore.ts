import { create } from 'zustand';
import { ItemListType } from '@/types/products/products';

type CurrentStoreState = {
  borrowProducts: ItemListType;
  lentProducts: ItemListType;
  isInitialized: boolean;
  setBorrowList: (borrowList: ItemListType) => void;
  setLentList: (lentList: ItemListType) => void;
  setInitialized: (value: boolean) => void;
};

const useCurrentStore = create<CurrentStoreState>((set) => ({
  borrowProducts: [],
  lentProducts: [],
  isInitialized: false,
  setBorrowList: (borrowList) => set({ borrowProducts: borrowList }),
  setLentList: (lentList) => set({ lentProducts: lentList }),
  setInitialized: (value: boolean) => set({ isInitialized: value }),
}));

export default useCurrentStore;
