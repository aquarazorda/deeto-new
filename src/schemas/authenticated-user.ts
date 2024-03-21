import { z } from "zod";

export const authenticatedUserSchema = z.object({
  username: z.string().min(0).max(100).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  preferredTimezone: z.string().nullable().optional(),
  profilePicture: z
    .object({
      type: z.string().optional(),
      url: z.string().optional(),
    })
    .strict()
    .optional(),
  userStatus: z.string().optional(),
});
