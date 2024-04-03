import { endpoints } from "@/lib/endpoints";
import { queryKeys } from "@/lib/query";
import { api } from "@/lib/requests";
import { onboardingStepSchema } from "@/schemas/onboarding";
import { useSuspenseQuery } from "@tanstack/react-query";
import { z } from "zod";

export const stepsSchema = z.object({
  profile: z.object({
    companyName: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    influenceLevel: z.string(),
    rewardedAmount: z.number(),
    title: z.string().optional(),
  }),
  steps: z.array(onboardingStepSchema),
});

export default function useStepsData() {
  return useSuspenseQuery({
    queryKey: queryKeys.ONBOARD_STEPS,
    queryFn: () => api.get(endpoints.CONTRIBUTION_STEPS_PATH, stepsSchema),
  });
}
