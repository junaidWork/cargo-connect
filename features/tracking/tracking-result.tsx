"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock } from "lucide-react";
import { StatusBadge } from "@/components/common";
import { TrackingMap } from "@/components/tracking-map";
import { TrackingTimeline } from "@/components/tracking-timeline";
import { TrackingResponse } from "@/lib/api";

interface TrackingResultProps {
  trackingData: TrackingResponse;
}

export function TrackingResult({ trackingData }: TrackingResultProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Tracking #{trackingData.tracking_number}</span>
            <StatusBadge status={trackingData.status} />
          </CardTitle>
          <CardDescription>
            <div className="flex items-center mt-2">
              <Clock className="h-4 w-4 mr-1" />
              <span>
                Estimated Delivery:{" "}
                {new Date(trackingData.estimated_delivery).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center mt-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span>
                Current Location: {trackingData.current_location.city},{" "}
                {trackingData.current_location.state}
              </span>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="map">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="details">Shipment Details</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <TrackingMap location={trackingData.current_location} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <TrackingTimeline events={trackingData.timeline} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Service Type
                  </h3>
                  <p>{trackingData.shipment_details.service}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Package Information
                  </h3>
                  <p>Weight: {trackingData.shipment_details.weight}</p>
                  <p>Dimensions: {trackingData.shipment_details.dimensions}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Sender
                  </h3>
                  <p>{trackingData.shipment_details.sender}</p>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">
                    Recipient
                  </h3>
                  <p>{trackingData.shipment_details.recipient}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
