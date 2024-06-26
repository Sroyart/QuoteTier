/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as NewQuotesImport } from './routes/NewQuotes'
import { Route as IndexImport } from './routes/index'
import { Route as QuoteIdImport } from './routes/quote/$id'

// Create/Update Routes

const NewQuotesRoute = NewQuotesImport.update({
  path: '/NewQuotes',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const QuoteIdRoute = QuoteIdImport.update({
  path: '/quote/$id',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/NewQuotes': {
      id: '/NewQuotes'
      path: '/NewQuotes'
      fullPath: '/NewQuotes'
      preLoaderRoute: typeof NewQuotesImport
      parentRoute: typeof rootRoute
    }
    '/quote/$id': {
      id: '/quote/$id'
      path: '/quote/$id'
      fullPath: '/quote/$id'
      preLoaderRoute: typeof QuoteIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  NewQuotesRoute,
  QuoteIdRoute,
})

/* prettier-ignore-end */
