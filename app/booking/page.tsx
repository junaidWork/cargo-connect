import { PageLayout } from "@/components/page-layout";
import { BookingForm } from "@/features/booking/components/booking-form";
import { BookingHeader } from "@/features/booking/components/booking-header";
import { Package } from "lucide-react";
import { PageHeader } from "@/components/common";

export default function BookingPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <PageHeader
            title="Book a Shipment"
            description="Fill out the form to book your package for shipping"
            icon={Package}
          />
          <BookingForm />
        </div>
      </div>
    </PageLayout>
  );
}
