import { Response } from '@/types/apis/shared';
import { SocialMember } from '@/types/domains/member';

export type MyProfileResponse = {
  profileImage: string;
  nickname: string;
  phoneNumber: string;
  email: string;
  name: string;
};

export type SocialMemberResponse = Response<SocialMember>;
