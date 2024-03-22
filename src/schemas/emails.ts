import { z } from "zod";

export const emailActivitySchema = z.object({
  emailActivityID: z.string().uuid(),
  vendorID: z
    .string()
    .uuid()
    .describe("Returns a Vendor ID  -todo:consider nesting"),
  eMailTemplate: z.string().describe("InviteAProspect"),
  sentTimeStamp: z.string().describe("2022-07-22T05:18:00.000Z"),
  toAddress: z.string().describe("idan+vendor@deeto.ai"),
  fromAddress: z.string().describe("noreply@deeto.ai"),
  subject: z.string().describe("Here are three references for you"),
});
