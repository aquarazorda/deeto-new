import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useUser } from "@/lib/states/user";
import EditIcon from "~/icons/edit.svg?react";
import TrashIcon from "~/icons/trash.svg?react";
import StarIcon from "~/icons/star.svg?react";
import PlusCircle from "~/icons/plus-circle.svg?react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const DeleteSecondaryEmail = () => {
  const { t } = useTranslation();
  const email = useUser((state) => state.me.secondaryEmail);

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="destructive-ghost">
          <TrashIcon className="size-5" /> {t("delete")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("remove_email_confirm", { email })}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="jusify-center flex w-full items-center gap-4 pb-12">
          <DialogClose asChild>
            <Button variant="outline" className="ml-auto">
              {t("prospect.edit_meeting.never_mind")}
            </Button>
          </DialogClose>
          <Button variant="destructive" className="mr-auto">
            {t("delete")}
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default function EditEmails() {
  const { t } = useTranslation();
  const user = useUser((state) => state.me);

  return (
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
            <DeleteSecondaryEmail />
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
  );
}
