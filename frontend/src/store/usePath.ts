import { create } from 'zustand';

type State = {
    path:string;
};

type Action={
    setPath:(path:string)=>void;
}

const usePath = create<State&Action>((set) => ({
    path:'/',
    setPath:(path)=>set({path}),
    
}));

export const usePathStore = () => usePath((state) => state.path);
export const useSetPathStore = () => usePath((state) => state.setPath);