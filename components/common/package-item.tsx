import { Plus } from "lucide-react";
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

interface PackageItemProps {
  pkg: Package;
  onDragStart: (pkg: Package) => void;
}

export function PackageItem({ pkg, onDragStart }: PackageItemProps) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(pkg)}
      className="border rounded-lg p-3 cursor-move hover:border-primary transition-colors"
    >
      <div className="font-medium truncate">{pkg.description}</div>
      <div className="text-sm text-muted-foreground truncate">
        {pkg.tracking_number}
      </div>
      <div className="flex justify-between items-center mt-2">
        <StatusBadge status={pkg.status} />
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
