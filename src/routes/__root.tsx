import MainLoader from "@/assets/main-loader.svg?react";
import { Providers } from "@/components/providers";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { fetchUser } from "@/lib/states/user";
import { getCookie } from "@/lib/cookie";

import "../globals.css";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

const hasToken = getCookie("accessToken");

const EmailLogin = lazy(() => import("@/components/auth/email-login"));

const RootComponent = () => {
  if (!hasToken) {
    return <EmailLogin />;
  }

  return <Outlet />;
};

export const Route = createRootRoute({
  component: () => {
    return (
      <Providers>
        <Suspense
          fallback={
            <div className="loader">
              <MainLoader />
            </div>
          }
        >
          <RootComponent />
        </Suspense>
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
      </Providers>
    );
  },
});
