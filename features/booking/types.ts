export interface BookingFormData {
  // Sender details
  senderName: string;
  senderEmail: string;
  senderPhone: string;
  senderCountry: string;
  senderAddress: string;
  senderCity: string;
  senderState: string;
  senderPostal: string;

  // Recipient details
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  recipientCountry: string;
  recipientAddress: string;
  recipientCity: string;
  recipientState: string;
  recipientPostal: string;

  // Package details
  packageType: string;
  packageWeight: string;
  packageLength: string;
  packageWidth: string;
  packageHeight: string;
  packageDescription: string;

  // Shipping details
  serviceType: string;
  insurance: string;
  pickupDate: string;
}

export interface BookingSubmitData {
  sender: {
    name: string;
    email: string;
    phone: string;
    address: {
      country: string;
      street: string;
      city: string;
      state: string;
      postalCode: string;
    };
  };
  recipient: {
    name: string;
    email: string;
    phone: string;
    address: {
      country: string;
      street: string;
      city: string;
      state: string;
      postalCode: string;
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

export interface BookingStepProps {
  formData: BookingFormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSelectChange: (name: string, value: string) => void;
}

export interface ValidationResult {
  isValid: boolean;
  message: string;
}
