import { BookingSubmitData } from "../types";
import { BookingRequest } from "@/lib/api";

/**
 * Converts BookingSubmitData from our form structure to BookingRequest for the API
 */
export function mapToBookingRequest(
  submitData: BookingSubmitData
): BookingRequest {
  return {
    sender: {
      name: submitData.sender.name,
      email: submitData.sender.email,
      phone: submitData.sender.phone,
      address: submitData.sender.address.street,
      city: submitData.sender.address.city,
      state: submitData.sender.address.state,
      zip_code: submitData.sender.address.postalCode,
      country: submitData.sender.address.country,
    },
    recipient: {
      name: submitData.recipient.name,
      email: submitData.recipient.email,
      phone: submitData.recipient.phone,
      address: submitData.recipient.address.street,
      city: submitData.recipient.address.city,
      state: submitData.recipient.address.state,
      zip_code: submitData.recipient.address.postalCode,
      country: submitData.recipient.address.country,
    },
    package_type: submitData.package.type,
    dimensions: {
      weight: submitData.package.weight,
      length: submitData.package.dimensions.length,
      width: submitData.package.dimensions.width,
      height: submitData.package.dimensions.height,
    },
    description: submitData.package.description,
    service_type: submitData.shipping.service,
    insurance: submitData.shipping.insurance,
    pickup_date: submitData.shipping.pickupDate,
  };
}
