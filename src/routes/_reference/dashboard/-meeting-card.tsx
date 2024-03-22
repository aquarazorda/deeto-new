import Avatar from "@/components/deeto/avatar";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card>
      <CardContent>
        <div className="flex gap-2">
          <Avatar />
          <div className="mx-auto flex flex-1 items-center">
            <span className="flex flex-col text-primary-dark font-semibold inter">
              <span>
                {prospectContact.authenticatedUser.firstName}{" "}
                {prospectContact.authenticatedUser.lastName}
              </span>
              {prospectContact.title} at {prospectContact.account.companyName}
            </span>
          </div>
          <Popover>
            <div>
              <PopoverTrigger
                className="items-start flex text-grey-500
                  data-[state='open']:text-primary-yellow"
              >
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
        <div className="flex gap-2 my-4">
          {prospectContact.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="mt-2 pt-4 flex justify-center border-t">
          <Button variant="outline" size="sm">
            {t("select_time")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
