import { z } from "zod";
import { accountContactSchema } from "./accountContact";

export const callLogSchema = z.object({
  callLogID: z.string().uuid(),
  participantID: z.string().uuid(),
  accountContactID: z.string().uuid(),
  event: z.string().describe("join"),
  timestamp: z.string().datetime(),
  channel: z.string().describe("zoom"),
});

export const callStatisticsSchema = z.object({
  callStatisticsID: z.string().uuid(),
  duration: z.number().describe("in minutes"),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  log: z.array(callLogSchema),
});

export const feedbackSchema = z.object({
  feedbackID: z.string().uuid(),
  reviewerID: z.string().uuid().describe("reference or prospect"),
  rateCall: z.number().min(1).max(5),
  goodMatch: z.string().describe("true"),
  helpful: z.string().describe("true"),
  followupAdditionalInformation: z.string().describe("true"),
  comment: z.string(),
  accountContacts: accountContactSchema,
});
