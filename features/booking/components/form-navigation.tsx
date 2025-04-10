import { Button } from "@/components/ui/button";

interface FormNavigationProps {
  step: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function FormNavigation({
  step,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  isSubmitting,
}: FormNavigationProps) {
  return (
    <div className="flex justify-between">
      {step > 1 && (
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
      )}
      {step < totalSteps ? (
        <Button onClick={onNext} className={step === 1 ? "ml-auto" : ""}>
          Next
        </Button>
      ) : (
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Complete Booking"}
        </Button>
      )}
    </div>
  );
}
