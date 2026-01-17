import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/cn";

interface StatusBadgeProps {
  type: "console" | "language" | "status" | "category" | "genre";
  label: string;
  className?: string;
}

/**
 * Color-coded badge for different metadata types.
 */
export function StatusBadge({ type, label, className }: StatusBadgeProps) {
  const variantMap = {
    console: "info",
    language: "success",
    status: "warning",
    category: "secondary",
    genre: "outline",
  } as const;

  return (
    <Badge variant={variantMap[type]} className={cn("text-xs", className)}>
      {label}
    </Badge>
  );
}
