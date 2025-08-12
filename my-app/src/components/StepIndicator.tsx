type Props = {
  currentStep: number;
  totalSteps: number;
};

export default function StepIndicator({ currentStep, totalSteps }: Props) {
  const percentage = ((currentStep) / totalSteps) * 100;

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between text-sm mb-2">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{Math.round(percentage)}% Complete</span>
      </div>
      <div className="w-full bg-[#1C1C3A] rounded-full h-2">
        <div 
          className="bg-[#FFC0CB] h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}