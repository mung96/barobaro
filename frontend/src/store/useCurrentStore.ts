import { create } from 'zustand';
import { ItemListType } from '@/types/products/products';

type CurrentStoreState = {
  borrowProducts: ItemListType;
  lentProducts: ItemListType;
  setBorrowList: (borrowList: ItemListType) => void;
  setLentList: (lentList: ItemListType) => void;
};

const useCurrentStore = create<CurrentStoreState>((set) => ({
  borrowProducts: [],
  lentProducts: [],

  setBorrowList: (borrowList) => set({ borrowProducts: borrowList }),
  setLentList: (lentList) => set({ lentProducts: lentList }),
}));

export default useCurrentStore;
