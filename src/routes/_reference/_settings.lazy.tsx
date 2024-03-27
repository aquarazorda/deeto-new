import { Link, Outlet, createLazyFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import UserRound from "~/icons/user-round.svg?react";
import Clock from "~/icons/clock.svg?react";
import Globe from "~/icons/globe.svg?react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const links = [
  { to: "/settings/my-profile", title: "my_profile", Icon: UserRound },
  { to: "/settings/timezone", title: "time_zone", Icon: Clock },
  { to: "/settings/working-hours", title: "working_hours", Icon: Globe },
];

const Content = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-5 gap-6 text-primary">
      <div className="col-span-1 divide-y-2 divide-grey-100">
        <h1 className="mb-6 p-3 text-5xl font-bold text-primary-dark">
          {t("settings")}
        </h1>
        {links.map(({ to, title, Icon }) => (
          <Link
            key={title}
            to={to}
            className="group flex w-full items-center gap-4 py-8"
          >
            <Icon className="size-8 group-data-[status='active']:text-primary-yellow" />
            <span
              className="font-inter text-xl font-semibold
                group-data-[status='active']:text-secondary-blue"
            >
              {t(title)}
            </span>
          </Link>
        ))}
      </div>
      <Card
        variant="shadow"
        className="col-span-4 border-none px-6 py-4 shadow-card"
      >
        <ScrollArea className="h-full w-full">
          <Outlet />
        </ScrollArea>
      </Card>
    </div>
  );
};

export const Route = createLazyFileRoute("/_reference/_settings")({
  component: Content,
});
