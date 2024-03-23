import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, ...props }, ref) => {
    return (
      <div
        className="bg-white shadow-input relative px-4 border-input rounded-2xl border-tint-purple
          border"
      >
        <input
          type={type}
          className={cn(
            `flex peer w-full bg-transparent pt-8 pb-3 text-sm border-0 color-primary-dark
            focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
            className,
          )}
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            `text-inter text-grey-400 pointer-events-none text-xl font-medium absolute
            transition-all top-[30%] ease-in duration-150`,
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
