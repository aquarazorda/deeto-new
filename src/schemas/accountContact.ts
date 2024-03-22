import { z } from "zod";
import { authenticatedUserSchema } from "./authenticated-user";
import { customizedFormValue } from "./customized-form";

export const accountContactSchema = z.object({
  title: z.string().nullable().optional(),
  publicNote: z.string().nullable().optional(),
  publicNoteAiResults: z.string().nullable().optional(),
  publicNoteUserInput: z.string().nullable().optional(),
  selectedReviewQuote: z.string().nullable().optional(),
  often: z.string().nullable().optional(),
  linkedInProfile: z.string().nullable().optional(),
  frequency: z.number().min(0).max(100).optional(),
  availabilitySuspensionReason: z.string().nonempty().nullable().optional(),
  adminId: z.string().uuid().optional(),
  authenticatedUser: authenticatedUserSchema.optional(),
  customizedFormValues: z.array(customizedFormValue).optional(),
  account: z
    .object({
      companyName: z.string(),
    })
    .optional(),
});
