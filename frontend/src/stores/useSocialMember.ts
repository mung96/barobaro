import { create } from 'zustand';
import { SocialName } from '@/types/social/social';

type MemberState = {
  socialMember:
    | {
        providerType: SocialName;
        email: string;
        nickName: string;
        profileImage: string;
      }
    | undefined;
  actions: {
    setSocialMember: (socialMember: MemberState['socialMember']) => void;
  };
};

const useSocialMemberStore = create<MemberState>((set) => ({
  socialMember: undefined,
  actions: {
    setSocialMember: (socialMember: MemberState['socialMember']) =>
      set({ socialMember }),
  },
}));

export default useSocialMemberStore;
