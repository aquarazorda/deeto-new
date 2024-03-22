import { createLazyFileRoute } from "@tanstack/react-router";

function ReferenceMainRoute() {
  return <div className="p-4">I'm a ref</div>;
}

export const Route = createLazyFileRoute("/_reference/dashboard")({
  component: ReferenceMainRoute,
});
