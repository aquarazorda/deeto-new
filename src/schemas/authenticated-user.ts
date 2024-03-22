import { z } from "zod";

export const avatarSchema = z.object({
  type: z.enum(["default", "initial", "picture"]),
  url: z.string().url().optional(),
});

export const authenticatedUserSchema = z.object({
  authenticatedUserID: z.string().uuid(),
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  userStatus: z
    .enum(["confirmed", "pending", "locked"])
    .describe("User Status"),
  privileges: z.array(z.string().describe("reference")),
  profilePicture: avatarSchema,
  redeemableBalance: z.number(),
  preferredTimezone: z.string().describe("UTC+5"),
});
