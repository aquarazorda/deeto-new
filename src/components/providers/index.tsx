import { ReactNode, Suspense, lazy } from "react";
import { Toaster } from "../ui/sonner";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

const TanStackQueryDevTools =
  process.env.NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/react-query-devtools").then((res) => ({
          default: res.ReactQueryDevtools,
        })),
      );

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <Toaster position="top-right" />
      <Suspense>
        <TanStackQueryDevTools initialIsOpen={false} />
      </Suspense>
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  );
};
