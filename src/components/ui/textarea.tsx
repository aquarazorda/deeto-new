import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          `placeholder:text-grey-600 flex min-h-[80px] w-full rounded-xl border
          border-input bg-white p-3 font-inter text-sm text-primary shadow-textarea
          ring-offset-background focus-visible:outline-none focus-visible:ring-1
          focus-visible:ring-secondary-purple disabled:cursor-not-allowed
          disabled:opacity-50`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
