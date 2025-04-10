import { BookingFormData, ValidationResult } from "../types";

export const validateSenderInfo = (
  formData: BookingFormData
): ValidationResult => {
  if (!formData.senderName) {
    return { isValid: false, message: "Sender name is required" };
  }
  if (!formData.senderEmail) {
    return { isValid: false, message: "Sender email is required" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.senderEmail)) {
    return { isValid: false, message: "Invalid email format" };
  }
  if (!formData.senderPhone) {
    return { isValid: false, message: "Sender phone is required" };
  }
  if (!formData.senderAddress) {
    return { isValid: false, message: "Sender address is required" };
  }
  if (!formData.senderCity) {
    return { isValid: false, message: "Sender city is required" };
  }
  if (!formData.senderState) {
    return { isValid: false, message: "Sender state is required" };
  }
  if (!formData.senderPostal) {
    return { isValid: false, message: "Sender postal code is required" };
  }
  if (!formData.senderCountry) {
    return { isValid: false, message: "Sender country is required" };
  }

  return { isValid: true, message: "" };
};

export const validateRecipientInfo = (
  formData: BookingFormData
): ValidationResult => {
  if (!formData.recipientName) {
    return { isValid: false, message: "Recipient name is required" };
  }
  if (!formData.recipientEmail) {
    return { isValid: false, message: "Recipient email is required" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.recipientEmail)) {
    return { isValid: false, message: "Invalid email format" };
  }
  if (!formData.recipientPhone) {
    return { isValid: false, message: "Recipient phone is required" };
  }
  if (!formData.recipientAddress) {
    return { isValid: false, message: "Recipient address is required" };
  }
  if (!formData.recipientCity) {
    return { isValid: false, message: "Recipient city is required" };
  }
  if (!formData.recipientState) {
    return { isValid: false, message: "Recipient state is required" };
  }
  if (!formData.recipientPostal) {
    return { isValid: false, message: "Recipient postal code is required" };
  }
  if (!formData.recipientCountry) {
    return { isValid: false, message: "Recipient country is required" };
  }

  return { isValid: true, message: "" };
};

export const validatePackageInfo = (
  formData: BookingFormData
): ValidationResult => {
  if (!formData.packageType) {
    return { isValid: false, message: "Package type is required" };
  }
  if (!formData.packageWeight) {
    return { isValid: false, message: "Package weight is required" };
  }
  const weight = parseFloat(formData.packageWeight);
  if (isNaN(weight) || weight <= 0) {
    return { isValid: false, message: "Weight must be a positive number" };
  }
  if (!formData.packageLength) {
    return { isValid: false, message: "Package length is required" };
  }
  const length = parseFloat(formData.packageLength);
  if (isNaN(length) || length <= 0) {
    return { isValid: false, message: "Length must be a positive number" };
  }
  if (!formData.packageWidth) {
    return { isValid: false, message: "Package width is required" };
  }
  const width = parseFloat(formData.packageWidth);
  if (isNaN(width) || width <= 0) {
    return { isValid: false, message: "Width must be a positive number" };
  }
  if (!formData.packageHeight) {
    return { isValid: false, message: "Package height is required" };
  }
  const height = parseFloat(formData.packageHeight);
  if (isNaN(height) || height <= 0) {
    return { isValid: false, message: "Height must be a positive number" };
  }

  return { isValid: true, message: "" };
};

export const validateShippingInfo = (
  formData: BookingFormData
): ValidationResult => {
  if (!formData.serviceType) {
    return { isValid: false, message: "Service type is required" };
  }
  if (!formData.pickupDate) {
    return { isValid: false, message: "Pickup date is required" };
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(formData.pickupDate);

  if (selectedDate < today) {
    return { isValid: false, message: "Pickup date cannot be in the past" };
  }

  return { isValid: true, message: "" };
};

export const validateAllSteps = (
  formData: BookingFormData
): ValidationResult => {
  const senderValidation = validateSenderInfo(formData);
  if (!senderValidation.isValid) {
    return senderValidation;
  }

  const recipientValidation = validateRecipientInfo(formData);
  if (!recipientValidation.isValid) {
    return recipientValidation;
  }

  const packageValidation = validatePackageInfo(formData);
  if (!packageValidation.isValid) {
    return packageValidation;
  }

  const shippingValidation = validateShippingInfo(formData);
  if (!shippingValidation.isValid) {
    return shippingValidation;
  }

  return { isValid: true, message: "" };
};

export const transformFormData = (formData: BookingFormData) => {
  return {
    sender: {
      name: formData.senderName,
      email: formData.senderEmail,
      phone: formData.senderPhone,
      address: {
        country: formData.senderCountry,
        street: formData.senderAddress,
        city: formData.senderCity,
        state: formData.senderState,
        postalCode: formData.senderPostal,
      },
    },
    recipient: {
      name: formData.recipientName,
      email: formData.recipientEmail,
      phone: formData.recipientPhone,
      address: {
        country: formData.recipientCountry,
        street: formData.recipientAddress,
        city: formData.recipientCity,
        state: formData.recipientState,
        postalCode: formData.recipientPostal,
      },
    },
    package: {
      type: formData.packageType,
      weight: parseFloat(formData.packageWeight),
      dimensions: {
        length: parseFloat(formData.packageLength),
        width: parseFloat(formData.packageWidth),
        height: parseFloat(formData.packageHeight),
      },
      description: formData.packageDescription,
    },
    shipping: {
      service: formData.serviceType,
      insurance: formData.insurance,
      pickupDate: formData.pickupDate,
    },
  };
};
