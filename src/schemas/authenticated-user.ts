import { z } from "zod";

export const avatarSchema = z.object({
  type: z.enum(["default", "initial", "picture"]),
  url: z.string().url().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const userStatusSchema = z.enum(["confirmed", "pending", "locked"]);

export const authenticatedUserSchema = z.object({
  authenticatedUserId: z.string().uuid(),
  username: z.string().nullable(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  userStatus: userStatusSchema,
  privileges: z.array(z.string().describe("reference")).optional(),
  profilePicture: avatarSchema.optional(),
  redeemableBalance: z.number().optional(),
  preferredTimezone: z.string().describe("UTC+5"),
});
