import { create } from 'zustand';

type LocationStoreType = {
    locations: string[];
    actions: {
        setLocations: (locationList: string[]) => void;
    }
}

const useLocationStore = create<LocationStoreType>((set) => ({
    locations : [],
    actions: {
        setLocations: (locationList) => set({locations: locationList}),
    }
}))

export const useSetLocations = () => useLocationStore((store) => store.actions.setLocations);
export const useLocations = () => useLocationStore((store) => store.locations);