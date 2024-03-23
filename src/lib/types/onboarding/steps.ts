export enum StepNameEnum {
  QUOTE = "Quote",
  REVIEW = "Review",
  VIDEO_TESTIMONIAL = "Video Testimonial",
  QUESTIONS_AND_ANSWERS = "Q&A",
  USER_STORY = "User story",
}

export enum StepIdentifierEnum {
  QUOTE = "quote",
  REVIEW = "review",
  VIDEO_TESTIMONIAL = "videoTestimonial",
  USER_STORY = "userStory",
  ADD_ONS = "addOns",
  QUESTIONS_AND_ANSWERS = "questionsAndAnswers",
  G2_REVIEW = "g2Review",
}

export const contribTypeToStepIdentifier = {
  Quote: StepIdentifierEnum.QUOTE,
  Review: StepIdentifierEnum.REVIEW,
  VideoTestimonial: StepIdentifierEnum.VIDEO_TESTIMONIAL,
  CaseStudy: StepIdentifierEnum.USER_STORY,
  QuestionsAndAnswers: StepIdentifierEnum.QUESTIONS_AND_ANSWERS,
  AddOns: StepIdentifierEnum.ADD_ONS,
  g2Review: StepIdentifierEnum.G2_REVIEW,
};

export type StepName = `${StepIdentifierEnum}`;

export enum StepStatusEnum {
  HIDDEN = "hidden",
  NOT_STARTED = "notStarted",
  STARTED = "started",
  SKIPPED = "skipped",
  FINISHED = "finished",
  BLOCKED = "blocked",
}

export type StepRewards = {
  getRewardsForSubmit?: boolean;
  getRewardsForView?: boolean;
  submit?: number;
  view?: number;
  rewardedForSubmit?: boolean;
  approve?: number;
};

export type StepData = {
  identifier: StepName;
  name: `${StepNameEnum}`;
  status: `${StepStatusEnum}`;
  rewards?: StepRewards;
  subSteps?: Record<string, boolean>;
};
