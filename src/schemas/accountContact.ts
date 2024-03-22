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
  accountContactID: z.string().uuid(),
  title: z.string().describe("CTO of Zoom"),
  publicNote: z
    .string()
    .describe("We selected Shayne as a reference because..."),
  selectedReviewQuote: z
    .string()
    .describe("I love working with LabGroup they were punctual with execution"),
  often: z.string().describe("6months"),
  linkedInProfile: z.string(),
  frequency: z.number(),
  redeemableAmount: z.number(),
  infoTab: z.array(infoTabSchema),
  redemption: z.array(redemptionSchema),
  zoomVisits: z.any(),
  callLog: z.array(callLogSchema),
  opportunities: z.array(opportunitySchema),
  recommendedReferences: z.array(recommendedReferenceSchema),
  meetingFeedbacks: z.any(),
  referenceMeetings: z.array(meetingSchema),
  prospectMeetings: z.array(meetingSchema),
  MeetingAvailabilities: z
    .any()
    .describe("TODO - Add MeetingAvailabilities definition"),
  authenticatedUserId: z.string().uuid(),
  adminID: z
    .string()
    .uuid()
    .describe(
      "The vendorContactID who either added the reference or currently own the relationship",
    ),
  admin: vendorContactSchema,
  accountID: z.string().uuid(),
  account: accountSchema,
  customizedFormValues: z.array(customizedFormValueSchema),
  notifications: z.array(notificationSchema),
});
