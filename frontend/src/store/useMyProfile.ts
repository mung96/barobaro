import { create } from 'zustand';
import { ProfileStoreState } from '@/types/store/store';
import { UserProfile } from '@/types/user/userData';
import { createJSONStorage, persist } from 'zustand/middleware';

const initialProfile: UserProfile = {
  profileImage: '',
  nickname: '',
  phoneNumber: '',
  email: '',
  name: '',
  isAuthenticated: false,
  id: '',
};

const useMyProfileStore = create(
  persist<ProfileStoreState>(
    (set) => ({
      profileObject: initialProfile,
      isInit: true,
      actions: {
        setProfileObject: (profileObject) => set({ profileObject: profileObject }),
      },
    }),
    { name: 'profile', storage: createJSONStorage(() => localStorage) },
  ),
);

export const useProfileSet = () => useMyProfileStore((store) => store.actions.setProfileObject);
export const useProfileObject = () => useMyProfileStore((state) => state.profileObject);
export const useProfileInit = () => useMyProfileStore((state) => state.isInit);

console.group('useMyProfileStore');
console.log(useProfileSet);
console.groupEnd();
