import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "../ui/card";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { api } from "@/lib/requests";
import { endpoints } from "@/lib/endpoints";
import { useMutation } from "@tanstack/react-query";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { RECAPTCHA_KEY } from "@/config";
import { useTranslation } from "react-i18next";

const schema = z.object({
  email: z.string().email(),
});

function EmailLoginInner() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { t } = useTranslation();

  const { data, mutateAsync, isPending } = useMutation({
    mutationFn: async (email: string) => {
      if (!executeRecaptcha) {
        return;
      }

      const captchaToken = await executeRecaptcha();

      const res = await api.post(
        endpoints.LOGIN_WITH_MAIL_PATH,
        {
          email,
          captchaToken,
        },
        z.object({
          success: z.boolean(),
        }),
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
      <div className="flex gap-12">
        <img src="/assets/login-email.svg" />
        <div>
          <h2>{t("registration.heading.check_email")}</h2>
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
            </FormItem>
          )}
        />
        <div className="flex">
          <Button
            className="ml-auto"
            disabled={!form.formState.isValid}
            loading={isPending}
          >
            {t("continue")}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default function EmailLogin() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
      <div className="flex h-screen w-screen items-center justify-center bg-yellow-red px-12">
        <Card className="w-[700px] rounded-tl-none">
          <CardContent>
            <EmailLoginInner />
          </CardContent>
        </Card>
      </div>
    </GoogleReCaptchaProvider>
  );
}
