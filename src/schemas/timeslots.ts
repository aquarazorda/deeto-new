import { z } from "zod";

export const scheduledTimeslotSchema = z.object({
  scheduledTimeSlotId: z.string().uuid(),
  duration: z.number().describe("in minutes"),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  status: z.enum(["suggested", "accepted", "passed"]),
  behavior: z.enum(["canAccept", "waiting"]).optional(),
});
