import { cn } from "@/lib/utils";
import { meetingStatusSchema } from "@/schemas/meetings";
import { z } from "zod";
import { MeetingCard } from "./-meeting-card";

const columns = {
  inProgress: {
    bgColor: "bg-primary-orange",
    textColor: "text-secondary-orange",
    numberBg: "bg-secondary-orange",
  },
  stuck: {
    bgColor: "bg-tint-red",
    textColor: "text-secondary-red",
    numberBg: "bg-secondary-red",
  },
  scheduled: {
    bgColor: "bg-tint-blue",
    textColor: "text-secondary-blue",
    numberBg: "bg-secondary-blue",
  },
  completed: {
    bgColor: "bg-primary-orange",
    textColor: "text-secondary-orange",
    numberBg: "bg-secondary-orange",
  },
};

export const DashboardColumn = ({
  meetingStatus,
  queueLabel,
  meetings,
}: z.infer<typeof meetingStatusSchema>) => {
  const { textColor, numberBg, bgColor } = columns[meetingStatus];

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
      {meetings.map((meeting) => (
        <MeetingCard key={meeting.meetingId} meeting={meeting} />
      ))}
    </div>
  );
};
