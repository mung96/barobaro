type Props = {
  currentStep: number;
  totalStep: number;
};

function StepBar({ totalStep, currentStep }: Props) {
  return (
    <div className="flex gap-3">
      {Array.from({ length: totalStep }).map((item, stepNumber) => (
        <div
          className={`flex justify-center items-center w-6 h-6 rounded-full text-xs font-bold
            ${stepNumber < currentStep ? 'bg-blue-100 text-white' : 'bg-gray-200 text-gray-100'}
            ${stepNumber == 0 ? 'pr-[1px]' : ''}`}
          key={item as number}
        >
          <p>{stepNumber + 1}</p>
        </div>
      ))}
    </div>
  );
}

export default StepBar;
