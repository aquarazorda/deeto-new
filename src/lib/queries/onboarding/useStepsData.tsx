import { endpoints } from "@/lib/endpoints";
import { queryKeys } from "@/lib/query";
import { api } from "@/lib/requests";
import { onboardingStepSchema } from "@/schemas/onboarding";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const stepsSchema = z.object({
  profile: z.object({
    companyName: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    influenceLevel: z.string(),
    rewardedAmount: z.number(),
    title: z.string(),
  }),
  steps: z.array(onboardingStepSchema),
});

export default function useStepsData() {
  return useQuery({
    queryKey: queryKeys.ONBOARD_STEPS,
    queryFn: () => api.get(endpoints.CONTRIBUTION_STEPS_PATH, stepsSchema),
  });
}
