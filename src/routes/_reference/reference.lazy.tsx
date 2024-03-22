import { createLazyFileRoute } from "@tanstack/react-router";

function ReferenceMainRoute() {
  return (
    <div className="bg-primary-purple h-screen w-screen">
      <div className="p-4">I'm a ref</div>
    </div>
  );
}

export const Route = createLazyFileRoute("/_reference/reference")({
  component: ReferenceMainRoute,
});
