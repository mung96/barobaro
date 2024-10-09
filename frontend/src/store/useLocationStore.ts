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
    setLocations: (locations: Location[]) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
    locations: [],
    setLocations: (locations) => set({ locations }),
}));

export const useLocations = () => useLocationStore((state) => state.locations);
export const useSetLocations = () => useLocationStore((state) => state.setLocations);