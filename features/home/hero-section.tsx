import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Streamlined Logistics Solutions
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Track shipments in real-time, book new orders, and manage your
          logistics calendar with ease.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/tracking">Track Shipment</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/booking">Book an Order</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
