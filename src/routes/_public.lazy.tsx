import { Card, CardContent } from "@/components/ui/card";
import { RECAPTCHA_KEY } from "@/config";
import { useUser } from "@/lib/states/user";
import { Navigate, Outlet, createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export const Route = createLazyFileRoute("/_public")({
  component: () => {
    const user = useUser();

    if (user.me) {
      return <Navigate to="/" />;
    }

    return (
      <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
        <div className="flex h-screen w-screen items-center justify-center bg-yellow-red">
          <Card className="min-w-[700px] rounded-tl-none p-12">
            <CardContent>
              <Outlet />
            </CardContent>
          </Card>
        </div>
      </GoogleReCaptchaProvider>
    );
  },
});
