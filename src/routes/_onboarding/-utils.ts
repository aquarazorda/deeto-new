import useStepsData from "@/lib/queries/onboarding/useStepsData";
import { useMatches, useNavigate } from "@tanstack/react-router";

export const useMoveToNextStep = () => {
  const { data } = useStepsData();
  const navigate = useNavigate();
  const match = useMatches();
  const matches = match[match.length - 1].pathname.split("/");

  return () => {
    if (!data?.ok) return;
    const current = data.val.steps.findIndex(
      (step) => step.identifier === matches[matches.length - 1],
    );
    const next = data.val.steps[current + 1];
    console.log("/onboarding/" + next.identifier);

    navigate({ to: "/onboarding/" + next.identifier });
  };
};
