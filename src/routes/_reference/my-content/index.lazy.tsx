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
import ContributionCard from "@/components/deeto/contribution-card";
import { endpoints } from "@/lib/endpoints";

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
    queryFn: () =>
      api.get(endpoints.GET_ME_CONTRIBUTIONS, contributionsRequestSchema),
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
        <CardDescription className="flex items-center gap-6">
          <p className="text-2xl">{t("influence")}</p>
          <Progress
            value={Number(profile.influenceLevel)}
            key="influence-progress"
          />{" "}
          <div className="flex items-center text-xl">
            {profile.influenceLevel}
            <span className="text-grey-400">/100</span>
          </div>
        </CardDescription>
      </Card>
      <ReferenceActivitiesCard addons={addons} />
      <Card variant="shadow">
        <CardDescription className="flex flex-col gap-4 font-bold text-primary-dark">
          <p className="text-xl">{t("contributions")}</p>
          <div className="grid grid-cols-2 gap-4">
            <ContributionCard
              contribution={contributions.videoTestimonial.contribution}
              step={contributions.videoTestimonial.step}
            />
            <ContributionCard
              contribution={contributions.userStory.contribution}
              step={contributions.userStory.step}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <ContributionCard
              contribution={contributions.quote.contribution}
              step={contributions.quote.step}
            />
            <ContributionCard
              contribution={contributions.review.contribution}
              step={contributions.review.step}
            />
            <ContributionCard
              contribution={contributions.questionsAndAnswers.contribution}
              step={contributions.questionsAndAnswers.step}
            />
          </div>
        </CardDescription>
      </Card>
    </div>
  );
};

export const Route = createLazyFileRoute("/_reference/my-content/")({
  component: Component,
  pendingComponent: MyContentPending,
});
