import { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./status-badge";

interface Package {
  id: string;
  tracking_number: string;
  description: string;
  status: string;
  sender: string;
  recipient: string;
  scheduled_date: string | null;
}

interface CalendarCellProps {
  date: Date;
  packages: Package[];
  isToday?: boolean;
  onRemove: (packageId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, date: Date) => void;
}

export function CalendarCell({
  date,
  packages,
  isToday = false,
  onRemove,
  onDragOver,
  onDrop,
}: CalendarCellProps) {
  return (
    <div
      className={`border rounded-lg h-[500px] overflow-y-auto p-2 ${
        isToday ? "bg-muted/50 border-primary/50" : ""
      }`}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, date)}
    >
      {packages.map((pkg) => (
        <div key={pkg.id} className="border rounded-lg p-2 mb-2 bg-card">
          <div className="font-medium truncate">{pkg.description}</div>
          <div className="text-xs text-muted-foreground truncate">
            {pkg.tracking_number}
          </div>
          <div className="flex justify-between items-center mt-1">
            <StatusBadge
              status={pkg.status}
              className="px-1.5 py-0.5 text-xs"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={() => onRemove(pkg.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
