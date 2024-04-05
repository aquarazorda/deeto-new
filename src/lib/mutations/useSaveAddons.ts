import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "../requests";
import { endpoints } from "../endpoints";
import { addonsEnum } from "@/schemas/onboarding";
import { onboardingPostResponseSchema } from "./useSaveOnboardingStep";

export const saveAddonsBodySchema = z.record(
  addonsEnum,
  z.boolean().or(z.number()),
);

export default function saveAddons() {
  return useMutation({
    mutationKey: ["saveAddons"],
    mutationFn: api.post_(
      endpoints.CONTRIBUTION_STEP_PATH("addOns"),
      onboardingPostResponseSchema,
    ),
  });
}
