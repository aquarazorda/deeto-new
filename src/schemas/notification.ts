import { z } from "zod";

export const notificationSchema = z.object({
  notificationID: z.string().uuid(),
  heading: z.string(),
  caption: z.string(),
  timestamp: z.string().describe("UTF+5"),
  markAsRead: z.boolean(),
  callToAction: z.string(),
  contextClassName: z.string(),
  contextId: z.string(),
});
