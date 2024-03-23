import { FC } from "react";

interface CustomSvgProps {
  icon: string;
  size: number;
}

export const CustomSvg: FC<CustomSvgProps> = ({ icon, size }) => {
  if (icon.startsWith("https://")) {
    return (
      <>
        <span>&nbsp;</span>
        <svg width={size} height={size}>
          <image xlinkHref={icon} width={size} height={size} />
        </svg>
        <span>&nbsp;</span>
      </>
    );
  }

  return icon;
};
