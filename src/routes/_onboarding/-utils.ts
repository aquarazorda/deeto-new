import useStepsData from "@/lib/queries/onboarding/useStepsData";
import { useMatches, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";

export const useCurrentStepIndex = () => {
  const match = useMatches();
  const matches = match[match.length - 1].pathname.split("/");
  const { data } = useStepsData();

  if (!data.ok) {
    return undefined;
  }

  return useMemo(
    () =>
      data.val.steps.findIndex(
        (step) => step.identifier === matches[matches.length - 1],
      ),
    [data.val.steps, matches],
  );
};

export const useMoveToNextStep = () => {
  const navigate = useNavigate();
  const { data } = useStepsData();
  const current = useCurrentStepIndex();

  return () => {
    if (!data?.ok || current === undefined) return;
    const next = data.val.steps[current + 1];

    navigate({ to: "/onboarding/" + next.identifier });
  };
};
