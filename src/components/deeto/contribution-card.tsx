import { contributionSchema } from "@/schemas/contributions";
import { Card, CardDescription } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { onboardingStepSchema } from "@/schemas/onboarding";
import GiftBox from "~/icons/gift-box.svg?react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { VendorSettingsCurrency } from "./currency/vendor-custom-currency";

export const ContributionSkeleton = ({
  length,
  withImage,
}: {
  length: number;
  withImage?: boolean;
}) => (
  <div className="flex gap-2">
    {Array.from({ length }).map((_, i) => (
      <Card className="flex-1 rounded-xl p-4" key={i}>
        <CardDescription className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="rounded-m h-6 w-10 bg-primary-orange" />
            <Skeleton className="h-6 w-10 bg-primary" />
          </div>
          <div className="flex items-center gap-2">
            {withImage && (
              <Skeleton className="size-36 rounded-lg bg-tint-purple" />
            )}
            <div className="flex h-full w-full flex-1 flex-col gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-full rounded-none" />
              ))}
            </div>
          </div>
        </CardDescription>
      </Card>
    ))}
  </div>
);

export default function ContributionCard({
  contribution,
  step,
}: {
  contribution?: z.infer<typeof contributionSchema>;
  step: z.infer<typeof onboardingStepSchema>;
}) {
  const { t } = useTranslation();

  return (
    <Card className="flex-1 cursor-pointer rounded-xl p-4 hover:bg-grey-200">
      <CardDescription className="flex h-full flex-col space-y-4 text-primary">
        <div className="flex items-center justify-between">
          <div className="rounded-md bg-primary-orange px-2 py-1 text-xs capitalize">
            {t(step.identifier.toLowerCase())}
          </div>
          <div>
            {contribution ? (
              <span className="flex items-center gap-1 text-sm">
                <GiftBox className="size-5" />
                <VendorSettingsCurrency>
                  {contribution.rewards}
                </VendorSettingsCurrency>
              </span>
            ) : (
              <Button variant="outline" size="icon-sm">
                <PlusIcon className="size-4" />
              </Button>
            )}
          </div>
        </div>
        {!contribution && (
          <span className="flex w-full flex-1 items-end pb-4 text-base text-grey-400">
            {t(`${step.identifier}_not_available`)}
          </span>
        )}
        {contribution && (
          <div className="flex items-center gap-4">
            {contribution.thumbnail && (
              <img
                src={contribution.thumbnail}
                className="size-36 rounded-lg object-cover"
              />
            )}
            <div className="line-clamp-5 h-full w-full text-base font-normal">
              {contribution.previewText || contribution.text}
              {contribution.faq &&
                contribution.faq.map(({ fieldLabel, value }) => (
                  <>
                    <p>Q:{fieldLabel}</p>
                    <p>A:{value}</p>
                  </>
                ))}
            </div>
          </div>
        )}
      </CardDescription>
    </Card>
  );
}
