import { useTranslation } from "react-i18next";
import { z } from "zod";
import { createLazyFileRoute } from "@tanstack/react-router";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { queryKeys } from "@/lib/query";
import { api } from "@/lib/requests";
import { meetingStatusSchema } from "@/schemas/meetings";
import {
  DashboardColumn,
  DashboardColumnSkeleton,
  dashboardColumns,
} from "./-column";
import { ReactNode, Suspense } from "react";
import DashboardAnalytics, { DashboardAnalyticsSkeleton } from "./-analytics";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, objectKeys } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import PageTitle from "@/components/deeto/text/page-title";

function Wrapper({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  return (
    <div className="relative flex flex-col gap-6 overflow-hidden">
      <PageTitle>{t("dashboard")}</PageTitle>
      <ScrollArea className="h-[60vh] w-full">
        <div>
          <div className="grid h-[60vh] auto-cols-[minmax(22.5rem,_36.25rem)] grid-flow-col gap-2">
            <Suspense fallback={<ReferenceDashboardPending />}>
              {children}
            </Suspense>
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

function ReferenceMainRoute() {
  const { data } = useSuspenseQuery({
    queryKey: [queryKeys.REFERENCE_DASHBOARD],
    queryFn: () => api.get("DASHBOARD_PATH", dashboardSchema),
  });

  if (!data.ok) {
    return <div>Failed to load data</div>;
  }

  return (
    <Wrapper>
      {data.val.queuesMeetingStatuses.map((item) => {
        if (item.meetingStatus === "error") return null;

        return (
          // @ts-expect-error
          <DashboardColumn
            type="dashboard"
            key={item.meetingStatus}
            {...item}
          />
        );
      })}
    </Wrapper>
  );
}

function ReferenceDashboardPending() {
  return (
    <Wrapper>
      {objectKeys(dashboardColumns).map((key) => (
        <Skeleton key={key} className={cn(dashboardColumns[key].bgColor)}>
          <DashboardColumnSkeleton meetingStatus={key} />
        </Skeleton>
      ))}
    </Wrapper>
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

export const Route = createLazyFileRoute("/_reference/dashboard/")({
  component: ReferenceMainRoute,
  pendingComponent: ReferenceDashboardPending,
});
