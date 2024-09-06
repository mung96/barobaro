import { useFunnel } from '@use-funnel/browser';
import FirstStepInput from '@/components/post/FirstStepInput';
import SecondStepInput from '@/components/post/SecondStepInput';
import LastStepInput from '@/components/post/LastStepInput';
import {
  FirstStep,
  SecondStep,
  LastStep,
} from '@/app/(afterlogin)/post/regist/context';

function PostRegistFunnelPage() {
  const {
    step: rigsterStep,
    history,
    context,
  } = useFunnel<{
    FirstStep: FirstStep;
    SecondStep: SecondStep;
    LastStep: LastStep;
  }>({
    id: 'post-regist-funnel',
    initial: {
      step: 'FirstStep',
      context: {},
    },
  });
  return (
    <section>
      {rigsterStep === 'FirstStep' && <FirstStepInput />}
      {rigsterStep === 'SecondStep' && <SecondStepInput />}
      {rigsterStep === 'FirstStep' && <LastStepInput />}
    </section>
  );
}

export default PostRegistFunnelPage;
