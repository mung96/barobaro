import { SignUpProcess } from '@/types/domains/signup';

export default function convertSignUpStepToStepNumber(step: SignUpProcess) {
  if (step === 'MyInfoStep') return 1;
  if (step === 'MyTownStep') return 2;
  return 0;
}
