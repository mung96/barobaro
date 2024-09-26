'use client';

import { useFunnel } from '@use-funnel/browser';
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
import { useState } from 'react';
import StepBar from '@/components/shared/StepBar';
import convertRegistStepToStepNumber from '@/services/post/regist';
import ContractInfoInput from '@/components/post/ContractInfoInput';
import ContractPreview from '@/components/post/ContractPreview';
import { ContractConditionRequest } from '@/types/apis/productRequest';

function PostFunnel() {
  const [direction, setDirection] = useState<DirectionType>('forward');
  const { step: registStep, history } = useFunnel<{
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
      <h2 className="text-base font-bold text-center">대여 물품 등록</h2>
      <StepBar
        totalStep={4}
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
            onPrev={() => {
              history.back();
              setDirection('backward');
            }}
            onNext={(data: RentalInfo) => {
              history.push('ContractInfoStep', {
                startDate: data.startDate || '',
                endDate: data.endDate || '',
                rentalFee: data.rentalFee || 0,
                place: data.place || '',
                latitude: data.latitude || 0,
                longitude: data.longitude || 0,
                returnTypeList: data.returnTypeList || [],
                returnAddress: data.returnAddress || '',
              });
              setDirection('forward');
            }}
          />
        )}
        {registStep === 'ContractInfoStep' && (
          <ContractInfoInput
            onPrev={() => {
              history.back();
              setDirection('backward');
            }}
            onNext={(data: ContractConditionRequest) => {
              history.push('ContractPreviewStep', {
                productName: data.productName,
                serialNumber: data.serialNumber,
                repairVendor: data.repairVendor,
                overdueCriteria: data.overdueCriteria,
                overdueFee: data.overdueFee,
                theftCriteria: data.theftCriteria,
                refundDeadline: data.refundDeadline,
              });
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
