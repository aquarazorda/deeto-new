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
  status: z.enum(["finished", "skipped", "hidden", "notStarted"]),
  rewards: rewardSchema.optional(),
});

const frequencyOptionSchema = z.object({
  title: z.string(),
  value: z.number(),
});

const frequencyOptionsSchema = z.object({
  frequency: z.number(),
  frequencyOptions: z.array(frequencyOptionSchema),
});

export const addonsEnum = z.enum([
  "Frequency",
  "Webinars",
  "PublicSpeaking",
  "ProductFeedback",
  "SocialPresence",
  "RoundTable",
  "Podcast",
  "FirstToKnow",
  "InterViews",
  "CollaborationNewProducts",
  "AdvisoryBoard",
]);

export const onboardingAddonSchema = z.object({
  type: addonsEnum,
  rewardAmount: z.number(),
  isSelected: z.boolean(),
  options: frequencyOptionsSchema.optional(),
});
