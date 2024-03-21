import { z } from "zod";
import { accountContactSchema } from "./accountContact";
import { customizedFormValue } from "./customized-form";

const meSchema = z
  .object({
    accountContacts: z.array(accountContactSchema).optional(),
    avatar: z.object({
      url: z.string().optional(),
    }),
    customizedFormValues: z.array(customizedFormValue),
    privileges: z.array(z.enum(["reference", "vendor", "prospect"])),
  })
  .transform(({ privileges, ...rest }) => ({
    ...rest,
    isVendor: privileges.includes("vendor"),
    isReference: privileges.includes("reference"),
    isProspect: privileges.includes("prospect"),
  }));

export const userSchema = z.object({
  me: meSchema,
});