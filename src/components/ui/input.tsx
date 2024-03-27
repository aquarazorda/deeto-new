import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, ...props }, ref) => {
    return (
      <div
        className="relative rounded-2xl border border-input border-tint-purple bg-white px-4
          shadow-input"
      >
        <input
          type={type}
          className={cn(
            `color-primary-dark peer flex w-full border-0 bg-transparent pb-3 pt-8 text-lg
            font-semibold focus-visible:outline-none disabled:cursor-not-allowed
            disabled:opacity-50`,
            className,
          )}
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            `text-inter pointer-events-none absolute top-[30%] text-xl font-medium
            text-grey-400 transition-all duration-150 ease-in`,
            !!props.value
              ? "top-[10%] text-sm"
              : "peer-focus:top-[10%] peer-focus:text-sm",
          )}
        >
          {placeholder}
        </div>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
