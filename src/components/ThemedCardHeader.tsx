import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ThemedCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  // Example theme prop, could be expanded
  themeColor?: 'blue' | 'pink' | 'default';
}

const ThemedCardHeader: React.FC<ThemedCardHeaderProps> = ({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  themeColor = 'default',
  children, // Allow passing other elements like actions/buttons
  ...props
}) => {
  console.log("Rendering ThemedCardHeader with title:", title, "and theme:", themeColor);

  const themeStyles = {
    blue: "bg-blue-500 border-blue-600 text-white", // Placeholder for Doraemon Blue
    pink: "bg-pink-500 border-pink-600 text-white", // Placeholder for another theme color
    default: "bg-card border-border", // Default shadcn card header style
  };

  return (
    <CardHeader
      className={cn(
        "rounded-t-lg p-4", // Adjusted padding
        themeStyles[themeColor],
        className
      )}
      {...props}
    >
      <CardTitle className={cn("text-xl font-semibold", themeColor !== 'default' ? 'text-white' : 'text-card-foreground', titleClassName)}>
        {title}
      </CardTitle>
      {description && (
        <CardDescription className={cn(themeColor !== 'default' ? 'text-blue-100' : 'text-muted-foreground', descriptionClassName)}>
          {description}
        </CardDescription>
      )}
      {children}
    </CardHeader>
  );
};

export default ThemedCardHeader;