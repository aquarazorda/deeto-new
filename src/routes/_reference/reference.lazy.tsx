import { createLazyFileRoute } from "@tanstack/react-router";

function ReferenceMainRoute() {
  return (
    <div className="h-screen w-screen bg-primary-purple">
      <div className="p-4">I'm a ref</div>
    </div>
  );
}

export const Route = createLazyFileRoute("/_reference/reference")({
  component: ReferenceMainRoute,
});
