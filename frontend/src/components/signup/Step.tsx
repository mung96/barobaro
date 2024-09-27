'use client';

// 1, 2에 따라 다른 내용구성
import StepBar from '@/components/post/StepBar';
import StepContent from '@/components/signup/StepContent';
import SignUpContent from '@/components/signup/SignUpContent';
import { useParams } from 'next/navigation';

export default function Step() {
  const params = useParams();
  const process = Number(params.process);
  return (
    <>
      <div className="ms-[30px] mb-3">
        <div className="mb-3">
          <StepBar currentStep={process} totalStep={2} />
        </div>
        <StepContent process={process} />
      </div>
      <SignUpContent process={process} />
    </>
  );
}
