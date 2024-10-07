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

export const useSetInitialized = () =>
  useInitialStore((store) => store.actions.setInitialized);
export const useInitialized = () =>
  useInitialStore((store) => store.isInitialized);
