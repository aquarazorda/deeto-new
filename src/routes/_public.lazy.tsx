import { RECAPTCHA_KEY } from "@/config";
import { Outlet, createLazyFileRoute } from "@tanstack/react-router";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

export const Route = createLazyFileRoute("/_public")({
  component: () => (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
      <div className="flex h-screen w-screen items-center justify-center bg-yellow-red px-12">
        <Outlet />
      </div>
    </GoogleReCaptchaProvider>
  ),
});
