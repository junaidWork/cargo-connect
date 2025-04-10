import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PackageSearch, CalendarRange, Package } from "lucide-react";
import { SectionCard } from "@/components/common";

export function ServicesSection() {
  return (
    <section className="py-16 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <SectionCard
          title="Real-time Tracking"
          description="Monitor your shipments with precise location updates"
          icon={PackageSearch}
          footer={
            <Button asChild variant="outline" className="w-full">
              <Link href="/tracking">Track Now</Link>
            </Button>
          }
        >
          <p>
            Get detailed information about your package's journey, including
            current location, estimated delivery time, and status updates.
          </p>
        </SectionCard>

        <SectionCard
          title="Easy Booking"
          description="Book shipments with just a few clicks"
          icon={Package}
          footer={
            <Button asChild variant="outline" className="w-full">
              <Link href="/booking">Book Order</Link>
            </Button>
          }
        >
          <p>
            Our streamlined booking process makes it simple to schedule pickups,
            select service options, and get instant quotes for your shipments.
          </p>
        </SectionCard>

        <SectionCard
          title="Logistics Calendar"
          description="Manage your shipments with our drag-and-drop calendar"
          icon={CalendarRange}
          footer={
            <Button asChild variant="outline" className="w-full">
              <Link href="/calendar">View Calendar</Link>
            </Button>
          }
        >
          <p>
            Visualize your shipping schedule, reschedule deliveries, and
            optimize your logistics operations with our intuitive calendar
            interface.
          </p>
        </SectionCard>
      </div>
    </section>
  );
}
