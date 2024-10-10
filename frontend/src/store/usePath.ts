import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type State = {
  prevPath: string;
  path: string;
};

type Action = {
  setPath: (path: string) => void;
  setPrevPath: (path: string) => void;
};

const usePath = create(
  persist<State & Action>(
    (set) => ({
      prevPath: '/',
      path: '/',
      setPath: (path) => set({ path }),
      setPrevPath: (prevPath) => set({ prevPath: prevPath }),
    }),
    { name: 'socialMember', storage: createJSONStorage(() => localStorage) },
  ),
);

export const usePathStore = () => usePath((state) => state.path);
export const useSetPathStore = () => usePath((state) => state.setPath);

export const usePrevPathStore = () => usePath((state) => state.prevPath);
export const useSetPrevPathStore = () => usePath((state) => state.setPrevPath);
