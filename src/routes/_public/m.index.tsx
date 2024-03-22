import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Spinner } from "@/components/loaders/spinner";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/requests";
import { setCookie } from "@/lib/cookie";
import { fetchUser } from "@/lib/states/user";

const shortenLinkResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  destination: z.string(),
  withoutAuthenticatedUser: z.boolean(),
});

const MagicRoute = () => {
  const search = Route.useSearch();
  const navigate = useNavigate();

  const { executeRecaptcha } = useGoogleReCaptcha();

  const { mutateAsync: auth } = useMutation({
    mutationFn: async () => {
      const captchaToken = await executeRecaptcha!();
      const res = await api.post(
        "MAGIC_SHORTEN_LINK_AUTH",
        shortenLinkResponseSchema,
        {
          shortenLinkId: search.l,
          captchaToken,
        },
      );

      if (res.ok) {
        navigate({ to: res.val.destination });

        setCookie("accessToken", res.val.accessToken, 172800, true);
        setCookie("refreshToken", res.val.refreshToken, 604800, true);
        await fetchUser();
      }

      return res;
    },
  });

  useEffect(() => {
    if (!executeRecaptcha || !search.l) return;

    auth();
  }, [executeRecaptcha, search]);

  return <Spinner />;
};

const magicLinkSearchSchema = z.object({
  l: z.string().uuid().optional(),
});

export const Route = createFileRoute("/_public/m/")({
  component: MagicRoute,
  validateSearch: magicLinkSearchSchema.parse,
});
