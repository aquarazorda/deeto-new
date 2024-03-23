import { z } from "zod";
import { accountContactSchema } from "./accountContact";
import { customizedFormValueSchema } from "./customized-form";
import { avatarSchema } from "./authenticated-user";
import { vendorSettingsSchema } from "./vendor";

const meSchema = z
  .object({
    accountContacts: z.array(accountContactSchema).optional(),
    avatar: z.object({
      url: z.string().nullable().optional(),
    }),
    customizedFormValues: z.array(customizedFormValueSchema).optional(),
    privileges: z.array(z.enum(["reference", "vendor", "prospect"])),
  })
  .transform(({ privileges, ...rest }) => ({
    ...rest,
    isVendor: privileges.includes("vendor"),
    isReference: privileges.includes("reference"),
    isProspect: privileges.includes("prospect"),
  }));

const crmIntegrationSchema = z.object({
  provider: z.enum(["salesforce", "hubspot"]),
  organizationId: z.nullable(z.string()),
});

const vendorSchema = z.object({
  vendorId: z.string().uuid(),
  name: z.string(),
  accountLevel: z.enum(["trial", "notActivated", "activated", "active"]),
  sendEmailOnBehalf: z.nullable(z.string()),
  activationDate: z.string().datetime(),
  defaultCreditAmountPerMeeting: z.number(),
  avatarId: z.string().uuid(),
  appLogoId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  appLogo: avatarSchema,
  avatar: avatarSchema,
  settings: vendorSettingsSchema,
  crmIntegrations: z.array(crmIntegrationSchema),
});
export const userSchema = z.object({
  me: meSchema,
  vendor: vendorSchema,
});
