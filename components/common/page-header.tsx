import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
}

export function PageHeader({
  title,
  description,
  icon: Icon,
}: PageHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      {Icon && <Icon className="h-8 w-8" />}
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}
