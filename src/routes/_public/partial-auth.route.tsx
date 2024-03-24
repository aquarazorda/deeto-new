import { Spinner } from "@/components/loaders/spinner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { api } from "@/lib/requests";
import { authResponseSchema } from "@/schemas/auth";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import WarningExclamation from "@/assets/warning-exclamation.svg?react";
import { setTokensAndGetUser } from "@/lib/states/user";
import { endpoints } from "@/lib/endpoints";

const searchSchema = z.object({
  email: z.string().optional(),
  l: z.string().optional(),
});

const Component = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { email, l } = Route.useSearch();
  const [otp, setOtp] = useState("");

  const { mutateAsync, data, isPending } = useMutation({
    mutationFn: async (otp: string) => {
      const res = await api.post(
        endpoints.LOGIN_PARTIAL_PATH,
        authResponseSchema,
        {
          code: otp,
          linkId: l,
        },
      );

      if (res.ok) {
        setTokensAndGetUser(res.val);
        navigate({ to: res.val.destination });
      }

      return res;
    },
  });

  useEffect(() => {
    if (otp.length === 4) {
      mutateAsync(otp);
    }
  }, [otp]);

  return (
    <div className="flex gap-9">
      <img src="/assets/login-email.svg" />
      <div className="flex flex-col gap-5 text-primary">
        <h2 className="text-4xl font-medium">{t("partial_auth_title")}</h2>
        <div className="flex flex-col gap-1 text-2xl">
          <span>{t("partial_auth_subtitle0")}</span>
          <span className="font-bold">{email}</span>
          <span>{t("partial_auth_subtitle1")}</span>
        </div>
        <InputOTP
          maxLength={4}
          pattern={REGEXP_ONLY_DIGITS}
          disabled={isPending}
          onChange={setOtp}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          {isPending && <Spinner />}
        </InputOTP>
        {data?.err && (
          <p className="text-inter text-secondary-red">
            <WarningExclamation /> {data.val}
          </p>
        )}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_public/partial-auth")({
  validateSearch: searchSchema.parse,
  component: Component,
});
