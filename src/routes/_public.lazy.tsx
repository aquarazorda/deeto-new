import { Card, CardContent } from "@/components/ui/card";
import { RECAPTCHA_KEY } from "@/config";
import { usePrivileges } from "@/lib/states/user";
import { Navigate, Outlet, createLazyFileRoute } from "@tanstack/react-router";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { match } from "ts-pattern";

export const Route = createLazyFileRoute("/_public")({
  component: () => {
    const privileges = usePrivileges();

    return match(privileges)
      .with({ isReference: true }, () => <Navigate to="/dashboard" />)
      .otherwise(
        // { isReference: undefined, isProspect: undefined, isVendor: undefined },
        () => (
          <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
            <div className="flex h-screen w-screen items-center justify-center bg-yellow-red">
              <Card className="min-w-[700px] rounded-tl-none p-12">
                <CardContent>
                  <Outlet />
                </CardContent>
              </Card>
            </div>
          </GoogleReCaptchaProvider>
        ),
      );
  },
});
