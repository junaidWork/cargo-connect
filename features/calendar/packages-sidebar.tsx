"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Package } from "lucide-react";
import Link from "next/link";
import { SectionCard, PackageItem } from "@/components/common";

interface PackageType {
  id: string;
  tracking_number: string;
  description: string;
  status: string;
  sender: string;
  recipient: string;
  scheduled_date: string | null;
}

interface PackagesSidebarProps {
  isLoading: boolean;
  packages: PackageType[];
  onDragStart: (pkg: PackageType) => void;
}

export function PackagesSidebar({
  isLoading,
  packages,
  onDragStart,
}: PackagesSidebarProps) {
  return (
    <SectionCard
      title="Available Packages"
      description="Drag packages to schedule them"
      icon={Package}
      className="lg:col-span-1"
    >
      <ScrollArea className="h-[600px] pr-4">
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading packages...
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Package className="mx-auto h-12 w-12 opacity-20 mb-2" />
            <p>No unscheduled packages</p>
            <Button asChild variant="link" className="mt-2">
              <Link href="/booking">Book a new shipment</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {packages.map((pkg) => (
              <PackageItem key={pkg.id} pkg={pkg} onDragStart={onDragStart} />
            ))}
          </div>
        )}
      </ScrollArea>
    </SectionCard>
  );
}
