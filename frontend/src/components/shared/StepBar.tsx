type StepBarProps = {
  currentStep: number;
  totalStep: number;
};

function StepBar({ totalStep, currentStep }: StepBarProps) {
  return (
    <div className="flex gap-3">
      {Array.from({ length: totalStep }).map((_, stepNumber) => (
        <div
          className={`flex justify-center items-center w-5 h-5 rounded-full text-3xs font-bold
            ${stepNumber < currentStep ? 'bg-blue-100 text-white' : 'bg-gray-200 text-gray-100'}`}
          key={stepNumber}
        >
          <p>{stepNumber + 1}</p>
        </div>
      ))}
    </div>
  );
}

export default StepBar;
