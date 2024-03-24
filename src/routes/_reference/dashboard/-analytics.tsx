import { VendorSettingsCurrency } from "@/components/deeto/currency/vendor-custom-currency";
import { Card, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { endpoints } from "@/lib/endpoints";
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
      <h2 className="text-2xl font-bold text-primary-dark">
        {t("statistics")}
      </h2>
      <div className="grid auto-cols-[minmax(16.25rem,_27.5rem)] grid-flow-col gap-2 py-2">
        {children}
      </div>
    </div>
  );
};

export default function DashboardAnalytics() {
  const { data } = useSuspenseQuery({
    queryKey: [queryKeys.REFERENCE_DASHBOARD_STATISTICS],
    queryFn: () => api.get(endpoints.STATISTIC_DASHBOARD, statisticsSchema),
  });

  if (!data.ok) return null;

  return (
    <Wrapper>
      {data.val.map(({ value, showCurrency, title, style }) => (
        <Card
          key={title}
          variant="shadow"
          className={cn(
            "min-w-48 text-secondary-blue",
            style === "blue" && "bg-yellow-blue bg-cover bg-center text-white",
          )}
        >
          <CardDescription className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              {showCurrency ? (
                <VendorSettingsCurrency>
                  <h2 className="text-3xl font-semibold">{value}</h2>
                </VendorSettingsCurrency>
              ) : (
                <h2 className="text-3xl font-semibold">{value}</h2>
              )}
            </div>
            <p className="text-inter text-lg font-bold">{title}</p>
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
          className="min-w-48 p-4 pt-2"
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
            </div>
            <Skeleton className="h-8 w-60 bg-tint-blue" />
          </CardDescription>
        </Card>
      ))}
    </Wrapper>
  );
}
