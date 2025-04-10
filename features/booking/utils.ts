import { BookingFormData, BookingSubmitData } from "./types";

export function transformFormData(
  formData: BookingFormData
): BookingSubmitData {
  return {
    sender: {
      name: formData.senderName,
      email: formData.senderEmail,
      phone: formData.senderPhone,
      address: {
        street: formData.senderAddress,
        city: formData.senderCity,
        state: formData.senderState,
        postalCode: formData.senderPostal,
        country: formData.senderCountry,
      },
    },
    recipient: {
      name: formData.recipientName,
      email: formData.recipientEmail,
      phone: formData.recipientPhone,
      address: {
        street: formData.recipientAddress,
        city: formData.recipientCity,
        state: formData.recipientState,
        postalCode: formData.recipientPostal,
        country: formData.recipientCountry,
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
      description: formData.packageDescription || "",
    },
    shipping: {
      service: formData.serviceType,
      insurance: formData.insurance,
      pickupDate: formData.pickupDate,
    },
  };
}

export function getInitialFormData(): BookingFormData {
  return {
    // Sender details
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    senderAddress: "",
    senderCity: "",
    senderState: "",
    senderPostal: "",
    senderCountry: "United States",

    // Recipient details
    recipientName: "",
    recipientEmail: "",
    recipientPhone: "",
    recipientAddress: "",
    recipientCity: "",
    recipientState: "",
    recipientPostal: "",
    recipientCountry: "United States",

    // Package details
    packageType: "parcel",
    packageWeight: "",
    packageLength: "",
    packageWidth: "",
    packageHeight: "",
    packageDescription: "",

    // Shipping options
    serviceType: "express",
    insurance: "basic",
    pickupDate: "",
  };
}

export function validateStep(
  step: number,
  formData: BookingFormData
): { isValid: boolean; message?: string } {
  switch (step) {
    case 1:
      if (
        !formData.senderName ||
        !formData.senderEmail ||
        !formData.senderPhone ||
        !formData.senderAddress
      ) {
        return {
          isValid: false,
          message: "Please fill in all required sender details",
        };
      }
      break;
    case 2:
      if (
        !formData.recipientName ||
        !formData.recipientEmail ||
        !formData.recipientPhone ||
        !formData.recipientAddress
      ) {
        return {
          isValid: false,
          message: "Please fill in all required recipient details",
        };
      }
      break;
    case 3:
      if (
        !formData.packageWeight ||
        !formData.packageLength ||
        !formData.packageWidth ||
        !formData.packageHeight
      ) {
        return {
          isValid: false,
          message: "Please fill in all required package details",
        };
      }
      break;
    case 4:
      if (!formData.pickupDate) {
        return {
          isValid: false,
          message: "Please select a pickup date",
        };
      }
      break;
  }
  return { isValid: true };
}
