import { create } from 'zustand';
import {ProfileStoreState} from "@/types/store/store";
import {UserProfile} from "@/types/user/userData";

const initialProfile: UserProfile = {
    profileImage: '',
    nickname: '',
    phoneNumber: '',
    email: '',
    name: ''
};

const useMyProfileStore = create<ProfileStoreState>((set) => ({
    profileObject : initialProfile,
    isInit : true,
    actions: {
        setProfileObject: (profileObject) => set({profileObject: profileObject}),
    }
}));

export const useProfileSet = () => useMyProfileStore((store) => store.actions.setProfileObject)
export const useProfileObject = () => useMyProfileStore((state) => state.profileObject);
export const useProfileInit = () => useMyProfileStore((state) => state.isInit);