import { z } from "zod";

export const customizedFormValue = z.object({
  customizedFormFieldId: z.string().uuid(),
  formType: z.string().optional(),
  fieldName: z.string().optional(),
  fieldLabel: z.string().optional(),
  valueCaption: z.string().nullable().optional(),
  value: z.string().or(z.array(z.string())),
});
