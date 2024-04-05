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
import { endpoints } from "@/lib/endpoints";
import { queryKeys } from "@/lib/query";
import { api } from "@/lib/requests";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import OnboardingFooter from "./-footer";
import { StepIdentifierEnum } from "@/lib/types/onboarding/steps";
import useSaveOnboardingStep from "@/lib/mutations/useSaveOnboardingStep";

const responseSchema = z.object({
  review: z.string(),
  consentToUse: z.boolean(),
});

const formSchema = responseSchema.extend({
  review: z.string().min(100),
});

const Component = () => {
  const { t } = useTranslation();
  const { isPending, mutateAsync } = useSaveOnboardingStep(
    StepIdentifierEnum.REVIEW,
    formSchema,
  );

  const { data } = useSuspenseQuery({
    queryFn: () =>
      api.get(endpoints.CONTRIBUTION_STEP_PATH("review"), responseSchema),
    queryKey: [queryKeys.CONTRIBUTION_STEP("review")],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (data?.ok) {
      form.reset(data.val);
    }
  }, [data]);

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit((values) => mutateAsync(values))}
      >
        <h1 className="text-2xl font-bold">{t("360_review_ready_title")}</h1>
        <p className="font-inter text-lg leading-snug">
          {t("360_review_ready_description")}
        </p>
        <FormField
          control={form.control}
          name="review"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                {t("360_review_consent_description")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <OnboardingFooter
          stepName={StepIdentifierEnum.REVIEW}
          values={form.getValues()}
          formSchema={formSchema}
          responseSchema={responseSchema}
          isPending={isPending}
          disabled={!form.formState.isValid || !form.getValues().consentToUse}
        />
      </form>
    </Form>
  );
};

export const Route = createLazyFileRoute("/_onboarding/onboarding/review")({
  component: Component,
});
