export function convertRegistStepToStepNumber(registStep: string) {
  if (registStep === 'FirstStep') return 1;
  if (registStep === 'SecondStep') return 2;
  if (registStep === 'LastStep') return 3;
  return 0;
}
