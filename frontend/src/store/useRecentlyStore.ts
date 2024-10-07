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
