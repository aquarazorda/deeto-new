import { useUserPrivileges } from "@/lib/states/user";
import {
  CONTRIBUTION_USAGE_POLICY_ENUM,
  VENDOR_PUBLISH_POLICY,
} from "@/lib/types/contributions/vendor";
import { StepIdentifierEnum } from "@/lib/types/onboarding/steps";
import { contributionSchema } from "@/schemas/contributions";
import { match } from "ts-pattern";
import { z } from "zod";

export const calcStatusLabelId = (
  contribution: z.infer<typeof contributionSchema>,
): string => {
  const { isVendor } = useUserPrivileges();

  if (isVendor) {
    return match(contribution.vendorPublishPolicy)
      .with(VENDOR_PUBLISH_POLICY.APPROVED, () => "published")
      .with(VENDOR_PUBLISH_POLICY.UNDER_REVIEW, () => "pending")
      .otherwise(() => "hidden");
  }

  return match(contribution.usagePolicy)
    .with(CONTRIBUTION_USAGE_POLICY_ENUM.CONSENT_TO_USE, () => "submitted")
    .with(
      CONTRIBUTION_USAGE_POLICY_ENUM.REVOKED,
      () => "contribution_permission_revoked",
    )
    .otherwise(() => "draft");
};

export const isExternal = (type: StepIdentifierEnum | string) =>
  match(type)
    .with(StepIdentifierEnum.G2_REVIEW, "g2review", () => true)
    .otherwise(() => false);
