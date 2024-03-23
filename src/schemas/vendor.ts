import { z } from "zod";
import { authenticatedUserSchema } from "./authenticated-user";

export const vendorContactSchema = z.object({
  vendorContactsId: z.string().uuid(),
  title: z.string(),
  authenticatedUser: authenticatedUserSchema,
  sendEmailOnBehalf: z.enum(["verified", "notVerified"]),
});

export const vendorSchema = z.object({
  vendorId: z.string().uuid(),
  name: z.string(),
  accountLevel: z.enum(["trial", "notActivated", "activated"]),
  defaultCreditAmountPerMeeting: z.number(),
  activationDate: z.string().datetime(),
  appLogo: z.object({
    url: z.string().url().optional(),
  }),
});

export const vendorSettingsSchema = z.object({
  vendorSettingsId: z.string().uuid(),
  vendorId: z.string().uuid(),
  isAllowedGiftCards: z.boolean(),
  isAllowedDonations: z.boolean(),
  emailBackgroundSettings: z.string(),
  referenceQuoteAIPrompt: z.string(),
  referenceCaseStudyAIPrompt: z.string(),
  quoteStepEnabled: z.boolean(),
  reviewStepEnabled: z.boolean(),
  questionsAndAnswersStepEnabled: z.boolean(),
  caseStudyStepEnabled: z.boolean(),
  testimonialStepEnabled: z.boolean(),
  g2ReviewEnabled: z.boolean(),
  personalizedVideoStoryboardId: z.nullable(z.number()),
  addonsStepEnabled: z.boolean(),
  publicSpeakingEnabled: z.boolean(),
  webinarsEnabled: z.boolean(),
  productFeedbackEnabled: z.boolean(),
  socialPresenceEnabled: z.boolean(),
  roundTableEnabled: z.boolean(),
  podcastEnabled: z.boolean(),
  firstToKnowEnabled: z.boolean(),
  interviewsEnabled: z.boolean(),
  collaborationNewProductEnabled: z.boolean(),
  advisoryBoardEnabled: z.boolean(),
  contentApprovalRequired: z.boolean(),
  deetoReviewRequired: z.boolean(),
  allowAnonymousReference: z.boolean(),
  referenceRegistrationUrl: z.string(),
  languagePacks: z.string(),
  giftcardOptions: z.string().nullable(),
  g2ReviewUrl: z.string().url(),
  meetingLengthInMinutes: z.number(),
  currencyPrefix: z.string().optional(),
  currencyPostfix: z.string().optional(),
  currencyFallback: z.string(),
  referralUrl: z.nullable(z.string()),
});
