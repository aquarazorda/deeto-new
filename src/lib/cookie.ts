import { useMemo } from "react";

export const useGetCookie = (name: string) =>
  useMemo(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));
    if (cookieValue) {
      const [_, item] = cookieValue.split("=");
      return decodeURIComponent(item);
    }

    return undefined;
  }, [name]);

export const getCookie = (name: string) => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
};

export const setCookie = (
  name: string,
  value: string,
  expiresIn: number,
  secure?: boolean,
) => {
  const date = new Date();
  date.setTime(date.getTime() + expiresIn * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie =
    name +
    "=" +
    encodeURIComponent(value) +
    "; " +
    expires +
    "; path=/" +
    (secure ? "; secure" : "");
};

export const removeCookie = (name: string) => setCookie(name, "", -1);
