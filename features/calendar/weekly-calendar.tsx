"use client";

import { SectionCard, CalendarCell } from "@/components/common";

interface PackageType {
  id: string;
  tracking_number: string;
  description: string;
  status: string;
  sender: string;
  recipient: string;
  scheduled_date: string | null;
}

interface WeeklyCalendarProps {
  weekDates: Date[];
  formatDate: (date: Date) => string;
  getPackagesForDate: (date: Date) => PackageType[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, date: Date) => void;
  onRemove: (packageId: string) => void;
}

export function WeeklyCalendar({
  weekDates,
  formatDate,
  getPackagesForDate,
  onDragOver,
  onDrop,
  onRemove,
}: WeeklyCalendarProps) {
  return (
    <SectionCard
      title="Weekly Schedule"
      description="Manage your shipment schedule"
      className="lg:col-span-3"
    >
      <div className="grid grid-cols-7 gap-2">
        {weekDates.map((date, index) => (
          <div key={index} className="text-center font-medium">
            <div className="text-sm text-muted-foreground">
              {date.toLocaleDateString("en-US", { weekday: "short" })}
            </div>
            <div>{formatDate(date)}</div>
          </div>
        ))}

        {weekDates.map((date, index) => (
          <CalendarCell
            key={`cell-${index}`}
            date={date}
            packages={getPackagesForDate(date)}
            isToday={date.toDateString() === new Date().toDateString()}
            onRemove={onRemove}
            onDragOver={onDragOver}
            onDrop={onDrop}
          />
        ))}
      </div>
    </SectionCard>
  );
}
