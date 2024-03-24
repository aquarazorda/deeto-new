import { Spinner } from "@/components/loaders/spinner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupLabel,
} from "@/components/ui/radio-group";
import { endpoints } from "@/lib/endpoints";
import { queryKeys } from "@/lib/query";
import { api } from "@/lib/requests";
import { onboardingAddonSchema } from "@/schemas/onboarding";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon, XIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export default function EditActivitiesDialogContent() {
  const { t } = useTranslation();
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.CONTRIBUTION_STEP_ADDONS,
    queryFn: () =>
      api.get(
        endpoints.CONTRIBUTION_STEP_PATH("addOns"),
        z.object({ addOns: z.array(onboardingAddonSchema) }),
      ),
  });

  if (isLoading) {
    return (
      <DialogContent>
        <Spinner />
      </DialogContent>
    );
  }

  if (!data?.ok) {
    return <DialogContent>Something went wrong</DialogContent>;
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {t("edit")} {t("addons")}
        </DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <div className="space-y-4">
          {data.val.addOns.map(({ type, isSelected, options }) => (
            <Card borders="full" key={type} className="p-6">
              <div className="text-inter space-y-4">
                <div className="flex gap-2 text-xl font-semibold">
                  <img src={`/assets/onboarding/${type}.svg`} />
                  {t(`360_addon_${type}_title`)}
                </div>
                <div className="text-primary- flex">
                  {t(`360_addon_${type}_description`)}
                  {!options && (
                    <Button
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      className="mt-auto"
                    >
                      {t("360_addon_interested")}{" "}
                      {isSelected ? (
                        <XIcon className="size-4" />
                      ) : (
                        <PlusIcon className="size-4" />
                      )}
                    </Button>
                  )}
                </div>
                {options?.frequencyOptions && (
                  <RadioGroup
                    className="grid grid-cols-2 grid-rows-3"
                    defaultValue={String(options.frequency)}
                  >
                    {options.frequencyOptions.map(({ title, value }) => (
                      <div className="flex items-center space-x-2" key={value}>
                        <RadioGroupItem value={String(value)} id={title} />
                        <RadioGroupLabel htmlFor={title}>
                          {title}
                        </RadioGroupLabel>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </div>
            </Card>
          ))}
        </div>
      </DialogDescription>
      <DialogFooter>
        <Button>{t("update")}</Button>
      </DialogFooter>
    </DialogContent>
  );
}
