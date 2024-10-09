'use client';

import { useFunnel } from '@use-funnel/browser';
import { useState } from 'react';
import PostInfoInput from '@/components/post/PostInfoInput';
import RentalInfoInput from '@/components/post/RentalInfoInput';
import {
  PostInfoStep,
  RentalInfoStep,
  ContractInfoStep,
  ContractPreviewStep,
} from '@/types/domains/product';

import PageTransition, {
  DirectionType,
} from '@/components/shared/PageTransition';
import StepBar from '@/components/shared/StepBar';
import convertRegistStepToStepNumber from '@/services/post/regist';
import ContractInfoInput from '@/components/post/ContractInfoInput';
import ContractPreview from '@/components/post/ContractPreview';
import { ContractConditionRequest } from '@/types/apis/productRequest';
import usePostFormModel from '@/hooks/post/usePostFormModel';

function PostFunnel() {
  const [direction, setDirection] = useState<DirectionType>('forward');
  const [totalStep, setTotalStep] = useState(4);
  const { step: registStep, history, context } = useFunnel<{
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

  const { postFieldList, rentalFieldList, contractFieldList, errors, isFormValid, getValues, handleSubmit, isFieldValid } = usePostFormModel();

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
            context={context}
            errors={errors}
            fields={postFieldList}
            isValid={isFieldValid.postFieldList}
            onNext={() => {
              history.push('RentalInfoStep', getValues());
              setDirection('forward');
            }}
          />
        )}
        {registStep === 'RentalInfoStep' && (
          <RentalInfoInput
            getValues={getValues}
            handleSubmit={handleSubmit}
            fields={rentalFieldList}
            errors={errors}
            context={context}
            isValid={isFormValid}
            onPrev={() => {
              history.back();
              setDirection('backward');
            }}
            onNext={() => {
              history.push('ContractInfoStep', getValues());
              setDirection('forward');
            }}
          />
        )}
        {registStep === 'ContractInfoStep' && (
          <ContractInfoInput
            fields={contractFieldList}
            errors={errors}
            context={context}
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
            context={context}
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
