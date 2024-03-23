import { HTMLAttributes } from "react";

interface CustomSvgProps extends HTMLAttributes<SVGElement> {
  icon: string;
}

export const CustomSvg = ({ icon, ...props }: CustomSvgProps) => {
  if (icon.startsWith("https://")) {
    return (
      <svg {...props}>
        <image xlinkHref={icon} />
      </svg>
    );
  }

  return icon;
};
