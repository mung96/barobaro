import { PostProcess } from '@/types/domains/product';

export default function convertRegistStepToStepNumber(step: PostProcess) {
  if (step === 'PostInfoStep') return 1;
  if (step === 'RentalInfoStep') return 2;
  if (step === 'ContractInfoStep') return 3;
  if (step === 'ContractPreviewStep') return 4;
  return 0;
}

export const totalStepByContractYN = (contractYN: string) => {
  return !contractYN || contractYN === 'YES' ? 4 : 3;
};
