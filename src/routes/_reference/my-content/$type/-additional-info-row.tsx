import { contributionSchema } from "@/schemas/contributions";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { calcStatusLabelId } from "./-utils";
import { format } from "date-fns";
import { ReactNode } from "react";

const Block = ({
  title,
  description,
}: {
  title: ReactNode;
  description: ReactNode;
}) => {
  return (
    <div>
      <p className="text-inter font-medium text-secondary-orange">{title}</p>
      <span className="font-bold capitalize">{description}</span>
    </div>
  );
};

export default function AdditionalInfoRow({
  item,
}: {
  item: z.infer<typeof contributionSchema>;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-20 text-primary-dark">
      <Block
        title={t("status")}
        description={
          <>
            {calcStatusLabelId(item)}{" "}
            {item.usagePolicyChangedAt && (
              <span className="text-sm font-normal">
                ({format(item.usagePolicyChangedAt, "MMM dd, yyyy")})
              </span>
            )}
          </>
        }
      />
      <Block
        title={t("last_edited")}
        description={format(item.updatedAt, "MMM dd, yyyy")}
      />
      <Block title={t("viewed")} description={item.views} />
    </div>
  );
}
