import { useState } from "react";
import { BookingFormData, ValidationResult } from "../types";
import {
  validateSenderInfo,
  validateRecipientInfo,
  validatePackageInfo,
  validateShippingInfo,
  transformFormData,
} from "../utils/validation";

const initialFormData: BookingFormData = {
  // Sender info
  senderName: "",
  senderEmail: "",
  senderPhone: "",
  senderAddress: "",
  senderCity: "",
  senderState: "",
  senderPostal: "",
  senderCountry: "",

  // Recipient info
  recipientName: "",
  recipientEmail: "",
  recipientPhone: "",
  recipientAddress: "",
  recipientCity: "",
  recipientState: "",
  recipientPostal: "",
  recipientCountry: "",

  // Package info
  packageType: "",
  packageWeight: "",
  packageLength: "",
  packageWidth: "",
  packageHeight: "",
  packageDescription: "",

  // Shipping info
  serviceType: "",
  insurance: "",
  pickupDate: "",
};

export const useBookingForm = () => {
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors("");
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors("");
  };

  const validateCurrentStep = (): ValidationResult => {
    switch (currentStep) {
      case 0:
        return validateSenderInfo(formData);
      case 1:
        return validateRecipientInfo(formData);
      case 2:
        return validatePackageInfo(formData);
      case 3:
        return validateShippingInfo(formData);
      default:
        return { isValid: true, message: "" };
    }
  };

  const nextStep = () => {
    const validation = validateCurrentStep();
    if (!validation.isValid) {
      setErrors(validation.message);
      return;
    }

    setCurrentStep((prev) => prev + 1);
    setErrors("");
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
    setErrors("");
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(0);
    setErrors("");
  };

  const submitForm = async () => {
    // Validate all steps
    const senderValidation = validateSenderInfo(formData);
    const recipientValidation = validateRecipientInfo(formData);
    const packageValidation = validatePackageInfo(formData);
    const shippingValidation = validateShippingInfo(formData);

    if (!senderValidation.isValid) {
      setCurrentStep(0);
      setErrors(senderValidation.message);
      return;
    }

    if (!recipientValidation.isValid) {
      setCurrentStep(1);
      setErrors(recipientValidation.message);
      return;
    }

    if (!packageValidation.isValid) {
      setCurrentStep(2);
      setErrors(packageValidation.message);
      return;
    }

    if (!shippingValidation.isValid) {
      setCurrentStep(3);
      setErrors(shippingValidation.message);
      return;
    }

    try {
      // Transform and prepare data for submission
      const submissionData = transformFormData(formData);

      // API call would go here
      // const response = await api.submitBooking(submissionData);

      resetForm();
      return true;
    } catch (error) {
      setErrors("An error occurred. Please try again.");
      return false;
    }
  };

  return {
    formData,
    currentStep,
    errors,
    handleChange,
    handleSelectChange,
    nextStep,
    prevStep,
    resetForm,
    submitForm,
  };
};
