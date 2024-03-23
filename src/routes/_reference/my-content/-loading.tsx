import PageTitle from "@/components/deeto/text/page-title";
import { Card, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import Pen from "@/assets/icons/pen.svg?react";
import { Button } from "@/components/ui/button";
import { StoryAddonSkeleton } from "@/components/deeto/activity-addon";
import { ContributionSkeleton } from "@/components/deeto/contribution-card";

export default function MyContentPending() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8">
      <PageTitle>{t("my_content")}</PageTitle>
      <Card variant="shadow" className="font-bold">
        <CardDescription className="flex gap-6 items-center">
          <p className="text-2xl">{t("influence")}</p>
          <Progress value={90} pending key="influence-progress" />{" "}
          <div className="text-xl flex items-center">
            <Skeleton className="size-5 bg-primary mr-1" />
            <span className="text-grey-400">/100</span>
          </div>
        </CardDescription>
      </Card>
      <Card variant="shadow">
        <CardDescription className="font-bold text-primary-dark flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <p className="text-xl">{t("activities")}</p>
            <Button variant="outline" size="sm" disabled>
              <Pen /> {t("edit")}
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <StoryAddonSkeleton key={i} />
            ))}
          </div>
        </CardDescription>
      </Card>
      <Card variant="shadow">
        <CardDescription className="font-bold text-primary-dark flex flex-col gap-4">
          <p className="text-xl">{t("contributions")}</p>
          <ContributionSkeleton length={2} withImage />
          <ContributionSkeleton length={3} />
        </CardDescription>
      </Card>
    </div>
  );
}
