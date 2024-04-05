import { ZodSchema, z } from "zod";
import OnboardingSkipper from "./-skipper";
import { StepIdentifierEnum } from "@/lib/types/onboarding/steps";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

type Props<T extends ZodSchema> = {
  values: z.infer<T>;
  stepName: StepIdentifierEnum;
  formSchema: T;
  disabled: boolean;
  isPending: boolean;
};

export default function OnboardingFooter<T extends ZodSchema>({
  values,
  stepName,
  formSchema,
  disabled,
  isPending,
}: Props<T>) {
  const { t } = useTranslation();

  return (
    <div
      className="fixed bottom-1 left-0 flex w-full items-center justify-between rounded-full
        bg-tint-white-2 p-2"
    >
      <OnboardingSkipper
        values={values}
        stepName={stepName}
        formSchema={formSchema}
      />
      <Button size="sm" type="submit" loading={isPending} disabled={disabled}>
        {t("continue")}
      </Button>
    </div>
  );
}
