import { z } from "zod";
import { accountSchema } from "./account";
import { authenticatedUserSchema } from "./authenticated-user";
import { emailActivitySchema } from "./emails";
import { callStatisticsSchema } from "./statistics";
import { scheduledTimeslotSchema } from "./timeslots";

export const meetingStageStatusSchema = z.enum([
  "completed",
  "inProgress",
  "scheduled",
  "stuck",
]);

export const meetingStagesSchema = z.object({
  label: z.string().describe("Invited"),
  status: meetingStageStatusSchema,
});

export const meetingSchema = z.object({
  meetingId: z.string().uuid(),
  opportunityId: z
    .string()
    .uuid()
    .optional()
    .describe("assigned to an opportunity"),
  initiatorId: z
    .string()
    .uuid()
    .optional()
    .describe("this is an AccountVendor ID"),
  prospectContactId: z.string().uuid().optional(),
  referenceContactId: z.string().uuid().optional(),
  referenceAccountId: z.string().uuid().optional(),
  vendorAggregatedStage: meetingStageStatusSchema,
  emailActivity: z.array(emailActivitySchema).optional(),
  stage: z.array(meetingStagesSchema),
  scheduledTimeSlots: z.array(scheduledTimeslotSchema).optional(),
  callStatistics: z.array(callStatisticsSchema).optional(),
  prospectContact: z.object({
    title: z.string(),
    account: accountSchema,
    tags: z.array(z.string()),
    authenticatedUser: authenticatedUserSchema,
  }),

  // feedback: z.array(feedbackSchema),
});

export const meetingStatusSchema = z.object({
  queueOrder: z.number(),
  queueLabel: z.string(),
  meetingStatus: meetingStageStatusSchema,
  meetings: z.array(meetingSchema),
});
