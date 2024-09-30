import { PostProcess } from '@/types/domains/product';

export default function convertRegistStepToStepNumber(registStep: PostProcess) {
  if (registStep === 'PostInfoStep') return 1;
  if (registStep === 'RentalInfoStep') return 2;
  if (registStep === 'ContractInfoStep') return 3;
  if (registStep === 'ContractPreviewStep') return 4;
  return 0;
}

export const totalStepByContractYN = (contractYN: string) => {
  return !contractYN || contractYN === 'YES' ? 4 : 3;
};
