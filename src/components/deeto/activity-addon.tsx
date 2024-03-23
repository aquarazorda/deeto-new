import { addonSchema } from "@/schemas/contributions";
import { Card, CardDescription } from "../ui/card";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

export const StoryAddonSkeleton = () => (
  <Card className="flex gap-4 items-center rounded-full min-h-14">
    <Skeleton className="size-9" />
    <Skeleton className="w-28 h-3" />
    <Skeleton className="ml-auto rounded-full bg-tint-purple size-9" />
  </Card>
);

export default function ActivityAddon({
  item,
  light,
}: {
  item?: z.infer<typeof addonSchema>;
  light?: boolean;
}) {
  const { t } = useTranslation();
  if (!item) return null;

  return (
    <Card
      className={"flex gap-4 items-center rounded-full min-h-14 text-inter"}
    >
      <img
        src={`/assets/onboarding/${item.type}${light ? "-light" : ""}.svg`}
      />
      <p
        className={cn(
          "text-semibold text-base",
          item.status && "text-grey-400",
        )}
      >
        {item.label ?? t(`360_addon_${item.type}_title`)}
      </p>
      <div
        className={cn(
          "rounded-full size-9 bg-tint-purple flex items-center justify-center ml-auto",
          item.status && "bg-secondary-green",
        )}
      >
        <CheckIcon className="text-white" />
      </div>
    </Card>
  );
}
