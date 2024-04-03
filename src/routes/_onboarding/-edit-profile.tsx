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
import useSaveProfile from "@/lib/mutations/useSaveProfile";
import { useUser } from "@/lib/states/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().nonempty("fields.error.firstName"),
  lastName: z.string().nonempty("fields.error.lastName"),
  title: z.string().nonempty("fields.error.title"),
  linkedInProfile: z.string().url(),
});

export default function OnboardingEditProfile({
  close,
}: {
  close: () => void;
}) {
  const { t } = useTranslation();
  const user = useUser((state) => state.me);
  const { mutateAsync, isPending } = useSaveProfile();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      title: user.title,
      linkedInProfile: user.accountContacts?.[0].linkedInProfile ?? "",
    },
  });

  const onSave = async (values: z.infer<typeof schema>) => {
    const res = await mutateAsync(values);
    if (res.ok) {
      toast.success(t("profile_updated_successfully"));
      close();
      return;
    }

    toast.error(t("something_went_wrong"));
  };

  return (
    <div className="space-y-4">
      <p className="text-2xl font-bold">{t("edit_details")}</p>
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={user.avatar.url ?? ""} />
          <AvatarFallback className="uppercase">
            {user.firstName[0]} {user.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <Button size="sm">{t("upload_photo")}</Button>
      </div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSave)}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder={t("first_name") + "*"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder={t("last_name") + "*"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder={t("job_title") + "*"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedInProfile"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("profile.linkedin_profile")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div
            className="fixed bottom-5 left-0 flex w-full justify-between rounded-full bg-tint-white-2
              p-2"
          >
            <Button
              variant="outline"
              onClick={close}
              size="sm"
              disabled={isPending}
            >
              {t("back")}
            </Button>
            <Button loading={isPending} size="sm" type="submit">
              {t("save")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
