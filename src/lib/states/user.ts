import { create } from "zustand";
import { api } from "../requests";
import { z } from "zod";
import { userSchema } from "@/schemas/user";
import { getCookie, setCookie } from "../cookie";
import { Err } from "ts-results";
import { P, match } from "ts-pattern";

type UserState = z.infer<typeof userSchema>;

export const useUser = create<UserState>(() => ({
  me: {},
  vendor: {},
}));

const refreshTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

const getAccessTokenWithRefreshToken = async (refreshToken: string) => {
  const res = await api.post("REFRESH_TOKEN", refreshTokenSchema, {
    refreshToken,
  });

  if (!res.ok) {
    setCookie("accessToken", "", 0, true);
    setCookie("refreshToken", "", 0, true);
  } else {
    setTokens(res.val);
  }

  return res;
};

const userFetchReq = () => api.get("USER_PATH", userSchema);

const validateAndSetUser = (data: Awaited<ReturnType<typeof userFetchReq>>) => {
  if (data.ok) {
    useUser.setState(data.val);
    return data;
  }

  useUser.setState({});
  return data;
};

const fetchUserFn = async ({ accessToken, refreshToken }: Partial<Tokens>) => {
  return match([accessToken, refreshToken])
    .with([undefined, undefined], () => {
      useUser.setState({});
      return new Err("No tokens");
    })
    .with([undefined, P.select(P.string)], (refreshToken) =>
      getAccessTokenWithRefreshToken(refreshToken)
        .then(userFetchReq)
        .then(validateAndSetUser),
    )
    .otherwise(() =>
      userFetchReq()
        .then(validateAndSetUser)
        .then(async (res) => {
          if (res.ok) return res;

          setCookie("accessToken", "", 0, true);
          await fetchUserFn({ refreshToken });

          return new Err("No tokens");
        }),
    );
};

export const fetchUser = async () => {
  if (window.location.href.includes("/m?")) {
    return;
  }

  return fetchUserFn({
    accessToken: getCookie("accessToken"),
    refreshToken: getCookie("refreshToken"),
  });
};

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

const setTokens = ({ accessToken, refreshToken }: Tokens) => {
  setCookie("accessToken", accessToken, 172800, true);
  setCookie("refreshToken", refreshToken, 604800, true);
};

export const setTokensAndGetUser = async (tokens: Tokens) => {
  setTokens(tokens);
  return await fetchUser();
};
