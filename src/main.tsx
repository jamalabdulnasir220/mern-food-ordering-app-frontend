import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes.tsx";
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import ThemedToaster from "@/components/ThemedToaster";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
  }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient;

createRoot(document.getElementById("root")!).render(
  <Router>
    <ScrollToTop />
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Auth0ProviderWithNavigate>
          <AppRoutes />
          <ThemedToaster />
        </Auth0ProviderWithNavigate>
      </ThemeProvider>
    </QueryClientProvider>
  </Router>,
);
