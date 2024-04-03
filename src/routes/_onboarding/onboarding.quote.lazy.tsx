import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { endpoints } from "@/lib/endpoints";
import { stepsSchema } from "@/lib/queries/onboarding/useStepsData";
import { queryKeys } from "@/lib/query";
import { api } from "@/lib/requests";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@radix-ui/react-dialog";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { PlusIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useMoveToNextStep } from "./-utils";
import { onboardingIdentifierSchema } from "@/schemas/onboarding";
import { StepIdentifierEnum } from "@/lib/types/onboarding/steps";

const responseSchema = z.object({
  allEndorsments: z
    .array(
      z.object({
        endorsmentId: z.string(),
        value: z.string(),
        vendorId: z.string(),
      }),
    )
    .optional(),
  consentToUse: z.boolean(),
  quote: z.string(),
  endorsmentIds: z.array(z.string()),
});

const formSchema = responseSchema.omit({ allEndorsments: true }).extend({
  quote: z.string().refine((str) => str.trim().split(" ").length > 24),
});

const useSave = (type: z.infer<typeof onboardingIdentifierSchema>) => {
  const moveToNext = useMoveToNextStep();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      api.post(endpoints.CONTRIBUTION_STEP_PATH(type), stepsSchema, values),
    onSuccess: (val) => {
      if (val.ok) {
        queryClient.setQueryData(
          queryKeys.CONTRIBUTION_STEP("quote"),
          (data: z.infer<typeof responseSchema>) => {
            return {
              ...data,
              ...val.val,
            };
          },
        );

        moveToNext();
      }
    },
  });
};

const Skip = ({ values }: { values: z.infer<typeof formSchema> }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useSave(StepIdentifierEnum.QUOTE);

  const onSkip = () => {
    mutateAsync({
      ...values,
      consentToUse: false,
    });
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger>
        <Button
          variant="link"
          size="sm"
          className="text-secondary-purple underline"
        >
          {t("skip")}
        </Button>
      </DialogTrigger>
      <DialogContent hideCloseButton className="w-full">
        <h1 className="text-3xl font-bold">{t("360_quote_skip_title")}</h1>
        <p>{t("360_quote_skip_subtitle")}</p>
        <div className="flex flex-wrap gap-4 pb-8">
          <Button variant="outline" className="flex-1" onClick={onSkip}>
            {t("skip")}
          </Button>
          <DialogClose asChild>
            <Button className="flex-1" disabled={isPending}>
              {t("360_quote_skip_confirm")}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Component = () => {
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useSave(StepIdentifierEnum.QUOTE);
  const { data } = useSuspenseQuery({
    queryFn: () =>
      api.get(endpoints.CONTRIBUTION_STEP_PATH("quote"), responseSchema),
    queryKey: [queryKeys.CONTRIBUTION_STEP("quote")],
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (data?.ok) {
      const { allEndorsments, ...values } = data.val;
      form.reset(values);
    }
  }, [data]);

  if (!data.ok) {
    return <div>Something went wrong</div>;
  }

  return (
    <Form {...form}>
      <h1 className="mb-6 text-2xl font-bold">{t("360_quote_title")}</h1>
      <form onSubmit={form.handleSubmit((values) => mutateAsync(values))}>
        <div className="divide-y divide-grey-200 font-inter leading-snug *:py-6 first:*:pt-0 last:*:pb-0">
          <FormField
            control={form.control}
            name="quote"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={t("360_quote_placeholder")}
                    className="resize-none rounded-b-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <h2 className="font-bold">
              {t("360_quote_endorsement_description")}
            </h2>
            <FormField
              control={form.control}
              name="endorsmentIds"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ToggleGroup
                      type="multiple"
                      className="flex flex-wrap justify-start gap-2"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {data.val.allEndorsments?.map(
                        ({ value, endorsmentId }) => {
                          const isSelected =
                            field.value?.includes(endorsmentId);

                          return (
                            <ToggleGroupItem
                              key={value}
                              value={endorsmentId}
                              asChild
                            >
                              <Button
                                variant="outline"
                                className={cn(
                                  "rounded-full",
                                  isSelected
                                    ? `data-[state=on]:border-transparent data-[state=on]:bg-primary
                                      data-[state=on]:text-white`
                                    : "border-grey-200 bg-white",
                                )}
                              >
                                {value}{" "}
                                {isSelected ? (
                                  <XIcon className="size-4" />
                                ) : (
                                  <PlusIcon className="size-4" />
                                )}
                              </Button>
                            </ToggleGroupItem>
                          );
                        },
                      )}
                    </ToggleGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="consentToUse"
            render={({ field }) => (
              <FormItem className="flex items-start gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    className="size-6"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription className="mt-0">
                  {t("360_quote_consent_description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div
          className="fixed bottom-1 left-0 flex w-full items-center justify-between rounded-full
            bg-tint-white-2 p-2"
        >
          <Skip values={form.getValues()} />
          <Button
            size="sm"
            type="submit"
            loading={isPending}
            disabled={!form.formState.isValid || !form.getValues().consentToUse}
          >
            {t("continue")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const Route = createLazyFileRoute("/_onboarding/onboarding/quote")({
  component: Component,
});
