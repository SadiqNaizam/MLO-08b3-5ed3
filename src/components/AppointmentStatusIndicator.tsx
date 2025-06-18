import React from 'react';
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type AppointmentStatus = 'Upcoming' | 'Completed' | 'Cancelled' | 'Pending';

interface AppointmentStatusIndicatorProps {
  status: AppointmentStatus;
  className?: string;
}

const AppointmentStatusIndicator: React.FC<AppointmentStatusIndicatorProps> = ({
  status,
  className,
}) => {
  console.log("Rendering AppointmentStatusIndicator with status:", status);

  let variant: "default" | "secondary" | "destructive" | "outline" = "default";
  let statusText = status;

  switch (status) {
    case 'Upcoming':
      variant = "default"; // Typically blue or primary color
      // For a specific Doraemon blue, you might need a custom badge variant or direct styling
      // className={cn("bg-blue-500 text-white hover:bg-blue-600", className)}
      break;
    case 'Completed':
      variant = "secondary"; // Typically green or gray
      // className={cn("bg-green-500 text-white hover:bg-green-600", className)}
      break;
    case 'Cancelled':
      variant = "destructive"; // Typically red
      break;
    case 'Pending':
      variant = "outline"; // Typically yellow or orange (using outline for now)
      // className={cn("bg-yellow-400 text-black hover:bg-yellow-500", className)}
      break;
    default:
      statusText = "Unknown";
      variant = "secondary";
  }

  return (
    <Badge variant={variant} className={cn("capitalize", className)}>
      {statusText}
    </Badge>
  );
};

export default AppointmentStatusIndicator;