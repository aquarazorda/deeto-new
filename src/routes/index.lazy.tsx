import { getCookie } from "@/lib/cookie";
import { Navigate, createLazyFileRoute } from "@tanstack/react-router";
import { match } from "ts-pattern";
import { useMemo } from "react";
import { Spinner } from "@/components/loaders/spinner";
import { useUserPrivileges } from "@/lib/states/user";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const hasToken = useMemo(() => getCookie("accessToken"), []);

  if (!hasToken) {
    return <Navigate to="/login-with-email" />;
  }

  const privileges = useUserPrivileges();

  return match(privileges)
    .with({ isReference: true }, () => <Navigate to="/dashboard" />)
    .with(
      { isReference: undefined, isProspect: undefined, isVendor: undefined },
      () => <Spinner />,
    )
    .otherwise(() => null);
  // .otherwise(() => <Navigate to="/login-with-email" />);
}
