import MainLoader from "@/assets/main-loader.svg?react";
import { Providers } from "@/components/providers";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import "../globals.css";
import { fetchUser } from "@/lib/states/user";
import { QueryClient } from "@tanstack/react-query";

await fetchUser();

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
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
  },
);
