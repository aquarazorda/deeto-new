import { create } from "zustand";
import { api } from "../requests";
import { endpoints } from "../endpoints";
import { z } from "zod";
import { userSchema } from "@/schemas/user";
import { getCookie } from "../cookie";

type UserState = Partial<z.infer<typeof userSchema>>;

export const useUser = create<UserState>(() => ({}));

export const fetchUser = async () => {
  if (!getCookie("accessToken")) {
    useUser.setState({});
    return;
  }

  const res = await api.get(endpoints.USER_PATH, userSchema);

  if (res.ok) {
    useUser.setState(res.val);
    return;
  }

  useUser.setState({});
};
