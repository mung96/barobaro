'use client';

import { useFunnel } from '@use-funnel/browser';
import { useEffect, useState } from 'react';
import PostInfoInput from '@/components/post/PostInfoInput';
import RentalInfoInput from '@/components/post/RentalInfoInput';
import {
  PostInfoStep,
  RentalInfoStep,
  ContractInfoStep,
  ContractPreviewStep,
  PostInfo,
  RentalInfo,
} from '@/types/domains/product';

import PageTransition, {
  DirectionType,
} from '@/components/shared/PageTransition';
import StepBar from '@/components/shared/StepBar';
import convertRegistStepToStepNumber from '@/services/post/regist';
import ContractInfoInput from '@/components/post/ContractInfoInput';
import ContractPreview from '@/components/post/ContractPreview';
import { ContractConditionRequest } from '@/types/apis/productRequest';

function PostFunnel() {
  const [direction, setDirection] = useState<DirectionType>('forward');
  const [totalStep, setTotalStep] = useState(4);
  const { step: registStep, history,context } = useFunnel<{
    PostInfoStep: PostInfoStep;
    RentalInfoStep: RentalInfoStep;
    ContractInfoStep: ContractInfoStep;
    ContractPreviewStep: ContractPreviewStep;
  }>({
    id: 'post-regist',
    initial: {
      step: 'PostInfoStep',
      context: {},
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-center">대여 물품 등록</h2>
      <StepBar
        totalStep={totalStep}
        currentStep={convertRegistStepToStepNumber(registStep)}
      />
      <PageTransition step={registStep} direction={direction}>
        {registStep === 'PostInfoStep' && (
          <PostInfoInput
            onNext={(data: PostInfo) => {
              history.push('RentalInfoStep', data);
              setDirection('forward');
            }}
          />
        )}
        {registStep === 'RentalInfoStep' && (
          <RentalInfoInput
          context={context}
            onPrev={() => {
              history.back();
              setDirection('backward');
            }}
            onNext={(data: RentalInfo) => {
              history.push('ContractInfoStep', data);
              setDirection('forward');
            }}
          />
        )}
        {registStep === 'ContractInfoStep' && (
          <ContractInfoInput
            onTotalStepChange={setTotalStep}
            onPrev={() => {
              history.back();
              setDirection('backward');
            }}
            onNext={(data: ContractConditionRequest) => {
              history.push('ContractPreviewStep', data);
              setDirection('forward');
            }}
          />
        )}
        {registStep === 'ContractPreviewStep' && (
          <ContractPreview
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
