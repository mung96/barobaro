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
} from '@/types/domains/product';

import PageTransition, {
  DirectionType,
} from '@/components/shared/PageTransition';
import StepBar from '@/components/shared/StepBar';
import convertRegistStepToStepNumber from '@/services/post/regist';
import ContractInfoInput from '@/components/post/ContractInfoInput';
import ContractPreview from '@/components/post/ContractPreview';
import usePostFormModel from '@/hooks/post/usePostFormModel';
import { useProfileObject } from '@/store/useMyProfile';
import IdentityVerificationModal from '@/components/post/IdentityVerificationModal';
import DisplayPassword from '@/components/user/DisplayPassword';

function PostFunnel() {
  const [isIdentityVerificationModalOpen, setIsIdentityVerificationModalOpen] = useState(true);
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

  const { postFieldList, rentalFieldList, contractFieldList, errors, isFormValid, getValues, postProductWithoutContract, postProductWithContract, isFieldValid, isSubmitting } = usePostFormModel(context);


  //TODO: 게시글 등록 눌렀을 때 본인인증 여부파악해서 모달 띄우기
  const profileState = useProfileObject();

  useEffect(() => {
    openModal(window.location.pathname);
  }, []);

  const openModal = (moveLink: string) => {
    if (moveLink === '/post/regist' && !profileState.isAuthenticated) {
      setIsIdentityVerificationModalOpen(true);
    }
  }


  return (
    <div className="flex flex-col gap-4">
      <DisplayPassword length={6} />
      {/* <IdentityVerificationModal isOpen={isIdentityVerificationModalOpen} /> */}
      <StepBar
        totalStep={totalStep}
        currentStep={convertRegistStepToStepNumber(registStep)}
      />
      <PageTransition step={registStep} direction={direction}>
        {registStep === 'PostInfoStep' && (
          <PostInfoInput
            getValues={getValues}
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
            fields={rentalFieldList}
            errors={errors}
            context={context}
            isValid={isFieldValid.rentalFieldList}
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
            onSubmit={postProductWithoutContract}
            onTotalStepChange={setTotalStep}
            isValid={isFieldValid.contractFieldList}
            isFormValid={isFormValid}
            isSubmitting={isSubmitting}
            onPrev={() => {
              history.back();
              setDirection('backward');
            }}
            onNext={() => {
              history.push('ContractPreviewStep', getValues());
              setDirection('forward');
            }}
          />
        )}
        {registStep === 'ContractPreviewStep' && (
          <ContractPreview
            context={context}
            isFormValid={isFormValid}
            onSubmit={postProductWithContract}
            isSubmitting={isSubmitting}
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
