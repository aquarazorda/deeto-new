import { FC } from "react";
import { CustomSvg } from "../custom-svg";
import { useUser } from "@/lib/states/user";

interface VendorSettingsCurrencyProps {
  prefix?: boolean;
  postfix?: boolean;
  size?: number;
}

export const VendorSettingsCurrency: FC<VendorSettingsCurrencyProps> = ({
  prefix = false,
  postfix = false,
  size = 32,
}) => {
  const { vendor } = useUser();
  const { currencyPrefix, currencyPostfix } = vendor?.settings;

  if (prefix && currencyPrefix) {
    return <CustomSvg icon={currencyPrefix} size={size} />;
  }

  if (postfix && currencyPostfix) {
    return <CustomSvg icon={currencyPostfix} size={size} />;
  }

  if (!prefix && !postfix) {
    return (
      <CustomSvg icon={currencyPrefix ?? currencyPostfix ?? ""} size={size} />
    );
  }
};
