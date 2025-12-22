// components/TicketStatusBadge.tsx
import { Badge } from "@/components/ui/badge";

const statusConfig = {
  OPEN: {
    label: "Open",
    className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  STARTED: {
    label: "Started",
    className:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  CLOSED: {
    label: "Closed",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
};

export default function TicketStatusBadge({ status }: { status: string }) {
  const config = statusConfig[status as keyof typeof statusConfig];

  return (
    <Badge className={config?.className || "bg-gray-100 text-gray-800"}>
      {config?.label || status}
    </Badge>
  );
}
