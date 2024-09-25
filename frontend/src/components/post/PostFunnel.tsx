'use client';

import { useFunnel } from '@use-funnel/browser';
import FirstStepInput from '@/components/post/FirstStepInput';
import SecondStepInput from '@/components/post/SecondStepInput';
import LastStepInput from '@/components/post/LastStepInput';
import { FirstStep, SecondStep, LastStep } from '@/components/post/context';
import PageTransition, {
  DirectionType,
} from '@/components/post/PageTransition';
import { useState } from 'react';
import StepBar from '@/components/post/StepBar';
import convertRegistStepToStepNumber from '@/services/post/regist';

function PostFunnel() {
  const [direction, setDirection] = useState<DirectionType>('forward');
  const {
    step: registStep,
    history,
    context,
  } = useFunnel<{
    FirstStep: FirstStep;
    SecondStep: SecondStep;
    LastStep: LastStep;
  }>({
    id: 'post-regist',
    initial: {
      step: 'FirstStep',
      context: {},
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-bold text-center">대여 물품 등록</h2>
      <StepBar
        totalStep={3}
        currentStep={convertRegistStepToStepNumber(registStep)}
      />
      <PageTransition step={registStep} direction={direction}>
        {registStep === 'FirstStep' && (
          <FirstStepInput
            onNext={(firstData: string) => {
              history.push('SecondStep', { firstData });
              setDirection('forward');
            }}
          />
        )}
        {registStep === 'SecondStep' && (
          <SecondStepInput
            firstData={context.firstData}
            onPrev={() => {
              history.back();
              setDirection('backward');
            }}
            onNext={(secondData: string) => {
              history.push('LastStep', { secondData });
              setDirection('forward');
            }}
          />
        )}
        {registStep === 'LastStep' && (
          <LastStepInput
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

export default PostFunnel;
