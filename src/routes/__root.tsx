import MainLoader from "@/assets/main-loader.svg?react";
import { Providers } from "@/components/providers";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

import "../globals.css";

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
          <Outlet />
        </Suspense>
      </Providers>
    );
  },
});
