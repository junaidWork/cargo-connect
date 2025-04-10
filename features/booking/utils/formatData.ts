import { BookingFormData, BookingSubmitData } from "../types";

export const formatBookingData = (
  formData: BookingFormData
): BookingSubmitData => {
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
      pickupDate: new Date(formData.pickupDate).toISOString(),
    },
  };
};
