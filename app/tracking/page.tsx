"use client";

import { useState } from "react";
import { PackageSearch } from "lucide-react";
import { PageLayout } from "@/components/page-layout";
import { PageHeader } from "@/components/common";
import { TrackingForm, TrackingResult } from "@/features/tracking";
import { TrackingResponse } from "@/lib/api";

export default function TrackingPage() {
  const [trackingData, setTrackingData] = useState<TrackingResponse | null>(
    null
  );

  const handleTrackingSuccess = (data: TrackingResponse) => {
    setTrackingData(data);
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <PageHeader title="Track Your Shipment" icon={PackageSearch} />

          <TrackingForm onTrackingSuccess={handleTrackingSuccess} />

          {trackingData && <TrackingResult trackingData={trackingData} />}
        </div>
      </div>
    </PageLayout>
  );
}
