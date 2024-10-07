import { SocialName } from '@/types/social/social';

export type SignUpMemberRequest = {
  email: string;
  providerType: SocialName;
  nickname: string;
  locations: number[];
};

type MemberLocationReq = {
  locationId: number;
};


export type SignUpMember ={
    email: string;
    providerType: SocialName;
    profileImage: string;
    nickname: string;
    locations: {locationId:number,isMain:boolean}[];
}