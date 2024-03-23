import PageTitle from "@/components/deeto/text/page-title";
import { Card, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import MyContentPending from "./-loading";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query";
import { api } from "@/lib/requests";
import {
  contributionSchema,
  contributionsRequestSchema,
} from "@/schemas/contributions";
import { useMemo } from "react";
import {
  StepName,
  contribTypeToStepIdentifier,
} from "@/lib/types/onboarding/steps";
import { z } from "zod";
import ReferenceActivitiesCard from "./-activites";
import { onboardingStepSchema } from "@/schemas/onboarding";

type ContentState = Record<
  StepName,
  {
    contribution: z.infer<typeof contributionSchema> | undefined;
    step: z.infer<typeof onboardingStepSchema>;
  }
>;

const Component = () => {
  const { t } = useTranslation();
  const { data } = useSuspenseQuery({
    queryKey: queryKeys.REFERENCE_MY_CONTENT,
    queryFn: () => api.get("GET_ME_CONTRIBUTIONS", contributionsRequestSchema),
  });

  const contributions = useMemo(() => {
    if (!data.ok || (data.ok && !data.val.steps)) return {} as ContentState;

    return data.val.steps.reduce((acc, step) => {
      acc[step.identifier] = {
        step: step,
        contribution: data.val.contributions?.find(
          (contrib) =>
            contribTypeToStepIdentifier[contrib.type] === step.identifier,
        ),
      };

      return acc;
    }, {} as ContentState);
  }, [data]);

  if (!data?.ok) {
    return "Something went wrong.";
  }

  const { profile, addons } = data.val;

  return (
    <div className="flex flex-col gap-8">
      <PageTitle>{t("my_content")}</PageTitle>
      <Card variant="shadow" className="font-bold">
        <CardDescription className="flex gap-6 items-center">
          <p className="text-2xl">{t("influence")}</p>
          <Progress
            value={Number(profile.influenceLevel)}
            key="influence-progress"
          />{" "}
          <div className="text-xl flex items-center">
            {profile.influenceLevel}
            <span className="text-grey-400">/100</span>
          </div>
        </CardDescription>
      </Card>
      <ReferenceActivitiesCard addons={addons} />
      <Card variant="shadow">
        <CardDescription className="font-bold text-primary-dark flex flex-col gap-4">
          <p className="text-xl">{t("contributions")}</p>
        </CardDescription>
      </Card>
    </div>
  );
};

export const Route = createLazyFileRoute("/_reference/my-content/")({
  component: Component,
  pendingComponent: MyContentPending,
});
