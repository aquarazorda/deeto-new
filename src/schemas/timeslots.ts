import { z } from "zod";

export const scheduledTimeslotSchema = z.object({
  scheduledTimeSlotsID: z.string().uuid(),
  proposerID: z
    .string()
    .uuid()
    .describe("the contactAccountID of whoever proposed the timeslot."),
  duration: z.number().describe("in minutes"),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  status: z.enum(["suggested", "accepted"]),
  behavior: z.enum(["canAccept", "waiting"]),
});
