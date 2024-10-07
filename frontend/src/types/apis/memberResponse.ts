import { Response } from '@/types/apis/shared';
import { SocialMember } from '@/types/domains/member';

export type MyProfile = {
  profileImage: string;
  nickname: string;
  phoneNumber: string;
  email: string;
  name: string;
};

export type SocialMemberResponse = Response<SocialMember>;
export type MyProfileResponse = Response<MyProfile>;

