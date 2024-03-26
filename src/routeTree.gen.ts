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
const IndexLazyImport = createFileRoute('/')()
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
const ReferenceMyContentTypeIndexLazyImport = createFileRoute(
  '/_reference/my-content/$type/',
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

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

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

const PublicMIndexRoute = PublicMIndexImport.update({
  path: '/m/',
  getParentRoute: () => PublicLazyRoute,
} as any)

const ReferenceMyContentTypeIndexLazyRoute =
  ReferenceMyContentTypeIndexLazyImport.update({
    path: '/my-content/$type/',
    getParentRoute: () => ReferenceLazyRoute,
  } as any).lazy(() =>
    import('./routes/_reference/my-content/$type/index.lazy').then(
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
    '/_public/m/': {
      preLoaderRoute: typeof PublicMIndexImport
      parentRoute: typeof PublicLazyImport
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
    '/_reference/my-content/$type/': {
      preLoaderRoute: typeof ReferenceMyContentTypeIndexLazyImport
      parentRoute: typeof ReferenceLazyImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  PublicLazyRoute.addChildren([
    PublicPartialAuthRouteRoute,
    PublicLoginWithEmailLazyRoute,
    PublicMIndexRoute,
  ]),
  ReferenceLazyRoute.addChildren([
    ReferenceDashboardIndexLazyRoute,
    ReferenceMyContentIndexLazyRoute,
    ReferenceReferralsIndexLazyRoute,
    ReferenceMyContentTypeIndexLazyRoute,
  ]),
])

/* prettier-ignore-end */
