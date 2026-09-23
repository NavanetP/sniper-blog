import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Common Pages
import NotFound from "./pages/NotFound";
import Privacy from "./pages/privacy";
import TermsAndConditions from "./pages/TermsAndConditions";

// Blog Home
const Index = React.lazy(() => import("./pages/Index"));

// Blog Articles
const BlogA = React.lazy(() => import("./pages/BlogA"));
const BlogB = React.lazy(() => import("./pages/BlogB"));
const BlogC = React.lazy(() => import("./pages/BlogC"));
const BlogD = React.lazy(() => import("./pages/BlogD"));
const BlogE = React.lazy(() => import("./pages/BlogE"));
const BlogF = React.lazy(() => import("./pages/BlogF"));
const BlogG = React.lazy(() => import("./pages/BlogG"));
const BlogH = React.lazy(() => import("./pages/BlogH"));
const BlogI = React.lazy(() => import("./pages/BlogI"));
const BlogJ = React.lazy(() => import("./pages/BlogJ"));
const BlogK = React.lazy(() => import("./pages/BlogK"));
const BlogL = React.lazy(() => import("./pages/BlogL"));
const BlogM = React.lazy(() => import("./pages/BlogM"));
const BlogN = React.lazy(() => import("./pages/BlogN"));
const BlogO = React.lazy(() => import("./pages/BlogO"));
const BlogP = React.lazy(() => import("./pages/BlogP"));
const BlogQ = React.lazy(() => import("./pages/BlogQ"));
const BlogR = React.lazy(() => import("./pages/BlogR"));
const BlogS = React.lazy(() => import("./pages/BlogS"));
const BlogT = React.lazy(() => import("./pages/BlogT"));
const BlogU = React.lazy(() => import("./pages/BlogU"));
const BlogV = React.lazy(() => import("./pages/BlogV"));
const BlogW = React.lazy(() => import("./pages/BlogW"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>

      {/* Toast Notifications */}
      <Toaster />
      <Sonner />

      {/* Vercel Analytics */}
      <Analytics />

      <BrowserRouter>
        <Suspense fallback={null}>
          <Routes>

            {/* =====================================================
                BLOG HOME
            ====================================================== */}

            <Route path="/" element={<Index />} />


            {/* =====================================================
                BLOG ARTICLES
            ====================================================== */}

            <Route
              path="/blog/bloga"
              element={<BlogA />}
            />

            <Route
              path="/blog/blogb"
              element={<BlogB />}
            />

            <Route
              path="/blog/interactive-3d-business-unity-studio"
              element={<BlogC />}
            />

            <Route
              path="/blog/blogd"
              element={<BlogD />}
            />

            <Route
              path="/blog/bim-digital-twins-aec-redefined"
              element={<BlogE />}
            />

            <Route
              path="/blog/microsoft-threat-protection-strengthening-enterprise-security"
              element={<BlogF />}
            />

            <Route
              path="/blog/how-enterprises-are-using-azure-openai-to-drive-productivity-and-innovation-in-2026"
              element={<BlogG />}
            />

            <Route
              path="/blog/why-businesses-are-choosing-dell-dual-monitor-setups-for-higher-productivity"
              element={<BlogH />}
            />

            <Route
              path="/blog/how-real-time-3d-and-xr-are-transforming-automotive-product-development"
              element={<BlogI />}
            />

            <Route
              path="/blog/how-microsoft-intune-is-helping-enterprises-secure-hybrid-work-and-simplify-endpoint-management"
              element={<BlogJ />}
            />

            <Route
              path="/blog/how-real-time-3d-and-xr-are-transforming-automotive-product-development-unity"
              element={<BlogK />}
            />

            <Route
              path="/blog/why-ai-is-reshaping-enterprise-server-and-storage-infrastructure"
              element={<BlogL />}
            />

            <Route
              path="/blog/how-ai-powered-document-collaboration-is-transforming-modern-business-workflows"
              element={<BlogM />}
            />

            <Route
              path="/blog/why-remote-engineering-teams-are-transforming-manufacturing-and-product-design"
              element={<BlogN />}
            />

            <Route
              path="/blog/the-hidden-technology-behind-indias-gcc-boom-why-it-infrastructure-matters"
              element={<BlogO />}
            />

            <Route
              path="/blog/microsoft-security-copilot-ai-powered-enterprise-cybersecurity-2026"
              element={<BlogP />}
            />

            <Route
              path="/blog/it-asset-buyback-recover-value-protect-data"
              element={<BlogQ />}
            />

            <Route
              path="/blog/gcc-it-infrastructure-ai-ready-operations-india"
              element={<BlogR />}
            />

            <Route
              path="/blog/ai-engineering-data-management-autodesk-vault-manufacturing"
              element={<BlogS />}
            />

            <Route
              path="/blog/enterprise-apple-device-deployment-guide"
              element={<BlogT />}
            />

            <Route
              path="/blog/ai-ready-enterprise-networking"
              element={<BlogU />}
            />

            <Route
              path="/blog/iphone-18-pro-for-business"
              element={<BlogV />}
            />

            <Route
              path="/blog/iphone-18-pro-enterprise-it-guide"
              element={<BlogW />}
            />


            {/* =====================================================
                LEGAL PAGES
            ====================================================== */}

            <Route
              path="/privacy"
              element={<Privacy />}
            />

            <Route
              path="/terms"
              element={<TermsAndConditions />}
            />


            {/* =====================================================
                404 - EVERYTHING ELSE
            ====================================================== */}

            <Route
              path="*"
              element={<NotFound />}
            />

          </Routes>
        </Suspense>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;