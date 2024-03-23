import { useUser } from "@/lib/states/user";
import { IconComponent } from "@/vite-env";
import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  children: ReactNode;
  items: {
    title: string;
    path: string;
    icon: IconComponent;
  }[];
};

export default function LeftMenuLayout({ children, items }: Props) {
  const avatar = useUser((state) => state.vendor?.appLogo.url);
  const { t } = useTranslation();

  return (
    <div className="flex h-screen w-screen gap-4 bg-primary p-4">
      <div className="flex flex-col gap-4">
        {avatar && (
          <Link to="/" className="w-[88px]">
            <img src={avatar} />
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
      </div>
      <ScrollArea className="relative h-full flex-grow overflow-hidden bg-white">
        <div className="flex h-full w-full flex-col p-6">{children}</div>
      </ScrollArea>
    </div>
  );
}
