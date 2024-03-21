import { Providers } from "@/components/providers";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export const Route = createRootRoute({
  component: () => (
    <Providers>
      <div className="flex gap-2 p-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
      </div>
      <hr />
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </Providers>
  ),
});
