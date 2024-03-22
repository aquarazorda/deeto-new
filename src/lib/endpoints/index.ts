export const endpoints = {
  MAGIC_LINK_AUTH: "v1/magicLink/use",
  MAGIC_SHORTEN_LINK_AUTH: "v1/magicLink/useShorten",
  PRIMARY_REGISTRATION: "v1/auth/registerPasswordless",
  LOGIN_WITH_MAIL_PATH: "v1/auth/login",
  LOGIN_PARTIAL_PATH: "v1/magicLink/usePartial",
  RESEND_PARTIAL_PATH: "v1/magicLink/resendCode",
  REFRESH_TOKEN: "v1/auth/refreshToken",
  SEND_NEW_MAGIC_LINK_PATH: "v1/magicLink/useShortenToRelogin",

  USER_PATH: "v2/user",
  ME_PATH: "v2/me",
  GUI_SETTINGS_PATH: "v2/me/guiSettings",
  DROPDOWN_LIST: "v2/me/dropdownLists/{dropdownID}",
  TIMEZONES_LIST: "v2/me/dropdownLists/timezones",
  REDEMPTION_PATH: "v2/me/redemptions",
  GET_ME_CONTRIBUTIONS: "v2/me/contributions",
  LATEST_USER_MEETINGS: "v2/me/meetings/latest",

  DASHBOARD_PATH: "v2/me/dashboard",
  STATISTIC_PATH: "v2/me/statisticsUrl",
  STATISTIC_DASHBOARD: "v2/me/dashboard/statistic",

  SCHEDULING_PATH: "v2/me/scheduling",
  NOTIFICATIONS_PATH: "v2/me/notifications",
  NOTIFICATIONS_MARK_AS_READ_PATH: (notificationId: string | number) =>
    `v2/me/notifications/${notificationId}/markAsRead`,
  NOTIFICATIONS_MARK__ALL_AS_READ_PATH: "v2/me/notifications/markAllAsRead",
  APPROVE_EULA_PATH: "v2/me/approvedEula",
  ME_EMAIL_PATH: "v2/me/email",

  GET_AUTHENTICATED_USER: (authenticatedUserID: string | number) =>
    `v2/authenticatedUser/${authenticatedUserID}`,
  AUTHENTICATED_USER_EMAIL_VALIDATION:
    "v2/authenticatedUser/invite/preValidation",

  VENDOR_PATH: "v2/vendor",
  VENDOR_CONTACT_PATH: (vendorId: string | number) => `v2/vendors/${vendorId}`,
  VENDOR_CONTACTS_PATH: "v2/vendor/contacts",
  VENDOR_CONTACTS_USER_PATH: (vendorContactID: string | number) =>
    `v2/vendorContacts/${vendorContactID}`,
  VENDOR_REWARDS_SETTINGS_PATH: "v2/vendor/rewardsSettings",

  VENDOR_CONTACTS_USER_LOCKED: (authenticatedUserID: string | number) =>
    `v2/authenticatedUser/${authenticatedUserID}/changeUserStatus/locked`,
  VENDOR_USER_LOCKED: (vendorContactId: string | number) =>
    `/v2/vendorContacts/${vendorContactId}/disable`,
  VENDOR_CONTACTS_USER_CONFIRMED: (authenticatedUserID: string | number) =>
    `v2/authenticatedUser/${authenticatedUserID}/changeUserStatus/confirmed`,
  VENDOR_CONTACTS_USER_DELETE: (authenticatedUserID: string | number) =>
    `v2/authenticatedUser/${authenticatedUserID}/changeUserStatus/deleted`,
  VENDOR_BANNER_VIDEO: "v2/vendor/bannerVideo",

  REFERENCE_INVITE_PATH: "v2/reference/create",
  PROSPECT_INVITE_PATH: "v2/prospect/create",
  REFERENCE_SEND_INVITATION: "v2/reference/sendInvitation",
  PROSPECT_SEND_INVITATION: "v2/prospect/sendInvitation",
  RECOMMENDED_REFERENCES: "v2/vendor/calculateRecommendedReference",
  RECOMMENDED_REFERENCES_EMPTY_BODIED:
    "v2/vendor/calculateRecommendedReferenceEmptyBody",

  PROSPECT_VALIDATION_PATH: "v2/prospect/invite/preValidation",
  PROSPECT_ADD_REFERENCES_PATH: (opportunityId: string | number) =>
    `v2/opportunities/${opportunityId}/addReferences`,
  PROSPECT_ADD_REFERENCES_SF_PATH: (accountContactId: string | number) =>
    `v2/prospect/${accountContactId}/addOpportunity`,
  INVITE_PREVIEW_PATH: "v2/me/notificationPreview",

  ACCOUNT_CONTACTS_PATH: (contactID: string | number) =>
    `v2/accountContacts/${contactID}`,
  ACCOUNT_CONTACTS_MEETINGS_INFO_PATH: (contactID: string | number) =>
    `v2/references/${contactID}/meetingsInfo`,
  ACCOUNT_CONTACTS_ATTENTION_PATH: (accountContactId: string | number) =>
    `v2/accountContacts/${accountContactId}/attentions`,
  ACCOUNT_CONTACTS_UPCOMING_MEETINGS: (accountContactId: string | number) =>
    `v2/accountContacts/${accountContactId}/upcomingMeetings`,
  ACCOUNT_MEETINGS_PATH: (contactID: string | number) =>
    `v2/accountContacts/${contactID}/meetings`,
  ACCOUNT_CONTRIBUTIONS_PATH: (contactID: string | number) =>
    `/v2/accountContacts/${contactID}/contributions`,
  REFERENCES_CARDS_PATH: "v2/accountContacts/search/reference",
  PROSPECTS_CARDS_PATH: "v2/accountContacts/search/prospect",
  PROSPECTS_CARDS_DASHBOARD_PATH:
    "v2/accountContacts/search/prospect/dashboard",
  GENERATE_MAGIC_LINK_PROFILE: (accountContactId: string | number) =>
    `v2/accountContacts/${accountContactId}/generateMagicLink?partial=true`,
  GENERATE_MAGIC_LINK_PROFILE_BY_AUTH_ID: (partial: string | number) =>
    `v2/authenticatedUser/generatemagiclink?partial=${partial}`,
  RESEND_NOTIFICATION_PROFILE: (accountContactId: string | number) =>
    `v2/accountContacts/${accountContactId}/resendNotification`,
  SALES_COMPANION_PATH: "v2/accountContacts/search/livecompanion",
  ENGAGEMENT_REPORT_PATH: (opportunityId: string | number) =>
    `/v2/opportunities/${opportunityId}/feedback`,
  PROSPECT_EMAIL_BODY: (accountContactId: string | number) =>
    `/v2/prospects/${accountContactId}/emailbody`,
  REFERENCE_EMAIL_BODY: (accountContactId: string | number) =>
    `/v2/references/${accountContactId}/emailbody`,

  GET_ATTENTIONS_LIST_PATH: "v2/attentions/list",
  GET_ATTENTIONS_COUNTS_PATH: "v2/attentions/counts",

  MEETINGS_SEARCH_PATH: "v2/meetings/search",
  MEETING_PATH: (meetingID: string) => `v2/meetings/${meetingID}`,
  MEETING_FEEDBACK_PATH: (meetingID: string) =>
    `v2/meetings/${meetingID}/feedback`,
  MEETING_STATISTIC_PATH: (meetingID: string) =>
    `v2/meetings/${meetingID}/statistic`,
  MEETING_CANCEL_PATH: (meetingID: string) => `v2/meetings/${meetingID}/cancel`,
  SCHEDULED_TIMESLOTS_ACCEPT_PATH: (scheduledTimeslotId: string) =>
    `v2/scheduledTimeslots/${scheduledTimeslotId}/markAsAccepted`,

  MEETING_ATTENTION: (attentionId: string) =>
    `v2/attentions/dismiss/${attentionId}`,
  GENERATE_MAGIC_LINK: (attentionId: string) =>
    `v2/attentions/copyLink/${attentionId}`,
  RESEND_NOTIFICATION: (attentionId: string) =>
    `v2/attentions/resend/${attentionId}`,

  MEETINGS_PREJOIN_PATH: (meetingID: string) =>
    `v2/meetings/${meetingID}/preJoin`,
  MEETINGS_JOIN_PATH: (meetingID: string) => `v2/meetings/${meetingID}/join`,
  MEETINGS_LEAVE_PATH: (meetingID: string) => `v2/meetings/${meetingID}/leave`,
  MEETINGS_ADD_MEMBER: (meetingID: string) =>
    `v1/meetings/${meetingID}/addMember`,

  BLACKOUT_DATES: (meetingId: string, fromDate: string, toDate: string) =>
    `v2/meetings/${meetingId}/scheduledTimeslots/blackoutDates/${fromDate}/${toDate}`,
  SCHEDULED_TIMESLOTS: (meetingId: string) =>
    `v2/meetings/${meetingId}/scheduledTimeslots`,

  REFERENCES_BY_OPPORTUNITIES_PATH: (opportunityId: string) =>
    `v2/opportunities/${opportunityId}/selectedReferences`,

  S3_SIGNED_URL: "v2/s3/getSignedUrl",

  LANGUAGES_URL: "v2/languages",

  GET_ACCOUNTS_PATH: "v2/routing",
  SWITCH_ACCOUNT_PATH: (accountId: string) => `v2/routing/switch/${accountId}`,

  GET_TEXT_ENHANCEMENT: "v2/ai/textEnhancement",

  CONTRIBUTION_STEPS_PATH: "v2/contributionSteps",
  CONTRIBUTION_STEP_PATH: (stepName: string) =>
    `v2/contributionSteps/${stepName}`,

  GET_ACCOUNT_DATA: (sfContactId: string) =>
    `v2/salesforce/read/contact/${sfContactId}`,
  GET_OPPORTUNITY: (sfOpportunityId: string) =>
    `v2/salesforce/read/opportunity/${sfOpportunityId}`,
  GET_LOCKED_FIELDS: "v2/vendor/salesforce/lockedFields",
  GET_ACCOUNT_OPPORTUNITY: (accountContactId: string) =>
    `v2/accountContacts/${accountContactId}/opportunities`,

  CUSTOMIZED_FORM_PATH: "v2/customizedForms",
  ORDERED_CUSTOMIZED_FORM_PATH: "v2/customizedForms/reorder",
  CUSTOMIZED_FORM_COMPUTED: (referenceField: string, value: string) =>
    `v2/customizedForms/computed?referenceField=${referenceField}&value=${value}`,

  RATE_CONTRIBUTION:
    "v2/selectedReferenceContributions/:selectedReferenceContributionId/rateContribution",
  VIEW_CONTRIBUTION:
    "v2/selectedReferenceContributions/:selectedReferenceContributionId/viewContribution",

  REFERRAL_PATH: "v2/referrals",
  REFERRAL_PROFILE_PATH: "v2/referrals/:id",
  REFERRALS_BY_ACCOUNT_CONTACT_ID_PATH: "v2/accountContacts/:id/referrals",
  DELETE_REFERRAL_PATH: "v2/referrals/:id/delete",
  REFERRAL_CHANGE_STATUS_PATH: "v2/referrals/:id/change-status",
  REFERRAL_CHANGE_REJECTION_REASON_PATH: "v2/referrals/:id/reject",
  REFERRAL_PRE_VALIDATE_EMAIL_PATH: "v2/referrals/prevalidate-email",

  REFERRAL_PROGRAMS_PATH: "v2/referralPrograms",
  REFERRAL_PROGRAM_PROFILE_PATH: "v2/referralPrograms/:id",
  REFERRAL_PROGRAMS_SET_DEFAULT_PATH:
    "v2/referralPrograms/:programId/setAsDefault",
  REFERRAL_PROGRAMS_TEMPLATES_PATH: "v2/referralProgramTemplates",

  CONTRIBUTIONS_ALL_PATH: "v2/contributions/search",
  CONTRIBUTIONS_CHANGE_VENDOR_PUBLISH_POLICY:
    "v2/contributions/{contributionId}/change-vendor-publish-policy",
  CONTRIBUTIONS_REQUEST_PATH: "v2/contributions/request",
  CONTRIBUTIONS_CREATE_DRAFT_PATH: (type: string) =>
    `/v2/contribution/draft/${type}`,
  SET_CONTRIBUTION_STYLES_REQUEST_PATH:
    "v2/contributions/{contributionId}/styleAndColor",
  TOGGLE_CONTRIBUTION_PERMISSION_PATH: (contributionId: string) =>
    `/v2/contributions/${contributionId}/togglePermission`,

  SELF_REGISTRATION_DETAILS_PATH: "anonymous/url/:url",
  SELF_REGISTRATION_PATH: "anonymous/vendors/:vendorId/reference",
  SELF_REGISTRATION_DROPDOWN_PATH: "anonymous/dropdownLists/{dropdownID}",

  CONVERT_TO_SELF_REGISTRATION: "v2/me/convertToSelfRegister",

  FIELD_MAPPING: "v2/crm/:crm_provider/mappingSettings",
  FIELD_MAPPING_SOURCES: "v2/crm/:crm_provider/mappingSources",
  FIELD_MAPPING_SOURCE_FIELDS: "v2/crm/:crm_provider/mappingSourceFields",
} as const;
