'use client'

import { useController, useForm } from 'react-hook-form';
import Button from '@/components/shared/Button';
import { MyInfoStep, MyTown, MyTownStep } from '@/types/domains/signup';
import MyTownSearch from '@/components/signup/MyTownSearch';
import { Dong } from '@/types/apis/location';
import { postSignUp } from '@/apis/memberApi';
import {  useSocialMemberState } from '@/store/useSocialMember';
import { useRouter } from 'next/navigation';
import { convertSignUpDateToRequest } from '@/services/signup/convert';
import { useProfileSet } from '@/store/useMyProfile';
import { getProfile } from '@/apis/profileApi';
import { AxiosError } from 'axios';

type Props = {
  onPrev: () => void;
  context: MyInfoStep | MyTownStep;
};

function MyTownInfo({ onPrev,context }: Props) {
  const router = useRouter();
  const socialMember = useSocialMemberState();
const setProfile = useProfileSet();
  const signUp = async () =>{
    const member = {
      providerType: socialMember?.providerType!,
      email: socialMember?.email!,
      nickName: context.nickname! ,
      profileImage: socialMember?.profileImage!,
    }
    try{
      const response =  await postSignUp(convertSignUpDateToRequest(member,getValues()),context.profile)
      router.push('/home');
      localStorage.setItem('token',response.data.body);
      
      try{
        const profileResponse = await getProfile();
        setProfile({
         ...profileResponse.data.body
        })
      }catch(error){
        if(error instanceof AxiosError){
          alert(error.response?.data.header.message)
        }
      }
      
    }catch(error){
      console.error('API 요청 중 오류 발생:', error);
    }
  }

  const {
    getValues,handleSubmit ,
    control,formState:{isSubmitting}
  } = useForm<MyTown>({ mode: 'onChange' ,});
  const { field: town } = useController<MyTown>({
    control,
    name: 'town',
    rules: {
      required: '지역을 정해주세요.',
      maxLength: { value: 3, message: '지역은 3개까지 설정 가능해요.' },
    },
  });


  return (
    <form className="flex flex-col gap-16 w-full" onSubmit={handleSubmit(signUp)}>
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

        <Button type='submit' disabled={isSubmitting}  width="100%" height="36px">
          <p className="text-xs">회원가입 하기</p>
        </Button>
      </div>
    </form>
  );
}

export default MyTownInfo;
