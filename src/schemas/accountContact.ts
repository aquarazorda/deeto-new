import { z } from "zod";
import { customizedFormValueSchema } from "./customized-form";
import { meetingSchema } from "./meetings";
import { callLogSchema } from "./statistics";
import { vendorContactSchema } from "./vendor";
import { notificationSchema } from "./notification";
import { accountSchema } from "./account";
import { opportunitySchema, recommendedReferenceSchema } from "./references";

export const redemptionSchema = z.object({
  redemptionID: z.string().uuid(),
  amount: z.number(),
  timestamp: z.string().datetime(),
  channel: z.string().describe("Amazon"),
});

export const infoTabSchema = z.object({
  title: z.string().describe("Number of employees"),
  value: z.string().describe("50-100"),
});

export const accountContactSchema = z.object({
  accountContactID: z.string().uuid().optional(),
  title: z.string().describe("CTO of Zoom"),
  publicNote: z
    .string()
    .nullable()
    .describe("We selected Shayne as a reference because..."),
  selectedReviewQuote: z
    .string()
    .nullable()
    .describe("I love working with LabGroup they were punctual with execution"),
  often: z.string().nullable().describe("6months"),
  linkedInProfile: z.string().nullable(),
  frequency: z.number(),
  redeemableAmount: z.number(),
  infoTab: z.array(infoTabSchema).optional(),
  redemption: z.array(redemptionSchema).optional(),
  zoomVisits: z.any(),
  callLog: z.array(callLogSchema).optional(),
  opportunities: z.array(opportunitySchema).optional(),
  recommendedReferences: z.array(recommendedReferenceSchema).optional(),
  meetingFeedbacks: z.any(),
  referenceMeetings: z.array(meetingSchema).optional(),
  prospectMeetings: z.array(meetingSchema).optional(),
  MeetingAvailabilities: z
    .any()
    .describe("TODO - Add MeetingAvailabilities definition"),
  authenticatedUserId: z.string().uuid(),
  adminID: z
    .string()
    .uuid()
    .optional()
    .describe(
      "The vendorContactID who either added the reference or currently own the relationship",
    ),
  admin: vendorContactSchema.optional(),
  accountID: z.string().uuid().optional(),
  account: accountSchema,
  customizedFormValues: z.array(customizedFormValueSchema),
  notifications: z.array(notificationSchema).optional(),
});
