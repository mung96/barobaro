import { create } from 'zustand';
import { RecentlyStoreState } from '@/types/store/store';



const useRecentlyStore = create<RecentlyStoreState>((set) => ({
    recentlyViewedProducts: [],
    recentlyUploadedProducts: [],
    actions: {
        setRecentlyViewedProducts: (recentlyViewedProducts) => set({recentlyViewedProducts: recentlyViewedProducts}),
        setRecentlyUploadedProducts: (recentlyUploadedProducts) => set({recentlyUploadedProducts: recentlyUploadedProducts})
    }
}));

export const useRecentlyActions = () => useRecentlyStore((store) => store.actions);
export const useRecentlyViewed = () => useRecentlyStore((store) => store.recentlyViewedProducts);
export const useRecentlyUploaded = () => useRecentlyStore((store) => store.recentlyUploadedProducts);
