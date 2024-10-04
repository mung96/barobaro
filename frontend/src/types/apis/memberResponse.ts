import { SocialName } from '@/types/social/social';

export type MyProfileResponse = {
  profileImage: string;
  nickname: string;
  phoneNumber: string;
  email: string;
  name: string;
};

export type SocialMemberResponse = {
  providerType: SocialName;
  email: string;
  nickName: string;
  profileImage: string;
};
