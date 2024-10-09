import { create } from 'zustand';

type State = {
  prevPath: string;
  path: string;
};

type Action = {
  setPath: (path: string) => void;
  setPrevPath: (path: string) => void;
};
console.log('usePath.ts');

const usePath = create<State & Action>((set) => ({
  prevPath: '/',
  path: '/',
  setPath: (path) => set({ path }),
  setPrevPath: (prevPath) => set({ prevPath: prevPath }),
}));

export const usePathStore = () => usePath((state) => state.path);
export const useSetPathStore = () => usePath((state) => state.setPath);

export const usePrevPathStore = () => usePath((state) => state.prevPath);
export const useSetPrevPathStore = () => usePath((state) => state.setPrevPath);
