import { cn } from "@/lib/utils";
import React, { AllHTMLAttributes } from "react";

interface WidgetProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

export const Widget: React.FC<WidgetProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        className,
        "flex items-center bg-widget p-3 rounded-[16px] relative mb-5"
      )}
    >
      <div className="ml-2">{children}</div>
    </div>
  );
};

export const WidgetTitle: React.FC<WidgetProps> = ({ children, className }) => {
  return <h2 className={cn(className, "font-bold")}>{children}</h2>;
};

export const WidgetBody: React.FC<WidgetProps> = ({ children, className }) => {
  return <div className={cn(className, "")}>{children}</div>;
};
