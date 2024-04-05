import { useState } from "react";
import { ZodSchema } from "zod";
import { useTranslation } from "react-i18next";
import { StepIdentifierEnum } from "@/lib/types/onboarding/steps";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useSaveOnboardingStep from "@/lib/mutations/useSaveOnboardingStep";

export default function OnboardingSkipper<T extends object>({
  values,
  stepName,
  formSchema,
}: {
  values: T;
  stepName: StepIdentifierEnum;
  formSchema: ZodSchema;
}) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useSaveOnboardingStep(
    StepIdentifierEnum.QUOTE,
    formSchema,
  );

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
        <h1 className="text-3xl font-bold">
          {t(`360_${stepName}_skip_title`)}
        </h1>
        <p>{t(`360_${stepName}_skip_subtitle`)}</p>
        <div className="flex flex-wrap gap-4 pb-8">
          <Button variant="outline" className="flex-1" onClick={onSkip}>
            {t("skip")}
          </Button>
          <DialogClose asChild>
            <Button className="flex-1" disabled={isPending}>
              {t(`360_${stepName}_skip_confirm`)}
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
