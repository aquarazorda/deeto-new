import { z } from "zod";

export const authResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  destination: z.string(),
  withoutAuthenticatedUser: z.boolean(),
});
