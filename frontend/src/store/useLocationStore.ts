// useLocationStore.ts
import {create} from 'zustand';

interface Location {
    locationId: number;
    name: string;
    dong: string;
    isMain: boolean;
}

interface LocationState {
    locations: Location[];
    main: number;
    setLocations: (locations: Location[]) => void;
    setMain: (main: number) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
    locations: [],
    main: 0,
    setLocations: (locations) => set({ locations }),
    setMain: (main) => set({main})
}));

export const useLocations = () => useLocationStore((state) => state.locations);
export const useMain = () => useLocationStore((state) => state.main);
export const useSetLocations = () => useLocationStore((state) => state.setLocations);
export const useSetMain = () => useLocationStore((state) => state.setMain);
