import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CustomSvgProps extends HTMLAttributes<SVGElement> {
  icon: string;
}

export const CustomSvg = ({ icon, className, ...props }: CustomSvgProps) => {
  if (icon.startsWith("https://")) {
    return (
      <svg className={cn("flex size-6", className)} {...props}>
        <image
          xlinkHref={icon}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
        />
      </svg>
    );
  }

  return icon;
};
