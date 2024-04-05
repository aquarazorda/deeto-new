import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { queryKeys } from "@/lib/query";
import { api } from "@/lib/requests";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { PlusIcon, XIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { StepIdentifierEnum } from "@/lib/types/onboarding/steps";
import TextareaWordCount from "@/components/deeto/textarea/word-count";
import { useOnboardingSave } from "./-skipper";
import OnboardingFooter from "./-footer";

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

const Component = () => {
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useOnboardingSave(
    StepIdentifierEnum.QUOTE,
    formSchema,
    responseSchema,
  );
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
                <div>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t("360_quote_placeholder")}
                      className="resize-none rounded-b-none"
                    />
                  </FormControl>
                  <TextareaWordCount limit={25} value={field.value} />
                </div>
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
        <OnboardingFooter
          values={form.getValues()}
          stepName={StepIdentifierEnum.QUOTE}
          formSchema={formSchema}
          responseSchema={responseSchema}
          disabled={!form.formState.isValid || !form.getValues().consentToUse}
          isPending={isPending}
        />
      </form>
    </Form>
  );
};

export const Route = createLazyFileRoute("/_onboarding/onboarding/quote")({
  component: Component,
});
