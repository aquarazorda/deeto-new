import Pen from "@/assets/icons/pen.svg?react";
import ActivityAddon from "@/components/deeto/activity-addon";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { addonSchema } from "@/schemas/contributions";
import { lazy, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const mainAddons = [
  "ReferenceCalls",
  "Webinars",
  "PublicSpeaking",
  "AdvisoryBoard",
];

const EditActivityDialogContent = lazy(() => import("./-edit-activites"));

export default function ReferenceActivitiesCard({
  addons,
}: {
  addons: z.infer<typeof addonSchema>[];
}) {
  const { t } = useTranslation();
  const filteredAddons = useMemo(
    () => addons.filter(({ type }) => !mainAddons.includes(type)),
    [addons],
  );

  const getAddonStatus = (type: string) => addons.find((i) => i.type === type);

  return (
    <Card variant="shadow">
      <CardDescription className="flex flex-col gap-4 font-bold text-primary-dark">
        <div className="flex items-center justify-between">
          <p className="text-xl">{t("activities")}</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Pen /> {t("edit")}
              </Button>
            </DialogTrigger>
            <EditActivityDialogContent />
          </Dialog>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {mainAddons.map((type) => (
            <ActivityAddon item={getAddonStatus(type)} key={type} light />
          ))}
          {filteredAddons.map(({ type }) => (
            <ActivityAddon item={getAddonStatus(type)} key={type} light />
          ))}
        </div>
      </CardDescription>
    </Card>
  );
}
