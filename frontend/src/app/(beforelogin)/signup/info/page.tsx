import dynamic from 'next/dynamic';

const SignUpFunnel = dynamic(() => import('@/components/signup/SignUpFunnel'), {
  ssr: false,
});

function SignUpPage() {
  return <SignUpFunnel />;
}

export default SignUpPage;
