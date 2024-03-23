import { useTranslation } from "react-i18next";
import { z } from "zod";
import { createFileRoute } from "@tanstack/react-router";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { queryKeys } from "@/lib/query";
import { api } from "@/lib/requests";
import { meetingStatusSchema } from "@/schemas/meetings";
import { DashboardColumn } from "./-column";
import { Suspense } from "react";
import DashboardAnalytics, { DashboardAnalyticsSkeleton } from "./-analytics";

function ReferenceMainRoute() {
  const data = Route.useLoaderData();
  const { t } = useTranslation();

  if (!data.ok) {
    return <div>Failed to load data</div>;
  }

  return (
    <div className="relative flex flex-col gap-6 overflow-hidden">
      <h1 className="text-5xl font-bold text-primary">{t("dashboard")}</h1>
      <ScrollArea className="h-[60vh] w-full">
        <div>
          <div className="grid h-[60vh] auto-cols-[minmax(22.5rem,_36.25rem)] grid-flow-col gap-2">
            {data.val.queuesMeetingStatuses.map((item) => (
              <DashboardColumn key={item.meetingStatus} {...item} />
            ))}
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Suspense fallback={<DashboardAnalyticsSkeleton />}>
        <DashboardAnalytics />
      </Suspense>
    </div>
  );
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

export const Route = createFileRoute("/_reference/dashboard/")({
  component: ReferenceMainRoute,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: [queryKeys.REFERENCE_DASHBOARD],
      queryFn: () => api.get("DASHBOARD_PATH", dashboardSchema),
    }),
});
