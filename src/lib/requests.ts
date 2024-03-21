import { Err, Ok } from "ts-results";
import { ZodType, z } from "zod";
import { getCookie } from "./cookie";
import { BACKEND_URL } from "@/config";

const responseSchema = z.object({
  code: z.number(),
  message: z.literal("success"),
  data: z.any().optional(),
});

const fetcher = async <T extends ZodType>(
  url: string,
  schema: T,
  props?: RequestInit,
) => {
  try {
    const res = await fetch(BACKEND_URL + url, {
      ...props,
      headers: {
        ...props?.headers,
        Authorizationtoken: getCookie("accessToken") ?? "",
      },
    })
      .then((res) => res.json())
      .then(responseSchema.safeParse);

    if (!res.success) {
      return new Err(res.error.toString());
    }

    if (res.data.code !== 0 && res.data.message !== "success") {
      return new Err(res.data.message);
    }

    const validated = schema.safeParse(res.data.data);
    if (!validated.success) {
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

const post = <T extends ZodType, U>(url: string, body: U, schema: T) =>
  fetcher(url, schema, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

export const api = {
  get,
  post,
};
