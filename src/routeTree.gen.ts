/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PublicPartialAuthRouteImport } from './routes/_public/partial-auth.route'
import { Route as PublicMIndexImport } from './routes/_public/m.index'

// Create Virtual Routes

const ReferenceLazyImport = createFileRoute('/_reference')()
const PublicLazyImport = createFileRoute('/_public')()
const OnboardingLazyImport = createFileRoute('/_onboarding')()
const IndexLazyImport = createFileRoute('/')()
const ReferenceSettingsLazyImport = createFileRoute('/_reference/_settings')()
const PublicLoginWithEmailLazyImport = createFileRoute(
  '/_public/login-with-email',
)()
const ReferenceReferralsIndexLazyImport = createFileRoute(
  '/_reference/referrals/',
)()
const ReferenceMyContentIndexLazyImport = createFileRoute(
  '/_reference/my-content/',
)()
const ReferenceDashboardIndexLazyImport = createFileRoute(
  '/_reference/dashboard/',
)()
const OnboardingOnboardingIndexLazyImport = createFileRoute(
  '/_onboarding/onboarding/',
)()
const OnboardingOnboardingReviewLazyImport = createFileRoute(
  '/_onboarding/onboarding/review',
)()
const OnboardingOnboardingQuoteLazyImport = createFileRoute(
  '/_onboarding/onboarding/quote',
)()
const OnboardingOnboardingQuestionsAndAnswersLazyImport = createFileRoute(
  '/_onboarding/onboarding/questionsAndAnswers',
)()
const ReferenceMyContentTypeIndexLazyImport = createFileRoute(
  '/_reference/my-content/$type/',
)()
const ReferenceSettingsSettingsMyProfileLazyImport = createFileRoute(
  '/_reference/_settings/settings/my-profile',
)()

// Create/Update Routes

