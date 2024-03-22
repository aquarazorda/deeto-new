import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Spinner } from "../loaders/spinner";

const buttonVariants = cva(
  "inline-flex items-center gap-2.5 font-medium font-sans justify-center rounded-100 whitespace-nowrap text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-primary accent hover:text-accent-foreground",
        secondary: "bg-grey-100 text-secondary-purple hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-10 px-4 py-2 font-semibold font-inter",
        lg: "h-14 py-4 px-8 text-lg",
        icon: "h-9 py-2 px-3",
        "icon-sm": "px-4 py-3 h-12",
        "icon-lg": "px-5 py-4 h-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      type,
      asChild = false,
      children,
      disabled,
      loading,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        type={type ?? "button"}
        {...props}
      >
        {!asChild && loading && <Spinner />}
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
