import { z } from "zod";
import { customizedFormValueSchema } from "./customized-form";
import { avatarSchema, userStatusSchema } from "./authenticated-user";
import { onboardingStepSchema } from "./onboarding";
import {
  CONTRIBUTION_USAGE_POLICY_ENUM,
  VENDOR_PUBLISH_POLICY,
} from "@/lib/types/contributions/vendor";

export const addonSchema = z.object({
  type: z.string(),
  status: z.boolean(),
  label: z.string().optional(),
});

const imageBankSchema = z.object({
  banner: z.record(z.string().url()),
  square: z.record(z.string().url()),
});

const metadataSchema = z.object({
  paragraphs: z.array(z.string()),
  quote: z.string(),
  review: z.string(),
  kpi: z.nullable(z.unknown()),
  imageBank: imageBankSchema,
});

export const contributionSchema = z.object({
  contributionId: z.string().uuid(),
  type: z.enum([
    "Review",
    "VideoTestimonial",
    "Quote",
    "QuestionsAndAnswers",
    "CaseStudy",
  ]),
  text: z.string(),
  previewText: z.string(),
  rewards: z.number(),
  views: z.number(),
  usagePolicy: z.nativeEnum(CONTRIBUTION_USAGE_POLICY_ENUM),
  usagePolicyChangedAt: z.string().datetime(),
  vendorPublishPolicy: z.nativeEnum(VENDOR_PUBLISH_POLICY),
  vendorPublishPolicyChangedAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  url: z.string().url().optional(),
  faq: z.array(customizedFormValueSchema).optional(),
  firstQA: z
    .object({
      question: z.string(),
      answer: z.string(),
    })
    .optional(),
  thumbnail: z.string().url().optional(),
  style: z.enum(["template1"]).optional(),
  colorSchema: z.enum(["purple"]).optional(),
  metadata: metadataSchema.optional(),
});

const profileSchema = z.object({
  avatar: avatarSchema,
  companyName: z.string(),
  firstName: z.string(),
  g2ReviewUrl: z.string().url().nullable(),
  influenceLevel: z.string(),
  lastName: z.string(),
  title: z.string(),
  userStatus: userStatusSchema,
});

export const contributionsRequestSchema = z.object({
  addons: z.array(addonSchema),
  contributions: z.array(contributionSchema),
  external: z.array(contributionSchema),
  profile: profileSchema,
  steps: z.array(onboardingStepSchema),
});
