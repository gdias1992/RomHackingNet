import * as React from "react";
import { cn } from "@/utils/cn";
import { Check } from "lucide-react";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="flex items-center space-x-2">
        <div className="relative">
          <input
            type="checkbox"
            id={inputId}
            ref={ref}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "h-4 w-4 shrink-0 rounded-sm border border-primary shadow",
              "peer-focus-visible:ring-1 peer-focus-visible:ring-ring",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              "peer-checked:bg-primary peer-checked:text-primary-foreground",
              "flex items-center justify-center",
              className
            )}
          >
            <Check className="h-3 w-3 text-current opacity-0 peer-checked:opacity-100" />
          </div>
        </div>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50 cursor-pointer"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
