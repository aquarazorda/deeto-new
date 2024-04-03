import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { api } from "../requests";
import { endpoints } from "../endpoints";
import { useUser } from "../states/user";
import { profileSchema } from "@/schemas/user";

const schema = profileSchema.omit({ privileges: true }).partial();

export default function useSaveProfile() {
  const user = useUser();

  return useMutation({
    mutationFn: async (profile: z.infer<typeof schema>) => {
      const res = await api.patch(endpoints.ME_PATH, schema, profile);

      if (res.ok) {
        useUser.setState({
          ...user,
          me: {
            ...user.me,
            ...profile,
          },
        });
      }

      return res;
    },
  });
}
