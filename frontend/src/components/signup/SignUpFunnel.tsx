'use client';

import { useFunnel } from '@use-funnel/browser';
import { useState } from 'react';

import PageTransition, {
  DirectionType,
} from '@/components/shared/PageTransition';
import StepBar from '@/components/shared/StepBar';
import { MyInfo, MyInfoStep, MyTownStep } from '@/types/domains/signup';
import convertSignUpStepToStepNumber from '@/services/signup/convert';
import MyInfoInput from '@/components/signup/MyInfoInput';
import MyTownInfo from '@/components/signup/MyTownInput';

function SignUpFunnel() {
  const [direction, setDirection] = useState<DirectionType>('forward');
  const totalStep = 2;
  const { step: signUpStep, history } = useFunnel<{
    MyInfoStep: MyInfoStep;
    MyTownStep: MyTownStep;
  }>({
    id: 'signup',
    initial: {
      step: 'MyInfoStep',
      context: {},
    },
  });

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
            onNext={() => {
              console.log('회원가입 완료');
            }}
          />
        )}
      </PageTransition>
    </div>
  );
}

export default SignUpFunnel;
