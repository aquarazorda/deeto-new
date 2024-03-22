import { create } from "zustand";
import { api } from "../requests";
import { z } from "zod";
import { userSchema } from "@/schemas/user";
import { getCookie, setCookie } from "../cookie";
import { Err } from "ts-results";
import { authResponseSchema } from "@/schemas/auth";

type UserState = Partial<z.infer<typeof userSchema>>;

export const useUser = create<UserState>(() => ({}));

export const fetchUser = async () => {
  if (!getCookie("accessToken")) {
    useUser.setState({});
    return new Err("No access token");
  }

  const res = await api.get("USER_PATH", userSchema);

  if (res.ok) {
    useUser.setState(res.val);
    return res;
  }

  useUser.setState({});
  return res;
};

export const setTokensAndGetUser = async ({
  accessToken,
  refreshToken,
}: z.infer<typeof authResponseSchema>) => {
  setCookie("accessToken", accessToken, 172800, true);
  setCookie("refreshToken", refreshToken, 604800, true);
  await fetchUser();
};
