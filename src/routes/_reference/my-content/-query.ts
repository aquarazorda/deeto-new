import { endpoints } from "@/lib/endpoints";
import { queryKeys } from "@/lib/query";
import { api } from "@/lib/requests";
import { contributionsRequestSchema } from "@/schemas/contributions";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useMyContributionsQuery() {
  return useSuspenseQuery({
    queryKey: queryKeys.REFERENCE_MY_CONTENT,
    queryFn: () =>
      api.get(endpoints.GET_ME_CONTRIBUTIONS, contributionsRequestSchema),
  });
}
