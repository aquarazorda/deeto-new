import { z } from "zod";
import { emailActivitySchema } from "./emails";

export const recommendedReferenceSchema = z.object({
  recommendedReferenceID: z.string().uuid(),
  referenceID: z
    .string()
    .uuid()
    .describe("Returns a ContactAccount ID (of the reference)"),
  recommendationLevel: z.number(),
  isSelected: z.boolean(),
  meetingID: z
    .string()
    .uuid()
    .describe("Returns a Meeting ID  -todo:consider nesting"),
  personalEmailQuote: z.string(),
});

export const opportunitySchema = z.object({
  opportunityID: z.string().uuid(),
  OpportunityBudget: z.number(),
  ownerID: z.string().uuid().describe("Returns a VendorContacts ID"),
  accountID: z
    .string()
    .uuid()
    .describe("Returns a Account ID (of the prospect)"),
  accountContactID: z
    .string()
    .uuid()
    .describe("Returns a ContactAccount ID (of the prospect)"),
  recommendedReferences: z.array(recommendedReferenceSchema),
  emailActivity: z.array(emailActivitySchema),
});
