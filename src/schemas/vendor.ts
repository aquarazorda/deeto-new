import { z } from "zod";
import { authenticatedUserSchema } from "./authenticated-user";

export const vendorContactSchema = z.object({
  vendorContactsID: z.string().uuid(),
  title: z.string(),
  authenticatedUser: authenticatedUserSchema,
  sendEmailOnBehalf: z.enum(["verified", "notVerified"]),
});

export const vendorSchema = z.object({
  vendorID: z.string().uuid(),
  name: z.string(),
  accountLevel: z.enum(["trial", "notActivated", "activated"]),
  defaultCreditAmountPerMeeting: z.number(),
  activationDate: z.string().datetime(),
  appLogo: z.object({
    url: z.string().url().optional(),
  }),
});
