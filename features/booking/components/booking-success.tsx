import Link from "next/link";
import { CheckCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookingFormData } from "../types";

interface BookingSuccessProps {
  trackingNumber: string;
  formData: BookingFormData;
}

export function BookingSuccess({
  trackingNumber,
  formData,
}: BookingSuccessProps) {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <CardTitle className="text-2xl">Booking Successful!</CardTitle>
        <CardDescription>
          Your shipment has been booked and is being processed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-lg text-center">
          <div className="text-sm text-muted-foreground">Tracking Number</div>
          <div className="text-xl font-bold mt-1">{trackingNumber}</div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Shipment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">From</div>
              <div>{formData.senderName}</div>
              <div>{formData.senderAddress}</div>
              <div>
                {formData.senderCity}, {formData.senderState}{" "}
                {formData.senderPostal}
              </div>
              <div>{formData.senderCountry}</div>
            </div>
            <div>
              <div className="text-muted-foreground">To</div>
              <div>{formData.recipientName}</div>
              <div>{formData.recipientAddress}</div>
              <div>
                {formData.recipientCity}, {formData.recipientState}{" "}
                {formData.recipientPostal}
              </div>
              <div>{formData.recipientCountry}</div>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Package Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Service Type</div>
              <div className="capitalize">{formData.serviceType}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Package Type</div>
              <div className="capitalize">{formData.packageType}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Weight</div>
              <div>{formData.packageWeight} kg</div>
            </div>
            <div>
              <div className="text-muted-foreground">Dimensions</div>
              <div>
                {formData.packageLength} × {formData.packageWidth} ×{" "}
                {formData.packageHeight} cm
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="w-full">
          <Link href={`/tracking?tracking=${trackingNumber}`}>
            Track Shipment
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/calendar">View in Calendar</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
