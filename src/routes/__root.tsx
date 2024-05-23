import { createRootRoute, Outlet } from "@tanstack/react-router";
import Navbar from "../components/Navbar";
import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const TanStackRouterDevtools = React.lazy(() =>
  // Lazy load in development
  import("@tanstack/router-devtools").then((res) => ({
    default: res.TanStackRouterDevtools,
    // For Embedded Mode
    // default: res.TanStackRouterDevtoolsPanel
  }))
);

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <hr />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});
