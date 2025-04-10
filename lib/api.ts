// API client for the FastAPI backend

export interface Address {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface PackageDimensions {
  weight: number;
  length: number;
  width: number;
  height: number;
}

export interface BookingRequest {
  sender: Address;
  recipient: Address;
  package_type: string;
  dimensions: PackageDimensions;
  description?: string;
  service_type: string;
  insurance: string;
  pickup_date: string;
}

export interface BookingResponse {
  tracking_number: string;
  status: string;
  estimated_delivery: string;
}

export interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  completed: boolean;
  icon: string;
}

export interface TrackingLocation {
  city: string;
  state: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface ShipmentDetails {
  service: string;
  weight: string;
  dimensions: string;
  sender: string;
  recipient: string;
}

export interface TrackingResponse {
  tracking_number: string;
  status: string;
  estimated_delivery: string;
  current_location: TrackingLocation;
  shipment_details: ShipmentDetails;
  timeline: TrackingEvent[];
}

export interface Package {
  id: string;
  tracking_number: string;
  description: string;
  status: string;
  sender: string;
  recipient: string;
  scheduled_date: string | null;
}

// API base URL - would be set from environment variables in a real app
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// API client functions
export const api = {
  // Book a new shipment
  async bookShipment(bookingData: BookingRequest): Promise<BookingResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      
      if (!response.ok) {
        throw new Error(`Booking failed: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error booking shipment:', error);
      throw error;
    }
  },
  
  // Get tracking information
  async getTracking(trackingNumber: string): Promise<TrackingResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/tracking/${trackingNumber}`);
      
      if (!response.ok) {
        throw new Error(`Tracking failed: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting tracking:', error);
      throw error;
    }
  },
  
  // Get all packages
  async getPackages(): Promise<Package[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/packages`);
      
      if (!response.ok) {
        throw new Error(`Failed to get packages: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error getting packages:', error);
      throw error;
    }
  },
  
  // Schedule a package
  async schedulePackage(packageId: string, scheduledDate: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/packages/${packageId}/schedule?scheduled_date=${scheduledDate}`, {
        method: 'PUT',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to schedule package: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error scheduling package:', error);
      throw error;
    }
  },
  
  // Unschedule a package
  async unschedulePackage(packageId: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/packages/${packageId}/unschedule`, {
        method: 'PUT',
      });
      
      if (!response.ok) {
        throw new Error(`Failed to unschedule package: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error unscheduling package:', error);
      throw error;
    }
  },
};