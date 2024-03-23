import { StepIdentifierEnum, StepNameEnum } from "@/lib/types/onboarding/steps";
import { z } from "zod";

const rewardSchema = z.object({
  getRewardsForSubmit: z.boolean().optional(),
  getRewardsForView: z.boolean(),
  getRewardsForApprove: z.boolean().optional(),
  submit: z.number().optional(),
  view: z.number(),
  approve: z.number().optional(),
  rewardedForSubmit: z.boolean().optional(),
});

export const onboardingStepSchema = z.object({
  identifier: z.nativeEnum(StepIdentifierEnum),
  name: z.nativeEnum(StepNameEnum).or(z.enum(["Activities", "G2 Review"])),
  status: z.enum(["finished", "skipped", "hidden"]),
  rewards: rewardSchema.optional(),
});
