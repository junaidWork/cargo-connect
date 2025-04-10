export interface BookingFormData {
  // Sender info
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderAddress: string;
  senderCity: string;
  senderState: string;
  senderPostal: string;
  senderCountry: string;

  // Recipient info
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  recipientAddress: string;
  recipientCity: string;
  recipientState: string;
  recipientPostal: string;
  recipientCountry: string;

  // Package info
  packageType: string;
  packageWeight: string;
  packageLength: string;
  packageWidth: string;
  packageHeight: string;
  packageDescription: string;

  // Shipping info
  serviceType: string;
  insurance: string;
  pickupDate: string;
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
}

export interface BookingSubmissionData {
  sender: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
  recipient: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
  package: {
    type: string;
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    description: string;
  };
  shipping: {
    service: string;
    insurance: string;
    pickupDate: string;
  };
}
