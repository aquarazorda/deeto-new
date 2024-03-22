import { getCookie } from "@/lib/cookie";
import { useUser } from "@/lib/states/user";
import { Navigate, createLazyFileRoute } from "@tanstack/react-router";
import { match } from "ts-pattern";
import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { Spinner } from "@/components/loaders/spinner";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const hasToken = useMemo(() => getCookie("accessToken"), []);

  const privileges = useUser(
    useShallow((state) => ({
      isVendor: state.me?.isVendor,
      isProspect: state.me?.isProspect,
      isReference: state.me?.isReference,
    })),
  );

  if (!hasToken) {
    return <Navigate to="/login-with-email" />;
  }

  return match(privileges)
    .with({ isReference: true }, () => <Navigate to="/reference" />)
    .with(
      { isReference: undefined, isProspect: undefined, isVendor: undefined },
      () => <Spinner />,
    )
    .otherwise(() => "Not implemented yet.");
}
