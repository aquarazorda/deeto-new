import { Err, Ok } from "ts-results";
import { ZodType, z } from "zod";
import { getCookie } from "./cookie";
import { BACKEND_URL } from "@/config";
import { fetchUser, getAccessTokenWithRefreshToken } from "./states/user";

const responseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.unknown().optional(),
});

const genericFetch = (url: string, props?: RequestInit) =>
  fetch(BACKEND_URL + url, {
    ...props,
    headers: {
      ...props?.headers,
      Authorizationtoken: getCookie("accessToken") ?? "",
    },
  })
    .then((res) => res.json())
    .then(responseSchema.safeParse);

const fetcher = async <T extends ZodType>(
  url: string,
  schema: T,
  props?: RequestInit,
) => {
  try {
    let res = await genericFetch(url, props);

    if (!res.success) {
      console.error(res.error);
      return new Err(res.error.toString());
    }

    if (res.data.code === 401) {
      const rt = getCookie("refreshToken");
      if (rt) {
        const refreshTokenRes = await getAccessTokenWithRefreshToken(rt);
        if (refreshTokenRes.ok) {
          fetchUser();
          res = await genericFetch(url, props);
          if (!res.success) {
            console.error(res.error);
            return new Err(res.error.toString());
          }
        }
      }
    }

    if (res.data.code !== 0 && res.data.message !== "success") {
      return new Err(res.data.message);
    }

    const validated = schema.safeParse(res.data.data);
    if (!validated.success) {
      console.error(validated.error);
      return new Err(validated.error.toString());
    }

    return new Ok(validated.data as z.infer<T>);
  } catch (e) {
    const err = responseSchema.safeParse(e);
    if (err.success) {
      return new Err(err.data.message);
    }

    return new Err(err.error.toString());
  }
};

const get = <T extends ZodType>(url: string, schema: T) =>
  fetcher<T>(url, schema);

const fetcherWithBody =
  (method: "POST" | "PATCH") =>
  async <T extends ZodType, U>(url: string, schema: T, body: U) => {
    return fetcher(url, schema, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

const post = fetcherWithBody("POST");

const post_ =
  <T extends ZodType, U>(url: string, schema: T) =>
  (body: U) =>
    post(url, schema, body);

const patch = fetcherWithBody("PATCH");

const patch_ =
  <T extends ZodType, U>(url: string, schema: T) =>
  (body: U) =>
    patch(url, schema, body);

export const api = {
  get,
  post,
  post_,
  patch,
  patch_,
};
