import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Spinner } from "@/components/loaders/spinner";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/requests";
import { setTokensAndGetUser } from "@/lib/states/user";
import { P, match } from "ts-pattern";
import { authResponseSchema } from "@/schemas/auth";

const shortenLinkResponseSchema = z.union([
  authResponseSchema,
  z.object({
    email: z.string(),
    partialMagicLink: z.boolean(),
  }),
]);

const MagicRoute = () => {
  const { l } = Route.useSearch();
  const navigate = useNavigate();

  const { executeRecaptcha } = useGoogleReCaptcha();

  const { mutateAsync: auth } = useMutation({
    mutationFn: async () => {
      const captchaToken = await executeRecaptcha!();
      const res = await api.post(
        "MAGIC_SHORTEN_LINK_AUTH",
        shortenLinkResponseSchema,
        {
          shortenLinkId: l,
          captchaToken,
        },
      );

      match(res)
        .with({ ok: true, val: { partialMagicLink: true } }, ({ val }) => {
          navigate({ to: "/partial-auth", search: { email: val.email, l } });
        })
        .with(
          {
            ok: true,
            val: { accessToken: P.string },
          },
          async ({ val }) => {
            await setTokensAndGetUser(val);

            navigate({ to: val.destination });
          },
        );

      return res;
    },
  });

  useEffect(() => {
    if (!executeRecaptcha || !l) return;

    auth();
  }, [executeRecaptcha, l]);

  return <Spinner />;
};

const magicLinkSearchSchema = z.object({
  l: z.string().uuid().optional(),
  action: z.string().optional(),
});

export const Route = createFileRoute("/_public/m/")({
  component: MagicRoute,
  validateSearch: magicLinkSearchSchema.parse,
});