const ReferenceLazyRoute = ReferenceLazyImport.update({
  id: '/_reference',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/_reference.lazy').then((d) => d.Route))

const PublicLazyRoute = PublicLazyImport.update({
  id: '/_public',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/_public.lazy').then((d) => d.Route))

const OnboardingLazyRoute = OnboardingLazyImport.update({
  id: '/_onboarding',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/_onboarding.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ReferenceSettingsLazyRoute = ReferenceSettingsLazyImport.update({
  id: '/_settings',
  getParentRoute: () => ReferenceLazyRoute,
} as any).lazy(() =>
  import('./routes/_reference/_settings.lazy').then((d) => d.Route),
)

const PublicLoginWithEmailLazyRoute = PublicLoginWithEmailLazyImport.update({
  path: '/login-with-email',
  getParentRoute: () => PublicLazyRoute,
} as any).lazy(() =>
  import('./routes/_public/login-with-email.lazy').then((d) => d.Route),
)

const PublicPartialAuthRouteRoute = PublicPartialAuthRouteImport.update({
  path: '/partial-auth',
  getParentRoute: () => PublicLazyRoute,
} as any)

const ReferenceReferralsIndexLazyRoute =
  ReferenceReferralsIndexLazyImport.update({
    path: '/referrals/',
    getParentRoute: () => ReferenceLazyRoute,
  } as any).lazy(() =>
    import('./routes/_reference/referrals/index.lazy').then((d) => d.Route),
  )

const ReferenceMyContentIndexLazyRoute =
  ReferenceMyContentIndexLazyImport.update({
    path: '/my-content/',
    getParentRoute: () => ReferenceLazyRoute,
  } as any).lazy(() =>
    import('./routes/_reference/my-content/index.lazy').then((d) => d.Route),
  )

const ReferenceDashboardIndexLazyRoute =
  ReferenceDashboardIndexLazyImport.update({
    path: '/dashboard/',
    getParentRoute: () => ReferenceLazyRoute,
  } as any).lazy(() =>
    import('./routes/_reference/dashboard/index.lazy').then((d) => d.Route),
  )

const OnboardingOnboardingIndexLazyRoute =
  OnboardingOnboardingIndexLazyImport.update({
    path: '/onboarding/',
    getParentRoute: () => OnboardingLazyRoute,
  } as any).lazy(() =>
    import('./routes/_onboarding/onboarding.index.lazy').then((d) => d.Route),
  )

const PublicMIndexRoute = PublicMIndexImport.update({
  path: '/m/',
  getParentRoute: () => PublicLazyRoute,
} as any)

const OnboardingOnboardingReviewLazyRoute =
  OnboardingOnboardingReviewLazyImport.update({
    path: '/onboarding/review',
    getParentRoute: () => OnboardingLazyRoute,
  } as any).lazy(() =>
    import('./routes/_onboarding/onboarding.review.lazy').then((d) => d.Route),
  )

const OnboardingOnboardingQuoteLazyRoute =
  OnboardingOnboardingQuoteLazyImport.update({
    path: '/onboarding/quote',
    getParentRoute: () => OnboardingLazyRoute,
  } as any).lazy(() =>
    import('./routes/_onboarding/onboarding.quote.lazy').then((d) => d.Route),
  )

const OnboardingOnboardingQuestionsAndAnswersLazyRoute =
  OnboardingOnboardingQuestionsAndAnswersLazyImport.update({
    path: '/onboarding/questionsAndAnswers',
    getParentRoute: () => OnboardingLazyRoute,
  } as any).lazy(() =>
    import('./routes/_onboarding/onboarding.questionsAndAnswers.lazy').then(
      (d) => d.Route,
    ),
  )

const ReferenceMyContentTypeIndexLazyRoute =
  ReferenceMyContentTypeIndexLazyImport.update({
    path: '/my-content/$type/',
    getParentRoute: () => ReferenceLazyRoute,
  } as any).lazy(() =>
    import('./routes/_reference/my-content/$type/index.lazy').then(
      (d) => d.Route,
    ),
  )

const ReferenceSettingsSettingsMyProfileLazyRoute =
  ReferenceSettingsSettingsMyProfileLazyImport.update({
    path: '/settings/my-profile',
    getParentRoute: () => ReferenceSettingsLazyRoute,
  } as any).lazy(() =>
    import('./routes/_reference/_settings/settings.my-profile.lazy').then(
      (d) => d.Route,
    ),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/_onboarding': {
      preLoaderRoute: typeof OnboardingLazyImport
      parentRoute: typeof rootRoute
    }
    '/_public': {
      preLoaderRoute: typeof PublicLazyImport
      parentRoute: typeof rootRoute
    }
    '/_reference': {
      preLoaderRoute: typeof ReferenceLazyImport
      parentRoute: typeof rootRoute
    }
    '/_public/partial-auth': {
      preLoaderRoute: typeof PublicPartialAuthRouteImport
      parentRoute: typeof PublicLazyImport
    }
    '/_public/login-with-email': {
      preLoaderRoute: typeof PublicLoginWithEmailLazyImport
      parentRoute: typeof PublicLazyImport
    }
    '/_reference/_settings': {
      preLoaderRoute: typeof ReferenceSettingsLazyImport
      parentRoute: typeof ReferenceLazyImport
    }
    '/_onboarding/onboarding/questionsAndAnswers': {
      preLoaderRoute: typeof OnboardingOnboardingQuestionsAndAnswersLazyImport
      parentRoute: typeof OnboardingLazyImport
    }
    '/_onboarding/onboarding/quote': {
      preLoaderRoute: typeof OnboardingOnboardingQuoteLazyImport
      parentRoute: typeof OnboardingLazyImport
    }
    '/_onboarding/onboarding/review': {
      preLoaderRoute: typeof OnboardingOnboardingReviewLazyImport
      parentRoute: typeof OnboardingLazyImport
    }
    '/_public/m/': {
      preLoaderRoute: typeof PublicMIndexImport
      parentRoute: typeof PublicLazyImport
    }
    '/_onboarding/onboarding/': {
      preLoaderRoute: typeof OnboardingOnboardingIndexLazyImport
      parentRoute: typeof OnboardingLazyImport
    }
    '/_reference/dashboard/': {
      preLoaderRoute: typeof ReferenceDashboardIndexLazyImport
      parentRoute: typeof ReferenceLazyImport
    }
    '/_reference/my-content/': {
      preLoaderRoute: typeof ReferenceMyContentIndexLazyImport
      parentRoute: typeof ReferenceLazyImport
    }
    '/_reference/referrals/': {
      preLoaderRoute: typeof ReferenceReferralsIndexLazyImport
      parentRoute: typeof ReferenceLazyImport
    }
    '/_reference/_settings/settings/my-profile': {
      preLoaderRoute: typeof ReferenceSettingsSettingsMyProfileLazyImport
      parentRoute: typeof ReferenceSettingsLazyImport
    }
    '/_reference/my-content/$type/': {
      preLoaderRoute: typeof ReferenceMyContentTypeIndexLazyImport
      parentRoute: typeof ReferenceLazyImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  OnboardingLazyRoute.addChildren([
    OnboardingOnboardingQuestionsAndAnswersLazyRoute,
    OnboardingOnboardingQuoteLazyRoute,
    OnboardingOnboardingReviewLazyRoute,
    OnboardingOnboardingIndexLazyRoute,
  ]),
  PublicLazyRoute.addChildren([
    PublicPartialAuthRouteRoute,
    PublicLoginWithEmailLazyRoute,
    PublicMIndexRoute,
  ]),
  ReferenceLazyRoute.addChildren([
    ReferenceSettingsLazyRoute.addChildren([
      ReferenceSettingsSettingsMyProfileLazyRoute,
    ]),
    ReferenceDashboardIndexLazyRoute,
    ReferenceMyContentIndexLazyRoute,
    ReferenceReferralsIndexLazyRoute,
    ReferenceMyContentTypeIndexLazyRoute,
  ]),
])

/* prettier-ignore-end */
