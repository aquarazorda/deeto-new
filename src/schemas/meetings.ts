import { z } from "zod";
import { emailActivitySchema } from "./emails";
import { scheduledTimeslotSchema } from "./timeslots";
import { callStatisticsSchema } from "./statistics";

export const meetingStagesSchema = z.object({
  label: z.string().describe("Invited"),
  status: z.enum(["completed", "inProgress", "notStarted", "error"]),
});

export const meetingSchema = z.object({
  meetingID: z.string().uuid().optional(),
  opportunityID: z
    .string()
    .uuid()
    .optional()
    .describe("assigned to an opportunity"),
  initiatorID: z
    .string()
    .uuid()
    .optional()
    .describe("this is an AccountVendor ID"),
  prospectContactID: z.string().uuid().optional(),
  referenceContactID: z.string().uuid().optional(),
  referenceAccountID: z.string().uuid().optional(),
  aggregateStage: z
    .enum(["invited", "accepted", "scheduled", "live", "stuck", "completed"])
    .optional(),
  emailActivity: z.array(emailActivitySchema).optional(),
  stages: z.array(meetingStagesSchema).optional(),
  scheduledTimeSlot: z.array(scheduledTimeslotSchema).optional(),
  callStatistics: z.array(callStatisticsSchema),
  // feedback: z.array(feedbackSchema),
});

export const meetingStatusSchema = z.object({
  meetingStatus: z.enum([
    "invited",
    "accepted",
    "scheduled",
    "live",
    "rescheduled",
    "completed",
    "inProgress",
    "stuck",
  ]),
  meetings: z.array(meetingSchema),
});
