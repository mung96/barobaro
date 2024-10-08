import { create } from 'zustand';
import { CurrentStoreState } from '@/types/store/store';

const useCurrentStore = create<CurrentStoreState>((set) => ({
  borrowProducts: [],
  lentProducts: [],
  likeProducts: [],
  actions: {
    setBorrowList: (borrowList) => set({ borrowProducts: borrowList }),
    setLentList: (lentList) => set({ lentProducts: lentList }),
    setLikeList: (likeList) => set({ likeProducts: likeList }),
    addBorrowProduct: (product) =>
      set((state) => ({
        borrowProducts: [...state.borrowProducts, product],
      })),
    addLentProduct: (product) =>
      set((state) => ({
        lentProducts: [...state.lentProducts, product],
      })),
    addLikeProduct: (product) => set((state) => ({
      likeProducts: [...state.likeProducts, product],
    }))
  },
}));

export const useCurrentActions = () =>
  useCurrentStore((store) => store.actions);
export const useBorrowProducts = () =>
  useCurrentStore((store) => store.borrowProducts);
export const useLentProducts = () =>
  useCurrentStore((store) => store.lentProducts);
export const useLikeProducts = () =>
    useCurrentStore((store) => store.likeProducts);
