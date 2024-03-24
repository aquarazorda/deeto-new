import { cn } from "@/lib/utils";
import { meetingStatusSchema } from "@/schemas/meetings";
import { z } from "zod";
import { MeetingCard } from "./-meeting-card";
import { Card, CardDescription } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useUser } from "@/lib/states/user";
import { useShallow } from "zustand/react/shallow";
import Avatar from "@/components/deeto/avatar";
import DeetoLogo from "@/assets/icons/deeto-logo.svg?react";
import { Skeleton } from "@/components/ui/skeleton";

type MeetingStatus = Exclude<
  z.infer<typeof meetingStatusSchema>["meetingStatus"],
  "error"
>;

export const dashboardColumns = {
  inProgress: {
    bgColor: "bg-primary-orange",
    textColor: "text-secondary-orange",
    numberBg: "bg-secondary-orange",
    emptyBg: "bg-yellow-pink",
  },
  stuck: {
    bgColor: "bg-tint-red",
    textColor: "text-secondary-red",
    numberBg: "bg-secondary-red",
    emptyBg: "bg-pink-blue",
  },
  scheduled: {
    bgColor: "bg-tint-blue",
    textColor: "text-secondary-blue",
    numberBg: "bg-secondary-blue",
    emptyBg: "bg-yellow-blue",
  },
  completed: {
    bgColor: "bg-primary-orange",
    textColor: "text-secondary-orange",
    numberBg: "bg-secondary-orange",
    emptyBg: "bg-blue-green",
  },
  viewed: {
    bgColor: "bg-tint-purple",
    textColor: "text-secondary-pink",
    numberBg: "bg-secondary-pink",
    emptyBg: "bg-yellow-pink",
  },
} as const;

const infoTextTypes = {
  vendor: {
    dashboard: {
      inProgress: "info_card.vendor.dashboard.inProgress",
      scheduled: "info_card.vendor.dashboard.scheduled",
      completed: "info_card.vendor.dashboard.completed",
      stuck: "info_card.vendor.dashboard.stuck",
      viewed: "info_card.vendor.dashboard.viewed",
    },
    prospectDashboard: {
      viewed: "info_card.vendor.prospectDashboard.viewed",
      inProgress: "info_card.vendor.prospectDashboard.inProgress",
      scheduled: "info_card.vendor.prospectDashboard.scheduled",
      completed: "info_card.vendor.prospectDashboard.completed",
      stuck: "info_card.vendor.prospectDashboard.stuck",
    },
  },
  reference: {
    dashboard: {
      inProgress: "info_card.reference.dashboard.inProgress",
      stuck: "info_card.reference.dashboard.stuck",
      scheduled: "info_card.reference.dashboard.scheduled",
      completed: "info_card.reference.dashboard.completed",
      viewed: "info_card.reference.dashboard.viewed",
    },
  },
};

const EmptyCard = ({
  type,
  meetingStatus,
}: {
  type: "dashboard" | "prospectDashboard";
  meetingStatus: MeetingStatus;
}) => {
  const { t } = useTranslation();
  const isVendor = useUser(useShallow((state) => state.me.isVendor));
  const selector = isVendor ? "vendor" : "reference";

  return (
    <Card
      className={cn(
        dashboardColumns[meetingStatus].emptyBg,
        "bg-cover bg-center",
      )}
    >
      <CardDescription className="flex gap-4 p-4">
        <Avatar className="bg-white">
          <DeetoLogo className="size-12 text-primary-dark" />
        </Avatar>
        <p className="flex flex-1 items-center text-base font-semibold leading-tight text-primary-dark">
          {/* @ts-ignore  */}
          {t(infoTextTypes[selector][type][meetingStatus])}
        </p>
      </CardDescription>
    </Card>
  );
};

export const DashboardColumn = ({
  meetingStatus,
  queueLabel,
  meetings,
  type,
}: z.infer<typeof meetingStatusSchema> & {
  type: "dashboard" | "prospectDashboard";
  meetingStatus: MeetingStatus;
}) => {
  const { textColor, numberBg, bgColor } = dashboardColumns[meetingStatus];

  return (
    <div className={cn("min-w-full space-y-4 p-4", bgColor)}>
      <span className="flex items-center justify-between">
        <p className={cn("text-inter text-2xl font-semibold", textColor)}>
          {queueLabel}
        </p>
        <div
          className={cn(
            "flex size-8 items-center justify-center rounded-100 px-2",
            numberBg,
          )}
        >
          {meetings.length}
        </div>
      </span>
      {meetings.length === 0 && (
        <EmptyCard type={type} meetingStatus={meetingStatus} />
      )}
      {meetings.map((meeting) => (
        <MeetingCard key={meeting.meetingId} meeting={meeting} />
      ))}
    </div>
  );
};

export const DashboardColumnSkeleton = ({
  meetingStatus,
}: {
  meetingStatus: MeetingStatus;
}) => {
  const { numberBg, bgColor } = dashboardColumns[meetingStatus];

  return (
    <div className={cn("min-w-full space-y-4 p-4", bgColor)}>
      <span className="flex items-center justify-between">
        <Skeleton className={cn("h-9 w-14", numberBg)} />
      </span>
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton
          className="h-24 w-full rounded-2xl rounded-tl-none bg-white"
          key={index}
        />
      ))}
    </div>
  );
};
