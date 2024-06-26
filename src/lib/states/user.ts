import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { api } from "../requests";
import { z } from "zod";
import { userSchema } from "@/schemas/user";
import { getCookie, setCookie } from "../cookie";
import { Err } from "ts-results";
import { P, match } from "ts-pattern";
import { endpoints } from "../endpoints";

type UserState = z.infer<typeof userSchema>;

export const useUser = create<UserState>(() => ({
  // @ts-ignore
  me: {}, // @ts-ignore
  vendor: {},
}));

const refreshTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const getAccessTokenWithRefreshToken = async (refreshToken: string) => {
  const res = await api.post(endpoints.REFRESH_TOKEN, refreshTokenSchema, {
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

const userFetchReq = () => api.get(endpoints.USER_PATH, userSchema);

const validateAndSetUser = (data: Awaited<ReturnType<typeof userFetchReq>>) => {
  if (data.ok) {
    useUser.setState(data.val);
    localStorage.setItem("user", JSON.stringify(data.val));
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

export const fetchUser = async (fromLocal?: boolean) => {
  // if (window.location.href.includes("/m?")) {
  //   return;
  // }
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");

  if (!accessToken && !refreshToken) {
    return;
  }

  if (fromLocal) {
    const res = JSON.parse(localStorage.getItem("user") || "{}");

    if (res) {
      fetchUserFn({
        accessToken: getCookie("accessToken"),
        refreshToken: getCookie("refreshToken"),
      });
      useUser.setState(res);
      return res;
    }
  }

  return fetchUserFn({
    accessToken: getCookie("accessToken"),
    refreshToken: getCookie("refreshToken"),
  });
};

export const useUserPrivileges = () =>
  useUser(
    useShallow((state) => ({
      isVendor: state.me?.isVendor,
      isProspect: state.me?.isProspect,
      isReference: state.me?.isReference,
    })),
  );

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
