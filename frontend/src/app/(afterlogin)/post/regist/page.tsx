'use client';

import { useFunnel } from '@use-funnel/browser';
import FirstStepInput from '@/components/post/FirstStepInput';
import SecondStepInput from '@/components/post/SecondStepInput';
import LastStepInput from '@/components/post/LastStepInput';
import { FirstStep, SecondStep, LastStep } from '@/components/post/context';
import PageTransition from '@/components/post/PageTransition';

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
      <PageTransition step={registStep}>
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
      </PageTransition>
    </section>
  );
}

export default PostRegistFunnelPage;
