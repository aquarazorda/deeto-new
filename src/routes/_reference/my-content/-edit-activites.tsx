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
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  RadioGroup,
  RadioGroupItem,
  RadioGroupLabel,
} from "@/components/ui/radio-group";
import { endpoints } from "@/lib/endpoints";
import useSaveAddons, {
  saveAddonsBodySchema,
} from "@/lib/mutations/useSaveAddons";
import { queryKeys } from "@/lib/query";
import { api } from "@/lib/requests";
import { onboardingAddonSchema } from "@/schemas/onboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon, XIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";

export default function EditActivitiesDialogContent({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useSaveAddons();
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.CONTRIBUTION_STEP_ADDONS,
    queryFn: () =>
      api.get(
        endpoints.CONTRIBUTION_STEP_PATH("addOns"),
        z.object({ addOns: z.array(onboardingAddonSchema) }),
      ),
  });

  const form = useForm<z.infer<typeof saveAddonsBodySchema>>({
    resolver: zodResolver(saveAddonsBodySchema),
  });

  useEffect(() => {
    if (data?.ok) {
      const defaultValues = data.val.addOns.reduce(
        (acc, { type, options, isSelected }) => {
          if (options && options.frequency) {
            acc[type] = options.frequency;
            return acc;
          }

          acc[type] = isSelected;
          return acc;
        },
        {} as z.infer<typeof saveAddonsBodySchema>,
      );

      form.reset(defaultValues);
    }
  }, [data]);

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

  const onSubmit = async (values: z.infer<typeof saveAddonsBodySchema>) => {
    const res = await mutateAsync(values);

    if (res.ok) {
      toast.success(t("activities_successfully_updated"));
      closeDialog();
      return;
    }

    toast.error("Something went wrong");
  };

  return (
    <Form {...form}>
      <DialogContent className="p-0">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative grid gap-6 p-10 px-6 pb-0"
        >
          <DialogHeader>
            <DialogTitle>
              {t("edit")} {t("addons")}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="space-y-4">
              {data.val.addOns.map(({ type, options }) => (
                <Card borders="full" key={type} className="p-6">
                  <div className="text-inter space-y-4">
                    <div className="flex gap-2 text-xl font-semibold">
                      <img src={`/assets/onboarding/${type}.svg`} />
                      {t(`360_addon_${type}_title`)}
                    </div>
                    <div className="text-primary- flex">
                      {t(`360_addon_${type}_description`)}
                      {!options && (
                        <FormField
                          control={form.control}
                          name={type}
                          render={({ field }) => (
                            <FormControl>
                              <Button
                                variant={field.value ? "default" : "outline"}
                                size="sm"
                                className="mt-auto"
                                onClick={() => field.onChange(!field.value)}
                              >
                                {t("360_addon_interested")}{" "}
                                {field.value ? (
                                  <XIcon className="size-4" />
                                ) : (
                                  <PlusIcon className="size-4" />
                                )}
                              </Button>
                            </FormControl>
                          )}
                        />
                      )}
                    </div>
                    {options?.frequencyOptions && (
                      <FormField
                        control={form.control}
                        name="Frequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                className="grid grid-cols-2 grid-rows-3"
                                // @ts-ignore
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                {options.frequencyOptions.map(
                                  ({ title, value }) => (
                                    <div
                                      className="flex items-center space-x-2"
                                      key={value}
                                    >
                                      <FormControl>
                                        {/* @ts-ignore */}
                                        <RadioGroupItem value={value} />
                                      </FormControl>
                                      <RadioGroupLabel htmlFor={title}>
                                        {title}
                                      </RadioGroupLabel>
                                    </div>
                                  ),
                                )}
                              </RadioGroup>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </DialogDescription>
          <DialogFooter>
            <Button type="submit" loading={isPending}>
              {t("update")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Form>
  );
}
