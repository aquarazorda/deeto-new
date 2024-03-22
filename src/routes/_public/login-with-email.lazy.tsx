import { createLazyFileRoute } from "@tanstack/react-router";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/requests";
import { useMutation } from "@tanstack/react-query";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useTranslation } from "react-i18next";

const schema = z.object({
  email: z.string().email(),
});

export const Route = createLazyFileRoute("/_public/login-with-email")({
  component: EmailLogin,
});

function EmailLoginInner() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { t } = useTranslation();

  const { data, mutateAsync, isPending, reset } = useMutation({
    mutationFn: async (email: string) => {
      if (!executeRecaptcha) {
        return;
      }

      const captchaToken = await executeRecaptcha();

      const res = await api.post(
        "LOGIN_WITH_MAIL_PATH",
        z.object({
          success: z.boolean(),
        }),
        {
          email,
          captchaToken,
        },
      );

      return res;
    },
  });

  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = ({ email }: { email: string }) => mutateAsync(email);

  if (data?.ok) {
    return (
      <div className="flex gap-12 space-y-6 p-12">
        <img src="/assets/login-email.svg" />
        <div className="flex flex-col gap-2 text-xl">
          <h2 className="text-4xl">{t("registration.heading.check_email")}</h2>
          <p>
            {t("registration.confirmation_link", {
              email: form.getValues("email"),
            })}
          </p>
          <p>
            {t("no_email")}{" "}
            <Button variant="ghost" onClick={reset}>
              {t("click_here")}
            </Button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form className="space-y-6 p-12" onSubmit={form.handleSubmit(onSubmit)}>
        <h1 className="font-inter text-4xl font-medium text-primary">
          {t("registration.heading.what_is_your_email")}
        </h1>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage>{data?.err ? data.val : null}</FormMessage>
            </FormItem>
          )}
        />
        <div className="flex">
          <Button
            className="ml-auto"
            disabled={!form.formState.isValid}
            loading={isPending}
            type="submit"
          >
            {t("continue")}
          </Button>
        </div>
      </form>
    </Form>
  );
}

function EmailLogin() {
  return (
    <Card className="w-[700px] rounded-tl-none">
      <CardContent>
        <EmailLoginInner />
      </CardContent>
    </Card>
  );
}
