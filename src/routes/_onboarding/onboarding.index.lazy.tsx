import useStepsData from "@/lib/queries/onboarding/useStepsData";
import { Navigate, createLazyFileRoute } from "@tanstack/react-router";

const Component = () => {
  const { data } = useStepsData();

  if (!data?.ok) {
    return <Navigate to="/onboarding/quote" />;
  }

  return <Navigate to={"/onboarding/" + data.val.steps[0].identifier} />;
};

export const Route = createLazyFileRoute("/_onboarding/onboarding/")({
  component: Component,
});
