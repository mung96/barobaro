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

function PostRegistPage() {
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
    <section>
      <StepBar totalStep={3} currentStep={2} />
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
    </section>
  );
}

export default PostRegistPage;
