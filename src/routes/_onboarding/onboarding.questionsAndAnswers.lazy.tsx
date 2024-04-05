import { Textarea } from "@/components/ui/textarea";
import { endpoints } from "@/lib/endpoints";
import { queryKeys } from "@/lib/query";
import { api } from "@/lib/requests";
import { StepIdentifierEnum } from "@/lib/types/onboarding/steps";
import { customizedFormFieldSchema } from "@/schemas/customized-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Navigate, createLazyFileRoute } from "@tanstack/react-router";
import { match } from "ts-pattern";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import OnboardingSkipper from "./-skipper";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

const responseSchema = z.object({
  consentToUse: z.boolean(),
  customizedFormFields: z.array(customizedFormFieldSchema),
});

const Component = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  const { data } = useSuspenseQuery({
    queryKey: queryKeys.CONTRIBUTION_STEP(
      StepIdentifierEnum.QUESTIONS_AND_ANSWERS,
    ),
    queryFn: () =>
      api.get(
        endpoints.CONTRIBUTION_STEP_PATH(
          StepIdentifierEnum.QUESTIONS_AND_ANSWERS,
        ),
        responseSchema,
      ),
  });

  const form = useForm();

  const placeholderRef = useRef<HTMLDivElement>(null);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);

  useEffect(() => {
    if (placeholderRef.current) {
      setTimeout(() => {
        setPlaceholderHeight(placeholderRef.current!.offsetHeight);
      }, 100);
    }
  }, [currentIndex]);

  if (!data.ok) {
    return <Navigate to={`/onboarding/review`} />;
  }

  const questionVariants = {
    initial: { y: "-100%", opacity: 0 },
    in: { y: 0, opacity: 1 },
    out: { y: "100%", opacity: 0 },
  };

  const questionTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence>
        {data.val.customizedFormFields.map(
          ({ fieldLabel, fieldRepresentation, customizedFormFieldId }, idx) =>
            idx === currentIndex ? (
              <motion.div
                variants={questionVariants}
                transition={questionTransition}
                key={customizedFormFieldId}
                initial="initial"
                animate="in"
                exit="out"
                className="absolute left-0 top-0 w-full"
              >
                <div ref={placeholderRef}>
                  <h2 className="font-inter text-xl font-bold">
                    {idx + 1}. {fieldLabel}
                  </h2>
                  {match(fieldRepresentation)
                    .with("textarea", () => <Textarea />)
                    .otherwise(() => "Not yet implemented")}
                </div>
              </motion.div>
            ) : null,
        )}
      </AnimatePresence>
      <div style={{ height: placeholderHeight }} className="w-full" />
      <div
        className="fixed bottom-1 left-0 flex w-full items-center gap-2 rounded-full
          bg-tint-white-2 p-2"
      >
        <OnboardingSkipper
          values={form.getValues()}
          stepName={StepIdentifierEnum.QUESTIONS_AND_ANSWERS}
          formSchema={responseSchema}
        />
        <span className="text-base font-semibold text-grey-400">
          {t("step_of", {
            from: currentIndex + 1,
            to: data.val.customizedFormFields.length,
          })}
        </span>
        <div className="ml-auto flex gap-2">
          <Button
            size="sm"
            type="submit"
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            disabled={currentIndex === 0}
          >
            {t("back")}
          </Button>
          <Button
            size="sm"
            onClick={() => setCurrentIndex((prev) => prev + 1)}
            disabled={currentIndex >= data.val.customizedFormFields.length - 1}
          >
            {t("next_question")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute(
  "/_onboarding/onboarding/questionsAndAnswers",
)({
  component: Component,
});

