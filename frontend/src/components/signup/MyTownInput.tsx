import { useController, useForm } from 'react-hook-form';
import Button from '@/components/shared/Button';
import { MyTown } from '@/types/domains/signup';
import MyTownSearch from '@/components/signup/MyTownSearch';
import { Dong } from '@/types/apis/location';
import { useEffect } from 'react';
import { postSignUp } from '@/apis/memberApi';
import { useSocialMemberAction, useSocialMemberState } from '@/store/useSocialMember';
import { SocialMember } from '@/types/domains/member';
import { SignUpMemberRequest } from '@/types/apis/memberRequest';

type Props = {
  onPrev: () => void;
};

function MyTownInfo({ onPrev }: Props) {
  const {
    getValues,
    control,handleSubmit
  } = useForm<MyTown>({ mode: 'onChange' ,});

  const { field: town } = useController<MyTown>({
    control,
    name: 'town',
    rules: {
      required: '지역을 정해주세요.',
      maxLength: { value: 3, message: '지역은 3개까지 설정 가능해요.' },
    },
  });
  const socialMember = useSocialMemberState();
  const convertSignUpDateToRequest = (member:SocialMember,data:MyTown):SignUpMemberRequest=>{
    const request ={
      email: member.email,
      providerType: member.providerType,
      nickname: member.nickName,
      locations: data.town?.map(location=>({
        locationId: location.locationId,
        isMain: location.isMain
      }))
    }
    return request;
  }

  return (
    <div className="flex flex-col gap-16 w-full" >
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-black-100 text-[15px] font-bold">
          거래를 진행하고 싶은 동네를 선택해주세요
        </h2>

        <div>
          <p className="text-base font-semibold">
            <span className="text-blue-100">거래</span>
            <span>를 진행할 동네를 설정해주세요.</span>
          </p>
          <p className="text-base font-semibold">
            <span>최대 </span>
            <span className="text-blue-100">3개</span>
            <span>의 동네에서 거래를 할 수 있어요. </span>
          </p>
        </div>
      </div>
      <MyTownSearch values={town.value as Dong[]} onChange={town.onChange}/>

      <div className="flex  gap-6">
        <Button onClick={onPrev} width="100%" height="36px" color="gray">
          <p className="text-xs">이전</p>
        </Button>

        <Button onClick={()=>postSignUp(convertSignUpDateToRequest(socialMember!,getValues()),socialMember?.profileImage! as File)} width="100%" height="36px">
          <p className="text-xs">회원가입 하기</p>
        </Button>
      </div>
    </div>
  );
}

export default MyTownInfo;
