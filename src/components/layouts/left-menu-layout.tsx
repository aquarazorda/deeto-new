import { useUser } from "@/lib/states/user";
import { IconComponent } from "@/vite-env";
import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Props = {
  children: ReactNode;
  items: {
    title: string;
    path: string;
    icon: IconComponent;
  }[];
};

const MenuContent = () => {
  const { t } = useTranslation();

  return (
    <PopoverContent
      side="right"
      sideOffset={25}
      className="w-64 rounded-t-none p-0 text-base font-semibold text-primary-dark"
      avoidCollisions={false}
      align="end"
    >
      <Link
        className="flex h-14 w-full items-center px-4 hover:bg-primary-yellow"
        to="/settings/my-profile"
      >
        {t("settings")}
      </Link>
      <span
        className="flex h-14 w-full cursor-pointer items-center rounded-b-md border-t-2 px-4
          hover:bg-primary-yellow"
      >
        {t("log_out")}
      </span>
    </PopoverContent>
  );
};

export default function LeftMenuLayout({ children, items }: Props) {
  const [vendorLogo, avatar, firstName, lastName] = useUser((state) => [
    state.vendor.appLogo.url,
    state.me.avatar.url,
    state.me.firstName,
    state.me.lastName,
  ]);
  const { t } = useTranslation();

  return (
    <div className="flex h-screen w-screen gap-4 bg-primary p-4">
      <div className="flex flex-col gap-4">
        {vendorLogo && (
          <Link to="/" className="w-[88px]">
            <img src={vendorLogo} />
          </Link>
        )}
        {items.map(({ icon: Icon, path, title }) => (
          <Link
            to={path}
            key={title}
            className="flex flex-col items-center justify-center gap-1 font-inter text-sm font-semibold
              data-[status='active']:text-primary-yellow"
          >
            <Icon className="size-7" /> {t(title)}
          </Link>
        ))}
        <div className="mt-auto flex flex-col items-center justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={avatar ?? undefined} />
                <AvatarFallback className="uppercase">
                  {firstName[0]}
                  {lastName[0]}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <MenuContent />
          </Popover>
        </div>
      </div>
      <ScrollArea className="relative flex h-full w-full bg-white px-6">
        <div className="h-full w-full py-6">{children}</div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
}
