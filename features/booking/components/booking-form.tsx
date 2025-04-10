"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookingProgress } from "./booking-progress";
import { SenderForm } from "./sender-form";
import { RecipientForm } from "./recipient-form";
import { PackageForm } from "./package-form";
import { ShippingForm } from "./shipping-form";
import { FormNavigation } from "./form-navigation";
import { BookingSuccess } from "./booking-success";
import { BookingFormData } from "../types";
import { getInitialFormData, transformFormData, validateStep } from "../utils";
import { mapToBookingRequest } from "../utils/mappers";

export function BookingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<BookingFormData>(
    getInitialFormData()
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    const validation = validateStep(step, formData);
    if (!validation.isValid) {
      toast({
        title: "Missing information",
        description: validation.message,
        variant: "destructive",
      });
      return;
    }

    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    const validation = validateStep(step, formData);
    if (!validation.isValid) {
      toast({
        title: "Missing information",
        description: validation.message,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = transformFormData(formData);
      const apiRequest = mapToBookingRequest(bookingData);
      const data = await api.bookShipment(apiRequest);
      setTrackingNumber(data.tracking_number);

      toast({
        title: "Booking successful!",
        description: `Your shipment has been booked with tracking number: ${data.tracking_number}`,
      });

      setBookingComplete(true);
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking failed",
        description:
          "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bookingComplete) {
    return (
      <BookingSuccess trackingNumber={trackingNumber} formData={formData} />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Details</CardTitle>
        <CardDescription>
          Fill in the information below to book your shipment
        </CardDescription>
        <BookingProgress currentStep={step} totalSteps={4} />
      </CardHeader>

      <CardContent>
        {step === 1 && (
          <SenderForm
            formData={formData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
          />
        )}

        {step === 2 && (
          <RecipientForm
            formData={formData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
          />
        )}

        {step === 3 && (
          <PackageForm
            formData={formData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
          />
        )}

        {step === 4 && (
          <ShippingForm
            formData={formData}
            handleChange={handleChange}
            handleSelectChange={handleSelectChange}
          />
        )}
      </CardContent>

      <CardFooter>
        <FormNavigation
          step={step}
          totalSteps={4}
          onPrevious={prevStep}
          onNext={nextStep}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </CardFooter>
    </Card>
  );
}
