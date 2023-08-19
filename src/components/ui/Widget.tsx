import { cn } from "@/lib/utils";
import React from "react";

interface WidgetProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

export const Widget: React.FC<WidgetProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex items-center bg-widget p-3 rounded-[16px] relative mb-5",
        className
      )}
    >
      <div className="w-full">{children}</div>
    </div>
  );
};

export const WidgetTitle: React.FC<WidgetProps> = ({ children, className }) => {
  return <h2 className={cn("font-bold ml-2", className)}>{children}</h2>;
};

export const WidgetBody: React.FC<WidgetProps> = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col items-start", className)}>{children}</div>
  );
};
