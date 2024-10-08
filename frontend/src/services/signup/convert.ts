import { SignUpMemberRequest } from '@/types/apis/memberRequest';
import { SocialMember } from '@/types/domains/member';
import { MyTown, SignUpProcess } from '@/types/domains/signup';

export function convertSignUpStepToStepNumber(step: SignUpProcess) {
  if (step === 'MyInfoStep') return 1;
  if (step === 'MyTownStep') return 2;
  return 0;
}


export const convertSignUpDateToRequest = (member:SocialMember,data:MyTown):SignUpMemberRequest=>{
  const request ={
    email: member.email,
    providerType: member.providerType,
    nickname: member.nickName,
    locations: data.town?.map(location=>(location.locationId))
  }
  return request;
}