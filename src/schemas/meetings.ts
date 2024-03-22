import { z } from "zod";
import { emailActivitySchema } from "./emails";
import { scheduledTimeslotSchema } from "./timeslots";
import { callStatisticsSchema } from "./statistics";

export const meetingStagesSchema = z.object({
  label: z.string().describe("Invited"),
  status: z.enum(["completed", "inProgress", "notStarted", "error"]),
});

export const meetingSchema = z.object({
  meetingID: z.string().uuid(),
  opportunityID: z.string().uuid().describe("assigned to an opportunity"),
  initiatorID: z.string().uuid().describe("this is an AccountVendor ID"),
  prospectContactID: z.string().uuid(),
  referenceContactID: z.string().uuid(),
  referenceAccountID: z.string().uuid(),
  aggregateStage: z.enum([
    "invited",
    "accepted",
    "scheduled",
    "live",
    "stuck",
    "completed",
  ]),
  emailActivity: z.array(emailActivitySchema),
  stages: z.array(meetingStagesSchema),
  scheduledTimeSlot: z.array(scheduledTimeslotSchema),
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
  ]),
  meetings: z.array(meetingSchema),
});
