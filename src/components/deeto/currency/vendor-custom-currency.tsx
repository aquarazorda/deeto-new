import { FC, HTMLAttributes } from "react";
import { CustomSvg } from "../custom-svg";
import { useUser } from "@/lib/states/user";
import { cn } from "@/lib/utils";

interface VendorSettingsCurrencyProps extends HTMLAttributes<HTMLDivElement> {
  currencyProps?: HTMLAttributes<SVGElement>;
}

export const VendorSettingsCurrency: FC<VendorSettingsCurrencyProps> = ({
  currencyProps,
  children,
  className,
  ...props
}) => {
  const { vendor } = useUser();
  const { currencyPrefix, currencyPostfix, currencyFallback } =
    vendor?.settings;

  return (
    <div className={cn("flex items-center gap-1", className)} {...props}>
      {currencyPrefix && (
        <CustomSvg
          icon={currencyPrefix ?? currencyFallback}
          {...currencyProps}
        />
      )}
      {children}
      {currencyPostfix && (
        <CustomSvg icon={currencyPostfix} {...currencyProps} />
      )}
      {currencyFallback && !currencyPostfix && !currencyPrefix && (
        <CustomSvg icon={currencyFallback} {...currencyProps} />
      )}
    </div>
  );
};
