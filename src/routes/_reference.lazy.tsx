import { useUser } from "@/lib/states/user";
import { Navigate, Outlet, createLazyFileRoute } from "@tanstack/react-router";
import { useShallow } from "zustand/react/shallow";

export const Route = createLazyFileRoute("/_reference")({
  component: () => {
    const isReference = useUser(useShallow((state) => state?.me?.isReference));
    console.log("lytc");

    if (!isReference) {
      return <Navigate to="/" />;
    }

    return <Outlet />;
  },
});
