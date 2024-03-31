import { z } from "zod";

export const callLogSchema = z.object({
  callLogID: z.string().uuid(),
  participantID: z.string().uuid(),
  accountContactId: z.string().uuid(),
  event: z.string().describe("join"),
  timestamp: z.string().datetime(),
  channel: z.string().describe("zoom"),
});

export const callStatisticsSchema = z.object({
  callStatisticsId: z.string().uuid(),
  duration: z.number().describe("in minutes"),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  log: z.array(callLogSchema).optional(),
});

export const feedbackSchema = z.object({
  feedbackId: z.string().uuid(),
  reviewerId: z.string().uuid().describe("reference or prospect"),
  rateCall: z.number().min(1).max(5),
  goodMatch: z.string().describe("true"),
  helpful: z.string().describe("true"),
  followupAdditionalInformation: z.string().describe("true"),
  comment: z.string(),
  // accountContacts: accountContactSchema,
});
