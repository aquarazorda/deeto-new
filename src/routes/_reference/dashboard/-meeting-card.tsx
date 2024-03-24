import Avatar from "@/components/deeto/avatar";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ThreeDots from "@/assets/icons/three-dots-vertical.svg?react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { meetingSchema } from "@/schemas/meetings";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Link } from "@tanstack/react-router";

export const MeetingCard = ({
  meeting: { prospectContact },
}: {
  meeting: z.infer<typeof meetingSchema>;
}) => {
  const { t } = useTranslation();
  return (
    <Card className="py-4">
      <div className="flex gap-2">
        <Avatar />
        <div className="mx-auto flex flex-1 items-center">
          <span className="inter flex flex-col font-semibold text-primary-dark">
            <span>
              {prospectContact.authenticatedUser.firstName}{" "}
              {prospectContact.authenticatedUser.lastName}
            </span>
            {prospectContact.title} at {prospectContact.account.companyName}
          </span>
        </div>
        <Popover>
          <div>
            <PopoverTrigger className="flex items-start text-grey-500 data-[state='open']:text-primary-yellow">
              <ThreeDots />
            </PopoverTrigger>
          </div>
          <PopoverContent align="end" side="bottom">
            <Link
            // to={`/prospects/profile/${prospectContact.authenticatedUser.authenticatedUserId}`}
            >
              {t("prospect_profile")}
            </Link>
          </PopoverContent>
        </Popover>
      </div>
      <div className="my-4 flex gap-2">
        {prospectContact.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      <div className="mt-2 flex justify-center border-t pt-4">
        <Button variant="outline" size="sm">
          {t("select_time")}
        </Button>
      </div>
    </Card>
  );
};
