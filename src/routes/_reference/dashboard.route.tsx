import { queryKeys } from "@/lib/query";
import { api } from "@/lib/requests";
import { meetingStatusSchema } from "@/schemas/meetings";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

function ReferenceMainRoute() {
  return <div className="p-4">I'm a ref</div>;
}

const dashboardSchema = z.object({
  bannerInfo: z
    .object({
      bannerMessage: z.string(),
      bannerType: z.string(),
    })
    .optional(),
  topReferences: z.nullable(z.any()).optional(),
  queuesMeetingStatuses: z.array(meetingStatusSchema),
});

export const Route = createFileRoute("/_reference/dashboard")({
  component: ReferenceMainRoute,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: [queryKeys.REFERENCE_DASHBOARD],
      queryFn: () => api.get("DASHBOARD_PATH", dashboardSchema),
    }),
});
