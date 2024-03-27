import PageTitle from "@/components/deeto/text/page-title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { endpoints } from "@/lib/endpoints";
import { queryKeys } from "@/lib/query";
import { api } from "@/lib/requests";
import { ReferralStatus, referralSchema } from "@/schemas/referrals";
import { useQuery } from "@tanstack/react-query";
import { Navigate, createLazyFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { match } from "ts-pattern";
import { z } from "zod";
import GiftBox from "~/icons/gift-box.svg?react";

const StatusContent = ({ rewards }: z.infer<typeof referralSchema>) => {
  const { t } = useTranslation();

  return (
    <div className="text-base text-primary-dark">
      {match(status)
        .with(ReferralStatus.NEW, () => (
          <>
            <span className="lg:hidden">{t("pending")}</span>
            <span className="hidden lg:block">{t("pending_rewards")}</span>
          </>
        ))
        .with(
          ReferralStatus.QUALIFIED,
          () => `${rewards?.[0] ?? "0"} / ${rewards?.[1] ?? "0"}`,
        )
        .with(ReferralStatus.WON, () => rewards?.[0] ?? "0")
        .with(ReferralStatus.CLOSED, () => rewards?.[0] ?? "0")
        .otherwise(() => t("rewards_badge_referral", { rewardsCount: 10 }))}
    </div>
  );
};

const ReferralsComponent = () => {
  const { t } = useTranslation();
  const { data } = useQuery({
    queryKey: queryKeys.REFERENCE_REFERRALS,
    queryFn: () => api.get(endpoints.REFERRAL_PATH, z.array(referralSchema)),
  });

  if (!data?.ok) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex w-full justify-between">
        <PageTitle>{t("referrals")}</PageTitle>
        <div className="space-x-4">
          <Button variant="outline">{t("personal_referral_link")}</Button>
          <Button>{t("new_referral")}</Button>
        </div>
      </div>
      <div className="grid grid-cols-[minmax(18rem,_1fr)] md:grid-cols-[minmax(25.375rem,_25.375rem)]">
        {data.val.map((referral) => (
          <Card>
            <div className="flex justify-between">
              <p className="font-inter text-xl text-primary-dark">
                {referral.firstName} {referral.lastName}
              </p>
              <Badge>
                <GiftBox /> <StatusContent {...referral} />
                {/* <VendorSettingsCurrency> */}
                {/*   {referral.rewards} */}
                {/* </VendorSettingsCurrency> */}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/_reference/referrals/")({
  component: ReferralsComponent,
});
