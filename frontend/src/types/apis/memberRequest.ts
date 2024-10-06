import { SocialName } from '@/types/social/social';

export type SignUpMemberRequest = {
  email: string;
  providerType: SocialName;
  profileImage: string;
  nickname: string;
  locations: MemberLocationReq[];
};

type MemberLocationReq = {
  locationId: number;
  isMain: boolean;
};
