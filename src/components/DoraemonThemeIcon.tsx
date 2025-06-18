import React from 'react';
import { Bell } from 'lucide-react'; // Using Bell as a placeholder for Doraemon's bell
import { cn } from '@/lib/utils';

interface DoraemonThemeIconProps {
  size?: number;
  color?: string; // Allow custom color, defaults to a "Doraemon blue"
  className?: string;
}

const DoraemonThemeIcon: React.FC<DoraemonThemeIconProps> = ({
  size = 24,
  color = "text-blue-500", // Placeholder for Doraemon Blue
  className,
}) => {
  console.log("Rendering DoraemonThemeIcon");

  // In a real scenario, this might be an SVG or a custom image component
  // For now, we use a styled Lucide icon
  return (
    <div className={cn("inline-flex items-center justify-center", className)}>
      <Bell size={size} className={cn(color)} />
    </div>
  );
};

export default DoraemonThemeIcon;