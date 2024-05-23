import { createRootRoute, Outlet } from "@tanstack/react-router";
import Navbar from "../components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <hr />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </>
  ),
});
