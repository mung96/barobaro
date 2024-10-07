'use client';

import { useFunnel } from '@use-funnel/browser';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import PageTransition, {
  DirectionType,
} from '@/components/shared/PageTransition';
import StepBar from '@/components/shared/StepBar';
import { MyInfo, MyInfoStep, MyTownStep } from '@/types/domains/signup';
import convertSignUpStepToStepNumber from '@/services/signup/convert';
import MyInfoInput from '@/components/signup/MyInfoInput';
import MyTownInfo from '@/components/signup/MyTownInput';
import { END_POINT, NEXT_BASE_URL } from '@/constants/api';
import {
  useSocialMemberAction,
  useSocialMemberState,
} from '@/store/useSocialMember';
import { SocialMemberResponse } from '@/types/apis/memberResponse';
import { axiosInstance } from '@/apis/axiosInstance';

function SignUpFunnel() {
  const [direction, setDirection] = useState<DirectionType>('forward');
  const searchParams = useSearchParams();
  const totalStep = 2;
  const { step: signUpStep, history,context } = useFunnel<{
    MyInfoStep: MyInfoStep;
    MyTownStep: MyTownStep;
  }>({
    id: 'signup',
    initial: {
      step: 'MyInfoStep',
      context: {},
    },
  });

  const socialMember = useSocialMemberState();
  const setSocialMember = useSocialMemberAction();

  // useEffect(() => {
  //   const getResponse = async () => {
  //     try {
  //       const response = await axios.get<SocialMemberResponse>(
  //         `${NEXT_BASE_URL}/signup/info`,
  //         {
  //           params: { key: searchParams.get('key') },
  //         },
  //       );
  //       if (response.data.body) {
  //         setSocialMember(response.data.body);
  //       }
  //     } catch (err) {
  //       console.error('API 요청 중 오류 발생:', err);
  //     }
  //   };
  //   getResponse();
  // }, []);

  useEffect(() => {
    const getResponse = async () => {
      try {
        const response = await axiosInstance.get(
          END_POINT.MY_PROFILE,
        );
       console.log(response);
      } catch (err) {
        console.error('API 요청 중 오류 발생:', err);
      }
    };
    getResponse();
  }, []);


  return (
    <div className="ms-[30px] mb-3">
      <h2 className="text-base font-bold text-center">회원가입</h2>
      <StepBar
        currentStep={convertSignUpStepToStepNumber(signUpStep)}
        totalStep={totalStep}
      />
      <PageTransition step={signUpStep} direction={direction}>
        {signUpStep === 'MyInfoStep' && (
          <MyInfoInput
            member={socialMember!}
            onNext={(data: MyInfo) => {
              history.push('MyTownStep', data);
              setDirection('forward');
            }}
          />
        )}
        {signUpStep === 'MyTownStep' && (
          <MyTownInfo
            onPrev={() => {
              history.back();
              setDirection('backward');
            }}
          />
        )}
      </PageTransition>
    </div>
  );
}

export default SignUpFunnel;
