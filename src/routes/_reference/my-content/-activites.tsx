import Pen from "@/assets/icons/pen.svg?react";
import ActivityAddon from "@/components/deeto/activity-addon";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { addonSchema } from "@/schemas/contributions";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";

const mainAddons = [
  "ReferenceCalls",
  "Webinars",
  "PublicSpeaking",
  "AdvisoryBoard",
];

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
  const isEven = (filteredAddons.length + mainAddons.length) % 2 === 0;

  return (
    <Card variant="shadow">
      <CardDescription className="font-bold text-primary-dark flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <p className="text-xl">{t("activities")}</p>
          <Button variant="outline" size="sm" disabled>
            <Pen /> {t("edit")}
          </Button>
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
