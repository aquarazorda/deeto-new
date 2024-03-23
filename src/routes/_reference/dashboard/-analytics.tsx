import { VendorSettingsCurrency } from "@/components/deeto/currency/vendor-custom-currency";
import { Card, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { queryKeys } from "@/lib/query";
import { api } from "@/lib/requests";
import { cn } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const statisticsSchema = z.array(
  z.object({
    title: z.string(),
    value: z.coerce.string(),
    style: z.enum(["default", "blue"]),
    showCurrency: z.boolean().optional(),
  }),
);

const Wrapper = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <h2 className="text-primary-dark text-2xl font-bold">
        {t("statistics")}
      </h2>
      <div className="grid grid-flow-col gap-2 py-2 auto-cols-[minmax(16.25rem,_27.5rem)]">
        {children}
      </div>
    </div>
  );
};

export default function DashboardAnalytics() {
  const { data } = useSuspenseQuery({
    queryKey: [queryKeys.REFERENCE_DASHBOARD_STATISTICS],
    queryFn: () => api.get("STATISTIC_DASHBOARD", statisticsSchema),
  });

  if (!data.ok) return null;

  return (
    <Wrapper>
      {data.val.map(({ value, showCurrency, title, style }) => (
        <Card
          key={title}
          className={cn(
            "text-secondary-blue min-w-48",
            style === "blue" && "bg-yellow-blue bg-cover bg-center text-white",
          )}
        >
          <CardDescription className="flex flex-col gap-2 pt-2 p-4">
            <div className="flex items-center gap-1">
              {showCurrency && <VendorSettingsCurrency prefix size={24} />}
              <h2 className="text-3xl font-semibold">{value}</h2>
              {showCurrency && <VendorSettingsCurrency postfix size={24} />}
            </div>
            <p className="font-bold text-inter text-lg">{title}</p>
          </CardDescription>
        </Card>
      ))}
    </Wrapper>
  );
}

export function DashboardAnalyticsSkeleton() {
  return (
    <Wrapper>
      {Array.from({ length: 4 }).map((_, i) => (
        <Card
          key={i}
          className="pt-2 p-4 min-w-48"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.1) 0px 0.25rem 0.375rem -0.0625rem, rgba(0, 0, 0, 0.05) 0px 0.125rem 0.25rem -0.125rem",
          }}
        >
          <CardDescription className="space-y-2">
            <div className="flex items-center gap-1">
              <h2>
                <Skeleton className="size-10 bg-tint-blue" />
              </h2>
              <VendorSettingsCurrency postfix size={24} />
            </div>
            <Skeleton className="h-8 w-60 bg-tint-blue" />
          </CardDescription>
        </Card>
      ))}
    </Wrapper>
  );
}
