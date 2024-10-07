import { create } from 'zustand';
import { CurrentStoreState } from '@/types/store/store';

const useCurrentStore = create<CurrentStoreState>((set) => ({
  borrowProducts: [],
  lentProducts: [],
  isInitialized: false,
  actions: {
    setBorrowList: (borrowList) => set({ borrowProducts: borrowList }),
    setLentList: (lentList) => set({ lentProducts: lentList }),
    addBorrowProduct: (product) =>
      set((state) => ({
        borrowProducts: [...state.borrowProducts, product],
      })),
    addLentProduct: (product) =>
      set((state) => ({
        lentProducts: [...state.lentProducts, product],
      })),
  },
}));

export const useCurrentActions = () =>
  useCurrentStore((store) => store.actions);
export const useBorrowProducts = () =>
  useCurrentStore((store) => store.borrowProducts);
export const useLentProducts = () =>
  useCurrentStore((store) => store.lentProducts);
