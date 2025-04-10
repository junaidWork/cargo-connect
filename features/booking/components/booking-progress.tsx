interface BookingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function BookingProgress({
  currentStep,
  totalSteps,
}: BookingProgressProps) {
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center ${
                currentStep >= index + 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-1 w-12 mx-1 ${
                  currentStep > index + 1 ? "bg-primary" : "bg-muted"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>
      <div className="text-sm text-muted-foreground">
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
}
