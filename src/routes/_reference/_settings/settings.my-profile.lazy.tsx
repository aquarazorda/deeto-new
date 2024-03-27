import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@/lib/states/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import AvatarFallbackIcon from "~/icons/avatar-fallback.svg?react";
import EditIcon from "~/icons/edit.svg?react";
import TrashIcon from "~/icons/trash.svg?react";
import StarIcon from "~/icons/star.svg?react";
import PlusCircle from "~/icons/plus-circle.svg?react";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const Content = () => {
  const user = useUser((state) => state.me);
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });

  return (
    <div className="flex flex-col divide-y">
      <Form {...form}>
        <div className="flex flex-col gap-8 pb-12">
          <div className="flex w-full justify-between">
            <h2 className="text-4xl font-medium">{t("my_profile")}</h2>
            <Button disabled size="sm">
              {t("save")}
            </Button>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col gap-4">
              <Avatar size="lg">
                <AvatarImage src={user.avatar.url ?? ""} />
                <AvatarFallback className="border border-grey-400 bg-white">
                  <AvatarFallbackIcon className="text-grey-500" />
                </AvatarFallback>
              </Avatar>
              <Button>{t("edit_photo")}</Button>
            </div>
            <div className="flex w-full flex-col gap-5">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormControl>
                      <Input placeholder={t("first_name") + "*"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormControl>
                      <Input placeholder={t("last_name") + "*"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </Form>
      <div className="w-full space-y-8 py-12">
        <div className="flex w-full justify-between">
          <h2 className="text-4xl font-medium">{t("emails")}</h2>
          <Button size="sm" disabled={!!user.secondaryEmail}>
            <PlusCircle /> {t("add_secondary_email")}
          </Button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              defaultValue={user.email}
              disabled
              placeholder={t("primary_email")}
              className="grow"
            />
            <Button variant="ghost">
              <EditIcon /> {t("edit")}
            </Button>
          </div>
          {!!user.secondaryEmail && (
            <div className="flex items-center gap-4">
              <Input
                defaultValue={user.secondaryEmail}
                disabled
                placeholder={t("secondary_email")}
                className="grow"
              />
              <Button variant="destructive-ghost">
                <TrashIcon className="size-5" /> {t("delete")}
              </Button>
              <Button variant="ghost">
                <StarIcon /> {t("make_primary")}
              </Button>
              <Button variant="ghost">
                <EditIcon /> {t("edit")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute(
  "/_reference/_settings/settings/my-profile",
)({
  component: Content,
});
