import { z } from "zod";
import { opportunitySchema } from "./references";

export const accountSchema = z.object({
  accountID: z.string().uuid().optional(),
  companyName: z.string().describe("Prospect Inc."),
  linkedInProfile: z
    .string()
    .nullable()
    .optional()
    .describe("https://www.linkedin.com/in/user/"),
  vendorId: z.string().describe("123e4567-e89b-12d3-a456-426614174000"),
  opportunities: z.array(opportunitySchema).optional(),
});
