"use client";

import { Button } from "@/components/ui/button";
import { CalendarRange, ArrowLeft, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/common";

interface CalendarHeaderProps {
  currentDate: Date;
  weekRange: string;
  onPrevWeek: () => void;
  onNextWeek: () => void;
}

export function CalendarHeader({
  currentDate,
  weekRange,
  onPrevWeek,
  onNextWeek,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <PageHeader title="Logistics Calendar" icon={CalendarRange} />
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={onPrevWeek}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <span className="font-medium">{weekRange}</span>
        <Button variant="outline" size="icon" onClick={onNextWeek}>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
