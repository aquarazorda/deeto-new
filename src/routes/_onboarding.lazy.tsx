import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useStepsData from "@/lib/queries/onboarding/useStepsData";
import { useUser, useUserPrivileges } from "@/lib/states/user";
import { Navigate, Outlet, createLazyFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import QuestionMarkIcon from "~/icons/question-mark.svg?react";
import InfoIcon from "~/icons/info-icon.svg?react";
import PenIcon from "~/icons/pen.svg?react";
import GiftBoxFancy from "~/icons/gift-box-fancy.svg?react";
import Circle from "~/icons/circle.svg?react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { VendorSettingsCurrency } from "@/components/deeto/currency/vendor-custom-currency";
import { match } from "ts-pattern";
import { CheckIcon, XIcon } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Suspense, useState } from "react";
import OnboardingEditProfile from "./_onboarding/-edit-profile";
import { useCurrentStepIndex } from "./_onboarding/-utils";
import { StepIdentifierEnum } from "@/lib/types/onboarding/steps";

const Content = () => {
  const { t } = useTranslation();
  const { data } = useStepsData();
  const { isReference } = useUserPrivileges();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const currentStepIndex = useCurrentStepIndex();
  const [user, vendorName] = useUser(
    useShallow((state) => [state.me, state.vendor.name]),
  );

  if (!isReference) {
    return <Navigate to="/" />;
  }

  if (!data?.ok || currentStepIndex === undefined) {
    return null;
  }

  const getRedirectRoute = (index: number): StepIdentifierEnum =>
    match(data.val.steps[index].status)
      .with("notStarted", "hidden", () => getRedirectRoute(-1))
      .otherwise(() => data.val.steps[index].identifier);

  if (
    match(data.val.steps[currentStepIndex - 1].status)
      .with("notStarted", "hidden", () => true)
      .otherwise(() => false)
  ) {
    const redirect = getRedirectRoute(currentStepIndex - 1);
    // @ts-ignore
    return <Navigate to={`/onboarding/${redirect}`} />;
  }

  return (
    <div className="min-w-screen min-h-screen bg-pink-green bg-cover">
      <div className="flex w-full items-center justify-end px-4 py-2">
        <Button
          variant="secondary"
          size="icon-sm"
          className="rounded-tl-none shadow-md"
        >
          <QuestionMarkIcon />
        </Button>
      </div>
      <div className="space-y-0.5 px-1">
        <Card className="flex flex-col gap-4 rounded-b-none bg-tint-white-2">
          <div className="flex gap-4">
            <Avatar rounded="bl">
              <AvatarImage src={user.avatar.url ?? ""} />
              <AvatarFallback className="uppercase">
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="my-auto flex h-full flex-col justify-start">
              <span className="text-2xl font-bold capitalize">
                {user.firstName} {user.lastName}
              </span>
              <span className="flex gap-1">
                {t("influence")}:{" "}
                <span className="font-semibold">
                  {data.val.profile.influenceLevel}/100{" "}
                </span>
                <Popover>
                  <PopoverTrigger>
                    <InfoIcon className="text-grey-400" />
                  </PopoverTrigger>
                  <PopoverContent side="top">
                    {t("360_influence_description")}
                  </PopoverContent>
                </Popover>
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsEditOpen(!isEditOpen)}
          >
            <PenIcon /> {t("edit")}
          </Button>
        </Card>
        <Card className="flex items-center gap-2 rounded-none bg-tint-white-2">
          <GiftBoxFancy />
          {t("you_earned")}
          <VendorSettingsCurrency className="font-bold">
            {data.val.profile.rewardedAmount}
          </VendorSettingsCurrency>
          <Popover>
            <PopoverTrigger>
              <Button size="icon-sm" className="size-6 p-0">
                <QuestionMarkIcon className="h-3 w-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              {t("onboarding.gift.tooltip.message", { vendorName })}
            </PopoverContent>
          </Popover>
        </Card>

        <ScrollArea className="max-w-full bg-tint-white-2 pr-4">
          <Card
            className="flex flex-nowrap items-center gap-4 overflow-x-visible rounded-none border-none
              bg-transparent"
          >
            {data.val.steps.map(
              ({ name, status }) =>
                status !== "hidden" && (
                  <Button
                    variant="ghost"
                    className="h-fit p-0 text-base font-normal text-primary"
                    key={name}
                  >
                    {match(status)
                      .with("notStarted", () => (
                        <Circle className="text-grey-200" />
                      ))
                      .with("finished", () => (
                        <div className="jusify-center flex size-6 items-center rounded-full bg-secondary-green">
                          <CheckIcon className="h-5 text-white" />
                        </div>
                      ))
                      .with("skipped", () => (
                        <div className="jusify-center flex size-6 items-center rounded-full bg-grey-200">
                          <XIcon className="h-5 text-white" />
                        </div>
                      ))
                      .otherwise(() => "Not implemented")}
                    {name}
                  </Button>
                ),
            )}
          </Card>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <Card className="rounded-t-none bg-tint-white-2 p-4">
          {!isEditOpen ? (
            <Suspense fallback="Loading...">
              <Outlet />
            </Suspense>
          ) : (
            <OnboardingEditProfile close={() => setIsEditOpen(false)} />
          )}
        </Card>

        <div className="h-20 lg:hidden"></div>
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/_onboarding")({
  component: Content,
});
