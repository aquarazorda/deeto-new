import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "../requests";
import { endpoints } from "../endpoints";
import { addonsEnum, onboardingStepSchema } from "@/schemas/onboarding";

export const saveAddonsBodySchema = z.record(
  addonsEnum,
  z.boolean().or(z.number()),
);

const responseSchema = z.object({
  profile: z.object({
    influenceLevel: z.string(),
    rewardedAmount: z.number(),
  }),
  steps: z.array(onboardingStepSchema),
});

export default function saveAddons() {
  return useMutation({
    mutationKey: ["saveAddons"],
    mutationFn: api.post_(
      endpoints.CONTRIBUTION_STEP_PATH("addOns"),
      responseSchema,
    ),
  });
}
