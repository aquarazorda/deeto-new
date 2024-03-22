import MainLoader from "@/assets/main-loader.svg?react";
import { Providers } from "@/components/providers";
import { createRootRoute, Outlet } from "@tanstack/react-router";

import "../globals.css";
import { fetchUser } from "@/lib/states/user";

await fetchUser();

export const Route = createRootRoute({
  component: () => {
    return (
      <Providers>
        <Outlet />
      </Providers>
    );
  },
  pendingComponent: () => (
    <div className="loader">
      <MainLoader />
    </div>
  ),
});
