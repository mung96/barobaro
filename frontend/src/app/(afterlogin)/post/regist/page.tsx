import {
  FirstStep,
  SecondStep,
  LastStep,
} from '@/app/(afterlogin)/post/regist/context';
import { useFunnel } from '@use-funnel/browser';

function PostRegistFunnelPage() {
  const funnel = useFunnel<{
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
  return <>게시글 등록</>;
}

export default PostRegistFunnelPage;
