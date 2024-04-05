import { ZodSchema, z } from "zod";
import { StepIdentifierEnum } from "../types/onboarding/steps";
import { onboardingStepSchema } from "@/schemas/onboarding";
import { endpoints } from "../endpoints";
import { api } from "../requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMoveToNextStep } from "@/routes/_onboarding/-utils";
import { queryKeys } from "../query";

export const onboardingPostResponseSchema = z.object({
  profile: z.object({
    influenceLevel: z.string(),
    rewardedAmount: z.number(),
  }),
  steps: z.array(onboardingStepSchema),
});

export default function useSaveOnboardingStep(
  stepName: StepIdentifierEnum,
  formSchema: ZodSchema,
) {
  const moveToNext = useMoveToNextStep();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      api
        .post(
          endpoints.CONTRIBUTION_STEP_PATH(stepName),
          onboardingPostResponseSchema,
          values,
        )
        .then((res) => {
          if (res.ok) {
            queryClient.setQueryData(
              queryKeys.CONTRIBUTION_STEP(stepName),
              (data: z.infer<typeof formSchema>) => ({
                ...data,
                ...values,
              }),
            );
          }

          return res;
        }),
    onSuccess: (val) => {
      if (val.ok) {
        queryClient.setQueryData(
          queryKeys.ONBOARD_STEPS,
          (data: z.infer<typeof onboardingPostResponseSchema>) => ({
            profile: {
              ...data.profile,
              ...val.val.profile,
            },
            steps: val.val.steps,
          }),
        );

        moveToNext();
      }
    },
  });
}
