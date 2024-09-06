'use client';

import { useFunnel } from '@use-funnel/browser';
import FirstStepInput from '@/components/post/FirstStepInput';
import SecondStepInput from '@/components/post/SecondStepInput';
import LastStepInput from '@/components/post/LastStepInput';
import {
  FirstStep,
  SecondStep,
  LastStep,
} from '@/app/(afterlogin)/post/regist/context';
import { useEffect } from 'react';

function PostRegistFunnelPage() {
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
      {registStep === 'FirstStep' && (
        <FirstStepInput
          onNext={(firstData: string) => {
            history.push('SecondStep', { firstData });
          }}
        />
      )}
      {registStep === 'SecondStep' && (
        <SecondStepInput
          firstData={context.firstData}
          onNext={(secondData: string) => {
            history.push('LastStep', { secondData });
          }}
        />
      )}
      {registStep === 'LastStep' && <LastStepInput />}
    </section>
  );
}

export default PostRegistFunnelPage;
