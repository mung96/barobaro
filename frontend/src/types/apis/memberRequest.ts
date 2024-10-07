import { SocialName } from '@/types/social/social';

export type SignUpMemberRequest = {
  email: string;
  providerType: SocialName;
  nickname: string;
  locations: MemberLocationReq[];
};

type MemberLocationReq = {
  locationId: number;
  isMain: boolean;
};


export type SignUpMember ={
    email: string;
    providerType: SocialName;
    profileImage: string;
    nickname: string;
    locations: {locationId:number,isMain:boolean}[];
}