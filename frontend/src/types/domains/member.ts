import { SocialName } from '@/types/social/social';

export type SocialMember = {
  providerType: SocialName;
  email: string;
  nickName: string;
  profileImage: string;
};
