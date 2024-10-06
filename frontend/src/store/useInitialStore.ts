import { create } from 'zustand';

type InitState = {
  isInitialized: boolean;
  actions: {
    setInitialized: () => void;
  };
};

const useInitialStore = create<InitState>((set) => ({
  isInitialized: false,
  actions: {
    setInitialized: () => set({ isInitialized: true }),
  },
}));

export default useInitialStore;
