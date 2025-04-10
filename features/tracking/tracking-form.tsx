"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SectionCard } from "@/components/common";
import { useToast } from "@/hooks/use-toast";
import { api, TrackingResponse } from "@/lib/api";

interface TrackingFormProps {
  onTrackingSuccess: (data: TrackingResponse) => void;
}

export function TrackingForm({ onTrackingSuccess }: TrackingFormProps) {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleTracking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingNumber.trim()) {
      toast({
        title: "Tracking number required",
        description: "Please enter a valid tracking number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response: TrackingResponse = await api.getTracking(trackingNumber);
      console.log("Tracking data:", response);

      onTrackingSuccess(response);

      toast({
        title: "Tracking information found",
        description: `Details for ${trackingNumber} retrieved successfully`,
      });
    } catch (error) {
      toast({
        title: "Error retrieving tracking information",
        description: "Please try again or contact customer support",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SectionCard
      title="Enter Tracking Number"
      description="Enter your tracking number to get real-time updates on your shipment"
      className="mb-8"
    >
      <form onSubmit={handleTracking} className="flex space-x-2">
        <Input
          placeholder="e.g., DHL-1234567890"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Tracking..." : "Track"}
        </Button>
      </form>
    </SectionCard>
  );
}
