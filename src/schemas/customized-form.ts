import { z } from "zod";
import { vendorSchema } from "./vendor";

export const customizedFormFieldOptionsSchema = z.object({
  customizedFormFieldOptionId: z.string().uuid(),
  customizedFormFieldId: z.string().uuid(),
  caption: z.string(),
  value: z.string(),
  plainFormatting: z.string(),
  inputFormatting: z.string(),
  optionOrder: z.number(),
  isDefault: z.boolean(),
  isPreSelected: z.boolean(),
  isSelectable: z.boolean(),
  isVisible: z.boolean(),
});

const formTypeSchema = z.enum([
  "accountContactDetails",
  "vendorContactDetails",
  "Q&A",
  "referenceUserstoryKPIs",
]);

const customizedFormFieldSchema = z.object({
  customizedFormFieldId: z.string(),
  vendorId: z.string(),
  formType: formTypeSchema,
  fieldName: z.string(),
  fieldLabel: z.string(),
  fieldType: z.enum([
    "single",
    "multiple",
    "text",
    "number",
    "date",
    "time",
    "file",
    "boolean",
  ]),
  fieldRepresentation: z.enum([
    "text",
    "select",
    "checkbox",
    "radio",
    "textarea",
    "date",
    "time",
    "file",
    "boolean",
    "currencyDollar",
  ]),
  fieldValidation: z.enum([
    "name",
    "url",
    "number",
    "date",
    "time",
    "file",
    "boolean",
    "none",
  ]),
  isMandatory: z.boolean(),
  appearanceOrder: z.number().nullable(),
  optionsOrderBy: z.enum([
    "number",
    "captionAlphabetical",
    "valueAlphabetical",
  ]),
  isUsedInLargeTabInfo: z.boolean(),
  isUsedInSmallTabInfo: z.boolean(),
  matchingAlgorithm: z.enum(["none", "points", "disqulifier"]),
  isPubliclyVisible: z.boolean(),
  vendor: vendorSchema.optional(),
  fieldOptions: z.array(customizedFormFieldOptionsSchema).optional(),
});

export const customizedFormValueSchema = z.object({
  customizedFormValueID: z.string().uuid().optional(),
  formType: formTypeSchema,
  customizedFormFieldId: z.string().uuid(),
  fieldName: z.string(),
  fieldLabel: z.string(),
  valueCaption: z.string().nullable(),
  value: z.string(),
  updatedBy: z.string().uuid().nullable(),
  customizedFormField: customizedFormFieldSchema.optional(),
});
