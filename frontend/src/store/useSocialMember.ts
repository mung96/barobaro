import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { SocialMember } from '@/types/domains/member';

type SocialMemberState = {
  socialMember: SocialMember | undefined;

  setSocialMember: (socialMember: SocialMemberState['socialMember']) => void;
};

const useSocialMemberStore = create(
  persist<SocialMemberState>(
    (set) => ({
      socialMember: undefined,
      setSocialMember: (socialMember: SocialMemberState['socialMember']) =>
        set({ socialMember }),
    }),
    { name: 'socialMember', storage: createJSONStorage(() => localStorage) },
  ),
);

export const useSocialMemberState = () =>
  useSocialMemberStore((state) => state.socialMember);
export const useSocialMemberAction = () =>
  useSocialMemberStore((state) => state.setSocialMember);
